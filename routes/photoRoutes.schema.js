export const postSchema = {
  type: "object",
  properties: {
    url: { type: "string", format: "url" },
    theme: { type: "array", items: { type: "string" } },
    albums: {
      type: "array",
      items: { type: "object" },
      minLength: 24,
      maxLength: 24,
    },
  },
  required: ["url"],
  additionalProperties: false,
};
