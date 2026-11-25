import { defineField, defineType } from "sanity";

const httpsUrl = { scheme: ["https"] };

export const connectLinks = defineType({
  name: "connectLinks",
  title: "Connect & Social Links",
  type: "document",
  description:
    "Single source of truth for every social, contact and resume link on the site (hero, about, navbar, footer, llms.txt).",
  fields: [
    defineField({
      name: "github",
      title: "GitHub Profile URL",
      type: "url",
      description: "e.g. https://github.com/username — the username also drives the GitHub activity graph.",
      validation: (Rule) => Rule.required().uri(httpsUrl),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Profile URL",
      type: "url",
      validation: (Rule) => Rule.required().uri(httpsUrl),
    }),
    defineField({
      name: "instagram",
      title: "Instagram Profile URL",
      type: "url",
      description: "Optional — the Instagram button is hidden when empty.",
      validation: (Rule) => Rule.uri(httpsUrl),
    }),
    defineField({
      name: "leetcode",
      title: "LeetCode Profile URL",
      type: "url",
      description:
        "e.g. https://leetcode.com/u/username — the username also drives the LeetCode activity graph.",
      validation: (Rule) => Rule.uri(httpsUrl),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "resume",
      title: "Resume (Google Drive link)",
      type: "url",
      description:
        "Upload the PDF to Google Drive, set sharing to “Anyone with the link → Viewer”, and paste the share link here.",
      validation: (Rule) =>
        Rule.required()
          .uri(httpsUrl)
          .custom((value) => {
            if (!value) return true;
            return /^https:\/\/(drive|docs)\.google\.com\//.test(value)
              ? true
              : "Must be a Google Drive link (https://drive.google.com/…)";
          }),
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
