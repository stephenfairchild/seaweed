import readPostsFromSrc from "../readPostsFromSrc";

test("content is detected and mapped to attributes", async () => {
    const posts = await readPostsFromSrc({
        directory: "./data",
    });

    expect(posts.length).toEqual(1);
});
