#!/usr/bin/env node
import { Post } from "../types";
import readPostsFromSrc from "./readPostsFromSrc";

interface ClientInterface {
    get: () => {};
    set: (key: string, value: string) => {};
}

export default async function cacheContent(
    client: ClientInterface,
    contentDir: string
) {
    const posts: Post[] = await readPostsFromSrc({
        directory: contentDir,
    });

    posts.forEach(async (post) => {
        await client.set(post.slug, JSON.stringify(post));
    });
}
