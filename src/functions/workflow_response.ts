import type { AllMiddlewareArgs, StringIndexed } from "@slack/bolt";
import type { SlackCustomFunctionMiddlewareArgs } from "@slack/bolt/dist/CustomFunction";

import ee from "../../events";

export default async function WorkflowResponse(ctx: SlackCustomFunctionMiddlewareArgs & AllMiddlewareArgs<StringIndexed>) {
    const inputs = ctx.payload.inputs as { uuid: string, output: string };

    const parsedOutput = inputs.output.split('\n/@/\n');

    // EventEmitter#emit returns a boolean depending on if there was an event listener that recieved the event.
    if (ee.emit(inputs.uuid, parsedOutput)) 
        ctx.complete({ outputs: {} })
    else
        ctx.fail({ error: "Something went wrong while processing a workflow response: no request matched a given UUID." })
}