import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
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
      name: "shortDescription",
      title: "Short Summary",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Full Case Study / Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImageUrl",
      title: "Cover Image URL (Unsplash / Cloudinary / Hosted)",
      type: "url",
    }),
    defineField({
      name: "videoUrl",
      title: "Video Preview URL (Cloudinary / MP4)",
      type: "url",
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used (Stack References)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "stack" }] }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Key Features & Engineering Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "liveUrl",
      title: "Live Application URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub Repository URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Is Featured on Home Page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "priority",
      title: "Homepage Priority Rank (1, 2, 3, 4)",
      type: "number",
      options: {
        list: [
          { title: "Priority 1 (Hero Slot 1)", value: 1 },
          { title: "Priority 2 (Hero Slot 2)", value: 2 },
          { title: "Priority 3 (Hero Slot 3)", value: 3 },
          { title: "Priority 4 (Hero Slot 4)", value: 4 },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Date Published / Completed",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
    },
  },
});
