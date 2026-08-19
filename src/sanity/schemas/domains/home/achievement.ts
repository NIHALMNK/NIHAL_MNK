import { defineField, defineType } from "sanity";

export const achievement = defineType({
  name: "achievement",
  title: "Achievement & Certification",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Achievement Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Issue Date",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "credentialId",
      title: "Credential ID / URL",
      type: "string",
    }),
    defineField({
      name: "logoUrl",
      title: "Logo Image URL (Cloudinary / CDN)",
      type: "url",
    }),
    defineField({
      name: "skills",
      title: "Associated Skills (Stack References)",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "stack" }] },
        { type: "string" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
    },
  },
});
