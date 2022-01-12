import fs from "fs/promises";
import path from "path";
import frontMatter from "front-matter";
import { marked } from "marked";
import { Post } from "../types";

/**
 * Read through the content directory and parse the contents into attributes
 */
export default async function readPostsFromSrc(
    contentDirectory: string
): Promise<Post[]> {
    const postsPath = path.join(__dirname, "..", contentDirectory);

    const dir = await fs.readdir(postsPath);

    return Promise.all(
        dir.map(async (filename: string) => {
            const slug = filename.replace(/\.md$/, "");
            const file = await fs.readFile(path.join(postsPath, filename));

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

function throwOnMissingField(
    attributes: { title: string; created: string; active: boolean },
    slug: string
) {
    const throwError = (attr: string) => {
        throw new Error(`Missing Required Attribute. ${attr} attribute is required for all content. Not found for post:
                        ${slug}`);
    };

    if (typeof attributes.title === "undefined") {
        throwError("title");
    }

    if (typeof attributes.created === "undefined") {
        throwError("created");
    }

    if (typeof attributes.active === "undefined") {
        throwError("active");
    }
}
