import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post / Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Teaser",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introCallout",
      title: "Intro Callout Quote",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "content",
      title: "Markdown Content",
      type: "text",
      rows: 25,
      description: "Full Markdown text preserving code blocks, headers, lists, and reading metrics.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImageUrl",
      title: "Cover Image URL",
      type: "url",
    }),
    defineField({
      name: "publishedAt",
      title: "Date Published",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time Estimate",
      type: "string",
      initialValue: "5 min read",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Featured on Home Page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "author",
      title: "Author Details",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string", initialValue: "Nihal" }),
        defineField({ name: "role", title: "Role", type: "string", initialValue: "MERN Stack Developer" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
    },
  },
});
