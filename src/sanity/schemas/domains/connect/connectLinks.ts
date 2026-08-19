import { defineField, defineType } from "sanity";

export const connectLinks = defineType({
  name: "connectLinks",
  title: "Connect & Social Links",
  type: "document",
  fields: [
    defineField({
      name: "instagram",
      title: "Instagram Profile URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "github",
      title: "GitHub Profile URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Profile URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resume",
      title: "Resume URL / File",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Connect & Social Links (Singleton)",
      };
    },
  },
});
