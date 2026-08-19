import { SchemaTypeDefinition } from "sanity";

// Stacks Domain (Central Single Source of Truth)
import { stackCategory } from "./domains/stacks/stackCategory";
import { stack } from "./domains/stacks/stack";

// Connect Domain (Central Single Source of Truth)
import { connectLinks } from "./domains/connect/connectLinks";

// Home Domain
import { siteSettings } from "./domains/home/siteSettings";
import { about } from "./domains/home/about";
import { achievement } from "./domains/home/achievement";
import { book } from "./domains/home/book";
import { movie } from "./domains/home/movie";
import { recentSnap } from "./domains/home/recentSnap";
import { currentResource } from "./domains/home/currentResource";

// Projects Domain
import { project } from "./domains/projects/project";

// Blogs Domain
import { blogPost } from "./domains/blogs/blogPost";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Stacks
  stackCategory,
  stack,

  // Connect
  connectLinks,

  // Home
  siteSettings,
  about,
  achievement,
  book,
  movie,
  recentSnap,
  currentResource,

  // Projects
  project,

  // Blogs
  blogPost,
];
