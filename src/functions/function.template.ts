import type { AllMiddlewareArgs, StringIndexed } from "@slack/bolt";
import type { SlackCustomFunctionMiddlewareArgs } from "@slack/bolt/dist/CustomFunction";

export default async function Function(ctx: SlackCustomFunctionMiddlewareArgs & AllMiddlewareArgs<StringIndexed>) {
    // ...
}