/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";

const settings = definePluginSettings({
    apiKey: {
        type: OptionType.STRING,
        description: "API Key for Wakatime",
        default: "",
        isValid: (value: string) => {
            if (!value?.startsWith("waka_")) return "Invalid Key: Please obtain your API Key from Wakatime";
            return true;
        },
    },
    debug: {
        type: OptionType.BOOLEAN,
        description: "Enable debug mode",
        default: false,
    },
    machineName: {
        type: OptionType.STRING,
        description: "Machine name",
        default: "Vencord User",
    },
    projectName: {
        type: OptionType.STRING,
        description: "Project Name",
        default: "Discord",
    },
});

async function sendHeartbeat() {
    const time = Date.now();
    const { debug, apiKey, machineName, projectName } = settings.store

    if (!apiKey) return;

    if (debug) console.log("Sending heartbeat to WakaTime API.");

    const url = "https://api.wakatime.com/api/v1/users/current/heartbeats";
    const body = JSON.stringify({
        time: time / 1000,
        entity: "Discord",
        type: "app",
        project: projectName ?? "Discord",
        plugin: "vencord/version discord-wakatime/v0.0.1",
    });

    const headers = {
        Authorization: `Basic ${apiKey}`,
        "Content-Type": "application/json",
        "Content-Length": new TextEncoder().encode(body).length.toString(),
        ...(machineName ? { "X-Machine-Name": machineName } : {})
    };

    const res = await fetch(url, {
        method: "POST",
        body: body,
        headers: headers,
    });

    const data = await res.text();

    if (res.status !== 200) console.warn(`WakaTime API Error ${res.status}: ${data}`);
}

export default definePlugin({
    name: "Wakatime",
    description: "Fully automatic code stats via Wakatime",
    authors: [
        { name: "Neon", id: 566766267046821888n },
        { name: "thororen", id: 848339671629299742n }
    ],
    settings,
    sendHeartbeat,
    start() {
        this.updateInterval = setInterval(() => { this.sendHeartbeat(); }, 120000);
    },
    stop() {
        clearInterval(this.updateInterval);
    }
});