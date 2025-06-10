import type { AllMiddlewareArgs, StringIndexed } from "@slack/bolt";
import type { SlackCustomFunctionMiddlewareArgs } from "@slack/bolt/dist/CustomFunction";

import { randomUUID } from "node:crypto";
import ee from "../../events";
import sql from "../../postgres";

export default async function VoteInProgress(ctx: SlackCustomFunctionMiddlewareArgs & AllMiddlewareArgs<StringIndexed>) {
    const inputs = ctx.payload.inputs as { itemId: string, editor: string };

    const activePropositions = await sql<any[]>`SELECT * FROM proposition_end_dates`;

    const responseUUID = randomUUID()

    ee.once(responseUUID, async ([title, status, description, author, type, date_closes]) => {
        const itemUrl = `https://hackclub.slack.com/lists/T0266FRGM/${process.env.LIST_ID}?record_id=${inputs.itemId}`;

        if (activePropositions.length == 6) {
            const uuid2 = randomUUID()
            ee.once(uuid2, () => {})
            await fetch(process.env.EDIT_WORKFLOW, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uuid: uuid2,
                    row_id: inputs.itemId,
                    status: "In Draft"
                })
            })

            return await ctx.client.chat.postMessage({
                channel: inputs.editor,
                text: 
                    `Hi there! You updated the status of *<${itemUrl}|${title}>* to \`Voting Open\`. However, there are already 6 active propositions in voting.\n\n` +
                    `In order to allow the voting system to not be overwhelmed, we have a maximum active proposition count of 6. Wait for at least 1 proposition to finish voting before starting yours.`
            })
        }

        if (date_closes == "") {
            // Change the status back to "In Draft"
        
            const uuid2 = randomUUID()
            ee.once(uuid2, () => {})
            await fetch(process.env.EDIT_WORKFLOW, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uuid: uuid2,
                    row_id: inputs.itemId,
                    status: "In Draft"
                })
            })

            // Adds 2 days to the "current date" to get the recommended "vote close date"
            const recommendedDate = new Date();
            recommendedDate.setDate(recommendedDate.getDate() + 2)

            return await ctx.client.chat.postMessage({
                channel: inputs.editor,
                text: 
                    `Hi there! You updated the status of *<${itemUrl}|${title}>* to \`Voting Open\`. However, that proposition doesn't have a date set for when the vote closes.\n\n` +
                    `In order to allow the Parliament Vote bot to work properly, you need to have a date set. For most propositions, this is 2 days from the current date (which in this case, is \`${recommendedDate.toISOString().slice(0, 10)}\`).`
            })   
        } else if (new Date(date_closes) < new Date()) {
            // Change the status back to "In Draft"
        
            const uuid2 = randomUUID()
            ee.once(uuid2, () => {})
            await fetch(process.env.EDIT_WORKFLOW, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uuid: uuid2,
                    row_id: inputs.itemId,
                    status: "In Draft"
                })
            })

            // Adds 2 days to the "current date" to get the recommended "vote close date"
            const recommendedDate = new Date();
            recommendedDate.setDate(recommendedDate.getDate() + 2)

            return await ctx.client.chat.postMessage({
                channel: inputs.editor,
                text: 
                    `Hi there! You updated the status of *<${itemUrl}|${title}>* to \`Voting Open\`. However, the date you gave for voting to end was in the past.\n\n` +
                    `In order to allow the Parliament Vote bot to work properly, you need to have a date set in the future. For most propositions, this is 2 days from the current date (which in this case, is \`${recommendedDate.toISOString().slice(0, 10)}\`).`
            })            
        }

        const message = await ctx.client.chat.postMessage({
            channel: process.env.CHAMBER_CHANNEL_ID,
            text: `Voting is now open for the "${title}" ${type}.`,
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
                                    "text": "\n\nView more about this proposition and vote if you support it. This bill/act will need 2/3rds of the total votes submitted, unless the PM votes in favor, in which case 1/2 of the total votes will be needed. If you take issue, follow the link below and use comments to debate. It is your duty to vote, either yes or no.\n\nVotes are by seats, not members.\n"
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
                            "action_id": "vote-not-in-favour"
                        }
                    ]
                }
            ],
            token: process.env.APP_TOKEN
        })

        if (message.ok) {
            await sql`INSERT INTO proposition_end_dates VALUES (${inputs.itemId}, ${date_closes}, ${message.ts!})`
        }

        await ctx.complete({ outputs: {} })
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
