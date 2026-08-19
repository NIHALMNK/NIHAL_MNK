import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Me Page & Bio",
  type: "document",
  fields: [
    defineField({
      name: "profile",
      title: "Profile Information",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
        defineField({ name: "location", title: "Location", type: "string" }),
        defineField({ name: "avatarUrl", title: "Avatar URL", type: "url" }),
        defineField({ name: "availableForHire", title: "Available for Hire", type: "boolean" }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary & Highlights",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Headline", type: "string" }),
        defineField({
          name: "content",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
        defineField({
          name: "highlights",
          title: "Key Highlights",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "education",
      title: "Education Entries",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string" }),
            defineField({ name: "institution", title: "Institution", type: "string" }),
            defineField({ name: "degree", title: "Degree", type: "string" }),
            defineField({ name: "field", title: "Field of Study", type: "string" }),
            defineField({ name: "period", title: "Period", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: "experience",
      title: "Experience Entries",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "company", title: "Company", type: "string" }),
            defineField({ name: "period", title: "Period", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "responsibilities",
              title: "Responsibilities",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "technologies",
              title: "Technologies (Stack References)",
              type: "array",
              of: [{ type: "reference", to: [{ type: "stack" }] }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page Content (Singleton)",
      };
    },
  },
});
