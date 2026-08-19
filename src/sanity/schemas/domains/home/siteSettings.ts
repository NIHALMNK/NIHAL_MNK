import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Hero Identity",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Professional Role / Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Short Headline Statement",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "bio",
      title: "Hero Bio Paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image URL",
      type: "url",
      description: "Direct URL to Cloudinary or hosted avatar asset.",
    }),
    defineField({
      name: "avatarAsset",
      title: "Uploaded Avatar Asset",
      type: "image",
      description: "Optional uploaded asset if not using profileImage URL.",
    }),
    defineField({
      name: "location",
      title: "Location & Timezone",
      type: "string",
      initialValue: "India (UTC+5:30)",
    }),
    defineField({
      name: "availableForHire",
      title: "Available For Hire",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO Metadata",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Meta Title", type: "string" }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2 }),
        defineField({ name: "siteUrl", title: "Canonical Site URL", type: "url" }),
        defineField({ name: "ogImageUrl", title: "OpenGraph Image URL", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
  },
});
