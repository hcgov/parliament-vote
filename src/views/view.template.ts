import type { AllMiddlewareArgs, SlackViewAction, SlackViewMiddlewareArgs, StringIndexed } from "@slack/bolt";

export default async function View(ctx: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs<StringIndexed>) {
    // ...
}