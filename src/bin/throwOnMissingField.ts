import { error } from "./cliLog";

export default function throwOnMissingField(
    attributes: { title: string; created: string; active: boolean },
    slug: string
) {
    const throwError = (attr: string) => {
        error(
            `Missing Required Attribute. ${attr} attribute is required for all content. Not found for: ${slug}`
        );
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
