import BoltJS from "@slack/bolt";
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

import * as config from "./config";

const app = new BoltJS.App({
    signingSecret: process.env.SIGNING_SECRET,
    token: process.env.APP_TOKEN
});

if (config.interactionImports.actions) {
    const actionsDir = await fs.readdir(path.join(process.cwd(), "src", "actions"));
    for (const action of actionsDir) {
        if (!action.endsWith(".ts") || action.endsWith(".template.ts")) continue;
        const actionExport = await import(path.join(process.cwd(), "src", "actions", action));

        const actionName = path.basename(action, ".ts")

        app.action(actionName, actionExport.default)
    }
}

if (config.interactionImports.commands) {
    const commandsDir = await fs.readdir(path.join(process.cwd(), "src", "commands"));
    for (const command of commandsDir) {
        if (!command.endsWith(".ts") || command.endsWith(".template.ts")) continue;
        const commandExport = await import(path.join(process.cwd(), "src", "commands", command));

        const commandName = path.basename(command, ".ts")

        app.command(`/${commandName}`, commandExport.default)
    }
}

if (config.interactionImports.events) {
    const eventsDir = await fs.readdir(path.join(process.cwd(), "src", "events"));
    for (const event of eventsDir) {
        if (!event.endsWith(".ts") || event.endsWith(".template.ts")) continue;
        const eventExport = await import(path.join(process.cwd(), "src", "events", event));

        const eventName = path.basename(event, ".ts")

        app.event(eventName, eventExport.default)
    }
}

if (config.interactionImports.functions) {
    const functionsDir = await fs.readdir(path.join(process.cwd(), "src", "functions"));
    for (const wFunction of functionsDir) {
        if (!wFunction.endsWith(".ts") || wFunction.endsWith(".template.ts")) continue;
        const functionExport = await import(path.join(process.cwd(), "src", "functions", wFunction));

        const functionName = path.basename(wFunction, ".ts")

        app.function(functionName, functionExport.default)
    }
}

if (config.interactionImports.shortcuts) {
    const shortcutsDir = await fs.readdir(path.join(process.cwd(), "src", "shortcuts"));
    for (const shortcut of shortcutsDir) {
        if (!shortcut.endsWith(".ts") || shortcut.endsWith(".template.ts")) continue;
        const shortcutExport = await import(path.join(process.cwd(), "src", "shortcuts", shortcut));

        const shortcutName = path.basename(shortcut, ".ts")

        app.shortcut(shortcutName, shortcutExport.default)
    }
}

if (config.interactionImports.views) {
    const viewsDir = await fs.readdir(path.join(process.cwd(), "src", "views"));
    for (const view of viewsDir) {
        if (!view.endsWith(".ts") || view.endsWith(".template.ts")) continue;
        const viewExport = await import(path.join(process.cwd(), "src", "views", view));

        const viewName = path.basename(view, ".ts")

        app.view(viewName, viewExport.default)
    }
}

app.start(process.env.PORT ?? 3000).then(async () => {
    console.log(`⚡ Bolt app is running in ${process.env.NODE_ENV} mode!`)

    if (process.env.NODE_ENV == "development" && process.env.NGROK_TOKEN != "NONE") {
        const ngrok = await import("@ngrok/ngrok");

        if (!process.env.NGROK_TOKEN) {
            app.stop();
            console.error("❌ You're running in development mode, but no NGROK_TOKEN was found in your .env file.")
            console.error("Not planning to use ngrok functionality? Set NGROK_TOKEN to NONE (case-sensitive!)")
            process.exit(1)
        }

        try {
            const listener = await ngrok.forward({
                addr: process.env.PORT ?? 3000,
                authtoken: process.env.NGROK_TOKEN,
                domain: process.env.NGROK_DOMAIN ?? undefined
            })
            console.log(`ngrok is proxying requests via ${listener.url()}!`)
        } catch (err) {
            app.stop();
            console.error("❌ Something went wrong while trying to forward to ngrok...")
            console.error(err)
            process.exit(1)
        }
    }
})