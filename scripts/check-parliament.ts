import { Parties } from "../parliament";
import { WebClient } from "@slack/web-api";

const client = new WebClient(process.env.APP_TOKEN);

// Run tests to ensure seats add up
for (const party of Object.values(Parties)) {
    const totalSeats = party.seatholders.reduce((acc, seatholders) => seatholders.seats + acc, 0);

    if (totalSeats !== party.seats) {
        // Ensure that when the Action finishes, it fails
        process.exitCode = 1;
        console.error(`${party.name} failed: ${party.seats} seats have been configured for ${party.shortName}, but ${totalSeats} have been assigned.`)

        if (process.env.SEND_SLACK_NOTIFICATION === 'true') {
            await client.chat.postMessage({
                channel: process.env.DOSEM_CHANNEL_ID,
                text: `\<!subteam^S0929EK5LGL\>, error in commit <https://github.com/${process.env.GITHUB_REPOSITORY}/commit/${process.env.GITHUB_SHA}|${process.env.GITHUB_SHA?.slice(0, 7)}>`,
                attachments: [
                    {
                        color: "#ff0000",
                        blocks: [
                            {
                                type: "header",
                                text: {
                                    type: "plain_text",
                                    text: `Invalid seat assignment for party "${party.name}"!`,
                                    emoji: true
                                }
                            },
                            {
                                type: "section",
                                fields: [
                                    {
                                        type: "mrkdwn",
                                        text: "*User ID:*"
                                    },
                                    {
                                        type: "mrkdwn",
                                        text: "*Seats configured:*"
                                    }
                                ]
                            },
                            {
                                type: "section",
                                fields: [
                                    {
                                        type: "mrkdwn",
                                        text: party.seatholders.map(x => x.userId).join('\n')
                                    },
                                    {
                                        type: "mrkdwn",
                                        text: party.seatholders.map(x => x.seats.toString()).join('\n')
                                    }
                                ]
                            },
                            {
                                type: "divider"
                            },
                            {
                                type: "section",
                                text: {
                                    type: "mrkdwn",
                                    text: `${party.seats} seats have been configured for ${party.shortName}, but ${totalSeats} have been assigned.`
                                }
                            }
                        ]
                    }
                ]
            })
        }
    }
}