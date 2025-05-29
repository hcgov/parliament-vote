import type { AllMiddlewareArgs, SlackEventMiddlewareArgs, StringIndexed } from "@slack/bolt";

// For proper type-checking + intellisense, replace "event_template" with the raw event name
export async function Event(ctx: SlackEventMiddlewareArgs<"event_template"> & AllMiddlewareArgs<StringIndexed>) {
    // ...
}