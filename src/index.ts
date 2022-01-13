#!/usr/bin/env node
import { createClient } from "redis";
import cacheContent from "./bin/cacheContent";
import { error, log } from "./bin/cliLog";
import minimist from "minimist";

(async () => {
    const argv = minimist(process.argv.slice(2));

    if (argv._.length === 0) {
        error("You must provide an argument.");
    }

    if (argv._.length > 1) {
        error("Too many arguments.");
    }

    if (argv._.includes("cache")) {
        log("Running cache script...");
    }

    // Default to the current working directory if a --directory flag is
    // not provided
    let contentDirectory = argv.directory ? argv.directory : process.cwd();

    log(`Content directory detected: ${contentDirectory}`);

    if (!("SEAWEED_REDIS_URL" in process.env)) {
        error(`You must have SEAWEED_REDIS_URL defined in your ENVIRONMENT.`);
    }

    log(`Connecting to Redis...`);

    const redisClient = await createClient({
        url: process.env.SEAWEED_REDIS_URL,
    });

    await redisClient.connect();

    await cacheContent(redisClient, contentDirectory);

    await redisClient.quit();
})();
