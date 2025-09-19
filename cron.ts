import cron from 'node-cron';
import sql from './postgres';
import { randomUUID } from "node:crypto";
import ee from "./events";
import { app } from '.';

// Run every day at 12:00am UTC
cron.schedule('0 0 * * *', async () => {
    const propositions = await sql<{ 
        list_row_id: string, 
        end_date: Date, 
        message_ts: string
    }[]>`SELECT * FROM proposition_end_dates WHERE end_date <= CURRENT_DATE`;

    if (propositions.length) {
        for (const proposition of propositions) {
            const uuid = randomUUID();

            ee.once(uuid, () => {})

            const votes = await sql<{
                list_row_id: string,
                user_id: string,
                seats: number,
                in_favour: boolean
            }[]>`SELECT * FROM votes WHERE list_row_id = ${proposition.list_row_id};`

            const { inFavourSeats, againstSeats } = votes.reduce(
                (acc, vote) => {
                    if (vote.in_favour) {
                        acc.inFavourSeats += vote.seats;
                    } else {
                        acc.againstSeats += vote.seats;
                    }
                    return acc;
                },
                { inFavourSeats: 0, againstSeats: 0 }
            );

            const didVotePass = inFavourSeats > ((inFavourSeats + againstSeats) * (1/2))

            await fetch(process.env.EDIT_WORKFLOW, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uuid,
                    row_id: proposition.list_row_id,
                    status: didVotePass ? "Passed" : "Rejected"
                })
            })

            app.client.chat.postMessage({
                channel: process.env.CHAMBER_CHANNEL_ID,
                thread_ts: proposition.message_ts,
                text: 
                    "*Voting has ended for this proposition.*\n\n" + 
                    `This proposition has ${didVotePass ? "passed" : "not passed"} voting with ${inFavourSeats} seats in favour to ${againstSeats} seats not in favour.`
            })

            await sql`DELETE FROM proposition_end_dates WHERE list_row_id = ${proposition.list_row_id}`;
            await sql`DELETE FROM votes WHERE list_row_id = ${proposition.list_row_id}`;
        }
    }
})

export {};
