import { defineField, defineType } from "sanity";

export const stack = defineType({
  name: "stack",
  title: "Technology / Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Technology Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "stackCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconUrl",
      title: "Icon URL (Devicon / SVG / CDN)",
      type: "url",
      description: "Direct URL to the SVG / image asset for maximum crispness and CDN delivery.",
    }),
    defineField({
      name: "icon",
      title: "Uploaded Icon Asset",
      type: "image",
      description: "Optional uploaded asset if not using iconUrl.",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "proficiencyLevel",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
      },
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
    }),
    defineField({
      name: "documentationUrl",
      title: "Documentation URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.name",
    },
  },
});
