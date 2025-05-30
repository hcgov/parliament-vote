import type { AllMiddlewareArgs, StringIndexed } from "@slack/bolt";
import type { SlackCustomFunctionMiddlewareArgs } from "@slack/bolt/dist/CustomFunction";

import { randomUUID } from "node:crypto";
import ee from "../../events";

export default async function VoteInProgress(ctx: SlackCustomFunctionMiddlewareArgs & AllMiddlewareArgs<StringIndexed>) {
    const inputs = ctx.payload.inputs as { itemId: string };

    const responseUUID = randomUUID()

    ee.once(responseUUID, async ([title, _, __, author, type]) => {
        const itemUrl = `https://hackclub.slack.com/lists/T0266FRGM/${process.env.LIST_ID}?record_id=${inputs.itemId}`;

        await ctx.client.chat.postMessage({
            channel: process.env.CHAMBER_CHANNEL_ID,
            blocks: [
                {
                    "type": "rich_text",
                    "elements": [
                        {
                            "type": "rich_text_section",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "Voting is now open for the following "
                                },
                                {
                                    "type": "text",
                                    "text": type
                                },
                                {
                                    "type": "text",
                                    "text": ":\n\n"
                                },
                                {
                                    "type": "text",
                                    "text": title,
                                    "style": {
                                        "bold": true
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "\nAuthored by "
                                },
                                {
                                    "type": "user",
                                    "user_id": author
                                },
                                {
                                    "type": "text",
                                    "text": "\n\nView more about this proposition and vote if you support it. This bill/act will need 2/3rds of the total votes submitted, unless the PM votes in favor, in which case 1/2 of the total votes will be needed. If you take issue, follow the link below and use comments to debate. It is your duty to vote, either yes or no.\n\nVotes are by seats, not members.\n\n"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "View proposition",
                                "emoji": true
                            },
                            "url": itemUrl,
                            "action_id": "link-button"
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Vote in favour",
                                "emoji": true
                            },
                            "style": "primary",
                            "value": inputs.itemId,
                            "action_id": "vote-in-favour"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Vote not in favour",
                                "emoji": true
                            },
                            "style": "danger",
                            "value": inputs.itemId,
                            "action_id": "vote-not-in-favor"
                        }
                    ]
                }
            ]
        })
    })

    fetch(process.env.FETCH_WORKFLOW, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uuid: responseUUID,
            row_id: inputs.itemId
        })
    })
}