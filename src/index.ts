#!/usr/bin/env node

import { createClient } from "redis";
import { Post } from "./types";
import readPostsFromSrc from "./bin/readPostsFromSrc";

(async () => {
    const args = process.argv;
    console.log(args);

    process.exit();

    const client = await createClient({
        url: process.env.REDIS_URL,
    });

    await client.connect();

    const posts: Post[] = await readPostsFromSrc("contentdir");

    posts.forEach(async (post, index) => {
        await client.set(post.slug, JSON.stringify(post));
    });

    await client.quit();
})();
