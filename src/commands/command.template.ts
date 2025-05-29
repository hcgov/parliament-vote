import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs, StringIndexed } from "@slack/bolt";

export default async function Command(ctx: SlackCommandMiddlewareArgs & AllMiddlewareArgs<StringIndexed>) {
    // ...
}