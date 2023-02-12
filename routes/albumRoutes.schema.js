export const postSchema = {
  type: "object",
  properties: {
    date: {
      type: "string",
      format: "date",
    },
    name: { type: "string" },
    creator: { type: "string" },
    photos: {
      type: "array",
      items: { type: "string", minLength: 24, maxLength: 24 },
    },
  },
  required: ["name"],
  additionalProperties: false,
};
