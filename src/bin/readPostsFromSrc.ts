import fs from "fs/promises";
import path from "path";
import frontMatter from "front-matter";
import { marked } from "marked";
import { Post } from "../types";
import { log } from "./cliLog";
import throwOnMissingField from "./throwOnMissingField";

/**
 * Read through the content directory and parse the contents into attributes
 */
export default async function readPostsFromSrc(config: {
    contentPath: string;
}): Promise<Post[]> {
    const { contentPath } = config;

    const dir = await fs.readdir(contentPath);
    log(`Parsing content...`);

    return Promise.all(
        dir.map(async (filename: string) => {
            const slug = filename.replace(/\.md$/, "");
            const file = await fs.readFile(path.join(contentPath, filename));

            const {
                attributes,
                body,
            }: {
                attributes: Post;
                body: string;
            } = frontMatter(file.toString());

            throwOnMissingField(attributes, slug);

            return {
                slug,
                title: attributes.title,
                active: attributes.active,
                created: attributes.created,
                html: marked.parse(body),
            };
        })
    );
}
