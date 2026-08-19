import { defineField, defineType } from "sanity";

export const recentSnap = defineType({
  name: "recentSnap",
  title: "Recent Snap / Life Snapshot",
  type: "document",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "takenAt",
      title: "Date Taken",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaUrl",
      title: "Image URL (Cloudinary / CDN)",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "location",
    },
  },
});
