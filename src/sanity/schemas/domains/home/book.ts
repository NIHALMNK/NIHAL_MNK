import { defineField, defineType } from "sanity";

export const book = defineType({
  name: "book",
  title: "Book",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Book Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverUrl",
      title: "Cover Image URL",
      type: "url",
    }),
    defineField({
      name: "review",
      title: "Personal Takeaway / Review",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "rating",
      title: "Rating (1 to 5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "status",
      title: "Reading Status",
      type: "string",
      options: {
        list: [
          { title: "Finished", value: "finished" },
          { title: "Reading", value: "reading" },
          { title: "Want to Read", value: "want-to-read" },
        ],
      },
      initialValue: "finished",
    }),
    defineField({
      name: "goodreadsUrl",
      title: "Goodreads / Purchase URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author",
    },
  },
});
