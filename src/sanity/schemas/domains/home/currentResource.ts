import { defineField, defineType } from "sanity";

export const currentResource = defineType({
  name: "currentResource",
  title: "Curated Resource / Bookmark",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Resource Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Destination URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "domain",
      title: "Domain Host",
      type: "string",
      description: "e.g. youtube.com, w3.org, nextjs.org",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Engineering, Accessibility, Design Systems, Documentation",
    }),
    defineField({
      name: "description",
      title: "Description / Takeaway",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
