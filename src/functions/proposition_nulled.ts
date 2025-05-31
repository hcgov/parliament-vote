import type { AllMiddlewareArgs, StringIndexed } from "@slack/bolt";
import type { SlackCustomFunctionMiddlewareArgs } from "@slack/bolt/dist/CustomFunction";

import sql from "../../postgres";

export default async function PropositionNulled(ctx: SlackCustomFunctionMiddlewareArgs & AllMiddlewareArgs<StringIndexed>) {
    const inputs = ctx.payload.inputs as { row_id: string };

    const result = await sql<{
        list_row_id: string,
        end_date: Date,
        message_ts: string
    }[]>`SELECT * FROM proposition_end_dates WHERE list_row_id = ${inputs.row_id}`;

    if (result.length) {
        await ctx.client.chat.postMessage({
            channel: process.env.CHAMBER_CHANNEL_ID,
            thread_ts: result[0]!.message_ts,
            text: `*This proposition has been nulled. Votes cannot be casted on it anymore.*`
        })

        await sql`DELETE FROM proposition_end_dates WHERE list_row_id = ${inputs.row_id}`;
        await sql`DELETE FROM votes WHERE list_row_id = ${inputs.row_id}`;
    }

    // Otherwise, most likely it's been nulled pre-voting (or nulled post-voting, but I doubt this'll ever happen).
    // Regardless, just complete the step to avoid Slackbot DMs (arghhh..)

    return await ctx.complete({ outputs: [] })
}