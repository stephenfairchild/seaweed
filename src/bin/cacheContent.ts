import { Post } from "../types";
import readPostsFromSrc from "./readPostsFromSrc";
import { log } from "./cliLog";

interface ClientInterface {
    get: () => {};
    set: (key: string, value: string) => {};
}

export default async function cacheContent(
    client: ClientInterface,
    contentPath: string
) {
    log(`Attempting to read content...`);

    const posts: Post[] = await readPostsFromSrc({
        contentPath,
    });

    posts.forEach(async (post) => {
        await client.set(post.slug, JSON.stringify(post));
    });
}
