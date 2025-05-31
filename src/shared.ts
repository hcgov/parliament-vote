import type { AllMiddlewareArgs, BlockButtonAction, SlackActionMiddlewareArgs, StringIndexed } from "@slack/bolt";

import { Parties } from "../parliament";
import sql from "../postgres";

export async function voting(ctx: SlackActionMiddlewareArgs<BlockButtonAction> & AllMiddlewareArgs<StringIndexed>, favour: 'in_favour' | 'not_in_favour') {
    await ctx.ack();
    // Metadata
    const userId = ctx.body.user.id;
    const rowId = ctx.action.value!;

    // First, check if the user CAN indeed vote:
    const userParty = Object.values(Parties).find(party => party.seatholders.includes(userId))

    if (!userParty) {
        return await ctx.client.chat.postEphemeral({
            channel: process.env.CHAMBER_CHANNEL_ID,
            user: userId,
            // Hey @user, you aren't part of a party and therefore can't vote. If this is a mistake, please reach out in #dosem.
            text: `Hey <@${userId}>, you aren't part of a party and therefore can't vote. If this is a mistake, please reach out in <#C08HSAVG482>.`
        })
    }

    // How many seats the user has: this may be inaccurate if there are multiple seatholders
    const seats = Math.floor(userParty.seats / userParty.seatholders.length);

    const propositionRes = await sql<{
        list_row_id: string,
        end_date: Date,
        message_ts: string
    }[]>`SELECT * FROM proposition_end_dates WHERE list_row_id = ${rowId}`;

    if (propositionRes.length == 0) {
        return await ctx.client.chat.postEphemeral({
            channel: process.env.CHAMBER_CHANNEL_ID,
            user: userId,
            // Hey @user, this proposition's voting period has ended. If this is a mistake, please reach out in #dosem.
            text: `Hey <@${userId}>, this proposition's voting period has ended. If this is a mistake, please reach out in <#C08HSAVG482>.`
        })
    }

    // Has this user already voted?
    const result = await sql<{ 
        list_row_id: string, 
        user_id: string, 
        seats: number, 
        in_favour: boolean 
    }[]>`SELECT * FROM votes WHERE user_id = ${userId} AND list_row_id = ${rowId};`

    if (result.length) {
        // User has already voted, check if it's a duplicate vote
        const vote = result[0]!
        if (vote.in_favour && favour == "in_favour") {
            return await ctx.client.chat.postEphemeral({
                channel: process.env.CHAMBER_CHANNEL_ID,
                user: userId,
                // Hey @user, you already voted in favour of this proposition. If this is a mistake, please reach out in #dosem.
                text: `Hey <@${userId}>, you already voted in favour of this proposition. If this is a mistake, please reach out in <#C08HSAVG482>.`
            })
        } else if (!vote.in_favour && favour == "not_in_favour") {
            return await ctx.client.chat.postEphemeral({
                channel: process.env.CHAMBER_CHANNEL_ID,
                user: userId,
                // Hey @user, you already voted not in favour of this proposition. If this is a mistake, please reach out in #dosem.
                text: `Hey <@${userId}>, you already voted not in favour of this proposition. If this is a mistake, please reach out in <#C08HSAVG482>.`
            })
        }

        // We handle duplicate votes of a differing favour in the SQL statement below.
    }

    await sql`INSERT INTO votes (list_row_id, user_id, seats, in_favour)
VALUES (${rowId}, ${userId}, ${seats}, ${favour == "in_favour"})
ON CONFLICT (list_row_id, user_id)
DO UPDATE SET
    seats = EXCLUDED.seats,
    in_favour = EXCLUDED.in_favour;`

    await ctx.client.chat.postMessage({
        channel: process.env.CHAMBER_CHANNEL_ID,
        thread_ts: ctx.body.message!.ts,
        text: `${userParty.shortName} - ${seats} - ${favour == "in_favour" ? "Yes" : "No"}\n\n_On behalf of <@${userId}>_`
    })

    return await ctx.client.chat.postEphemeral({
        channel: process.env.CHAMBER_CHANNEL_ID,
        user: userId,
        text: `:white_check_mark: Your vote has gone through with *${seats}* seats!`
    })
}