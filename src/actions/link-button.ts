import type { AllMiddlewareArgs, BlockButtonAction, SlackActionMiddlewareArgs, StringIndexed } from "@slack/bolt";

export default async function Action(ctx: SlackActionMiddlewareArgs<BlockButtonAction> & AllMiddlewareArgs<StringIndexed>) {
    // Do nothing.
    await ctx.ack();
}