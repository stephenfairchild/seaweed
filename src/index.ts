#!/usr/bin/env node
import { createClient } from "redis";
const parseArgs = require("minimist");

import cacheContent from "./bin/cacheContent";
import { error, log } from "./bin/cliLog";

(async () => {
    const argv = parseArgs(process.argv.slice(2));

    if (argv._.length === 0) {
        error("You must provide an argument.");
    }

    if (argv._.length > 1) {
        error("Too many arguments.");
    }

    if (argv._.includes("cache")) {
        log("Running cache script...");
    }

    let contentDirectory = "";
    if (argv.directory) {
        contentDirectory = argv.directory;
    }

    log(`Content directory detected: ${contentDirectory}`);

    if (!("SEAWEED_REDIS_URL" in process.env)) {
        error(`You must have SEAWEED_REDIS_URL defined in your ENVIRONMENT.`);
    }

    log(`Connecting to Redis...`);

    const redisClient = await createClient({
        url: process.env.SEAWEED_REDIS_URL,
    });

    await redisClient.connect();

    const client = {
        get: redisClient.get,
        set: redisClient.set,
    };

    await cacheContent(client, contentDirectory);

    //await client.quit();
})();
