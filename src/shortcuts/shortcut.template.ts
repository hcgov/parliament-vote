import type { AllMiddlewareArgs, SlackShortcut, SlackShortcutMiddlewareArgs, StringIndexed } from "@slack/bolt";

export default async function Shortcut(ctx: SlackShortcutMiddlewareArgs<SlackShortcut> & AllMiddlewareArgs) {
    // ...
}