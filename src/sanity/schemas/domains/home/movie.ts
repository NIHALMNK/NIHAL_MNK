import { defineField, defineType } from "sanity";

export const movie = defineType({
  name: "movie",
  title: "Movie & Cinema",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Movie Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "director",
      title: "Director",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Release Year",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "posterUrl",
      title: "Poster Image URL",
      type: "url",
    }),
    defineField({
      name: "review",
      title: "Personal Review",
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
      name: "imdbUrl",
      title: "IMDb / Letterboxd URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "director",
    },
  },
});
