/**
 * Programmatic, Idempotent Sanity Migration Script
 * 
 * Usage:
 *   npx tsx scripts/migrate-to-sanity.ts
 * 
 * Requirements:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   SANITY_API_WRITE_TOKEN
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

// Load .env.local and .env
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { stackData } from "../src/data/stacks";
import { connectLinksData } from "../src/data/connect";
import { siteSettingsData } from "../src/data/home/site";
import { aboutData } from "../src/data/home/about-me";
import { achievementsData } from "../src/data/home/achievements";
import { booksData } from "../src/data/home/books";
import { moviesData } from "../src/data/home/movies";
import { snapsData } from "../src/data/home/recent-snaps";
import { bookmarksData } from "../src/data/home/current-resources";
import { projectsData } from "../src/data/projects";
import { blogData } from "../src/data/blogs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || projectId === "your_project_id_here") {
  console.error("❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not configured in environment variables.");
  process.exit(1);
}

if (!token) {
  console.error("❌ Error: SANITY_API_WRITE_TOKEN is required to perform migrations.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-19",
  token,
  useCdn: false,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function runMigration() {
  console.log("🚀 Starting idempotent Sanity migration...");
  console.log(`📌 Project ID: ${projectId} | Dataset: ${dataset}`);

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  // ─── 1. Stack Categories ──────────────────────────────────────────────────
  console.log("\n📦 [1/7] Migrating Stack Categories...");
  const uniqueCategories = Array.from(new Set(stackData.map((s) => s.category)));
  const categoryMap = new Map<string, string>(); // Category Name -> Sanity Document ID

  for (let index = 0; index < uniqueCategories.length; index++) {
    const catName = uniqueCategories[index];
    const catSlug = slugify(catName);
    const docId = `stack-cat-${catSlug}`;
    categoryMap.set(catName, docId);

    try {
      await client.createOrReplace({
        _id: docId,
        _type: "stackCategory",
        name: catName,
        slug: { _type: "slug", current: catSlug },
        order: index + 1,
      });
      createdCount++;
      console.log(`  ✓ Stack Category: "${catName}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Stack Category: "${catName}"`, err);
      errorCount++;
    }
  }

  // ─── 2. Stack / Technologies ──────────────────────────────────────────────
  console.log("\n⚡ [2/7] Migrating Technologies / Stacks...");
  const stackMap = new Map<string, string>(); // Tech ID/Slug/Name -> Sanity Document ID

  for (let index = 0; index < stackData.length; index++) {
    const tech = stackData[index];
    const catId = categoryMap.get(tech.category);
    const docId = tech.id.startsWith("tech-") ? tech.id : `tech-${slugify(tech.name)}`;

    stackMap.set(tech.id, docId);
    stackMap.set(tech.slug, docId);
    stackMap.set(tech.name.toLowerCase(), docId);

    try {
      await client.createOrReplace({
        _id: docId,
        _type: "stack",
        name: tech.name,
        slug: { _type: "slug", current: tech.slug },
        category: catId ? { _type: "reference", _ref: catId } : undefined,
        iconUrl: tech.icon?.url,
        tagline: tech.tagline,
        description: tech.description,
        proficiencyLevel: tech.proficiencyLevel,
        yearsOfExperience: tech.yearsOfExperience,
        documentationUrl: tech.documentationUrl,
        order: tech.order ?? index + 1,
        isActive: tech.isActive ?? true,
      });
      createdCount++;
      console.log(`  ✓ Stack: "${tech.name}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Stack: "${tech.name}"`, err);
      errorCount++;
    }
  }

  // Helper to resolve a tech reference
  function resolveStackRef(identifier: string) {
    const docId =
      stackMap.get(identifier) ||
      stackMap.get(identifier.toLowerCase()) ||
      stackMap.get(`tech-${slugify(identifier)}`);
    if (docId) {
      return { _type: "reference", _ref: docId, _key: slugify(identifier) };
    }
    return null;
  }

  // ─── 3. Connect Links (Singleton) ─────────────────────────────────────────
  console.log("\n🔗 [3/7] Migrating Connect Links...");
  try {
    await client.createOrReplace({
      _id: "connect-links-singleton",
      _type: "connectLinks",
      instagram: connectLinksData.instagram,
      github: connectLinksData.github,
      linkedin: connectLinksData.linkedin,
      email: connectLinksData.email,
      resume: connectLinksData.resume,
    });
    createdCount++;
    console.log("  ✓ Connect Links (connect-links-singleton)");
  } catch (err) {
    console.error("  ✗ Failed Connect Links", err);
    errorCount++;
  }

  // ─── 4. Home Domain (Site, About, Achievements, Books, Movies, Snaps, Resources) ──
  console.log("\n🏠 [4/7] Migrating Home Domain Content...");

  // Site Settings (Singleton)
  try {
    await client.createOrReplace({
      _id: "site-settings-singleton",
      _type: "siteSettings",
      name: siteSettingsData.name,
      role: siteSettingsData.role,
      headline: siteSettingsData.headline,
      bio: siteSettingsData.bio,
      profileImage: siteSettingsData.profileImage,
      location: siteSettingsData.location,
      availableForHire: siteSettingsData.availableForHire,
      defaultSeo: {
        _type: "object",
        title: siteSettingsData.defaultSeo.title,
        description: siteSettingsData.defaultSeo.description,
        siteUrl: siteSettingsData.defaultSeo.siteUrl,
        ogImageUrl: siteSettingsData.defaultSeo.ogImage?.url,
      },
    });
    createdCount++;
    console.log("  ✓ Site Settings (site-settings-singleton)");
  } catch (err) {
    console.error("  ✗ Failed Site Settings", err);
    errorCount++;
  }

  // About Me (Singleton with Stack References)
  try {
    const experienceWithRefs = aboutData.experience.map((exp) => ({
      _key: exp.id,
      id: exp.id,
      role: exp.role,
      company: exp.company,
      period: exp.period,
      location: exp.location,
      description: exp.description,
      responsibilities: exp.responsibilities,
      technologies: (exp.technologies || [])
        .map((t) => resolveStackRef(t))
        .filter(Boolean),
    }));

    await client.createOrReplace({
      _id: "about-singleton",
      _type: "about",
      profile: {
        name: aboutData.profile.name,
        role: aboutData.profile.role,
        location: aboutData.profile.location,
        avatarUrl: aboutData.profile.avatarUrl,
        availableForHire: aboutData.profile.availableForHire,
      },
      summary: {
        title: aboutData.summary.title,
        content: aboutData.summary.content,
        highlights: aboutData.summary.highlights.map((h, i) => ({
          _key: `highlight-${i}`,
          label: h.label,
          value: h.value,
        })),
      },
      education: aboutData.education.map((edu) => ({
        _key: edu.id,
        id: edu.id,
        institution: edu.institution,
        degree: edu.degree,
        field: edu.field,
        period: edu.period,
        location: edu.location,
        description: edu.description,
      })),
      experience: experienceWithRefs,
    });
    createdCount++;
    console.log("  ✓ About Page Content (about-singleton)");
  } catch (err) {
    console.error("  ✗ Failed About Page", err);
    errorCount++;
  }

  // Achievements
  for (const ach of achievementsData) {
    const docId = ach.id;
    const skillRefs = (ach.skills || []).map((s) => {
      const ref = resolveStackRef(s);
      return ref ? ref : s;
    });

    try {
      await client.createOrReplace({
        _id: docId,
        _type: "achievement",
        title: ach.title,
        issuer: ach.issuer,
        date: ach.date,
        shortDescription: ach.shortDescription,
        description: ach.description,
        credentialId: ach.credentialId,
        logoUrl: ach.logo?.url,
        skills: skillRefs,
      });
      createdCount++;
      console.log(`  ✓ Achievement: "${ach.title}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Achievement: "${ach.title}"`, err);
      errorCount++;
    }
  }

  // Books
  for (const book of booksData) {
    const docId = book.id;
    try {
      await client.createOrReplace({
        _id: docId,
        _type: "book",
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        review: book.review,
        rating: book.rating,
        status: book.status,
        goodreadsUrl: book.goodreadsUrl,
      });
      createdCount++;
      console.log(`  ✓ Book: "${book.title}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Book: "${book.title}"`, err);
      errorCount++;
    }
  }

  // Movies
  for (const movie of moviesData) {
    const docId = movie.id;
    try {
      await client.createOrReplace({
        _id: docId,
        _type: "movie",
        title: movie.title,
        director: movie.director,
        year: movie.year,
        posterUrl: movie.posterUrl,
        review: movie.review,
        rating: movie.rating,
        imdbUrl: movie.imdbUrl,
      });
      createdCount++;
      console.log(`  ✓ Movie: "${movie.title}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Movie: "${movie.title}"`, err);
      errorCount++;
    }
  }

  // Recent Snaps
  for (const snap of snapsData) {
    const docId = snap.id;
    try {
      await client.createOrReplace({
        _id: docId,
        _type: "recentSnap",
        caption: snap.caption,
        location: snap.location,
        takenAt: snap.takenAt,
        mediaUrl: snap.media.url,
        alt: snap.media.alt,
      });
      createdCount++;
      console.log(`  ✓ Recent Snap: "${snap.caption}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Recent Snap: "${snap.caption}"`, err);
      errorCount++;
    }
  }

  // Current Resources (Bookmarks)
  for (const res of bookmarksData) {
    const docId = res.id;
    try {
      await client.createOrReplace({
        _id: docId,
        _type: "currentResource",
        title: res.title,
        url: res.url,
        domain: res.domain,
        category: res.category,
        description: res.description,
      });
      createdCount++;
      console.log(`  ✓ Current Resource: "${res.title}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Current Resource: "${res.title}"`, err);
      errorCount++;
    }
  }

  // ─── 5. Projects Domain ───────────────────────────────────────────────────
  console.log("\n💼 [5/7] Migrating Projects...");
  for (const proj of projectsData) {
    const docId = proj.id;
    const techRefs = (proj.technologies || [])
      .map((t) => resolveStackRef(t))
      .filter(Boolean);

    try {
      await client.createOrReplace({
        _id: docId,
        _type: "project",
        title: proj.title,
        slug: { _type: "slug", current: proj.slug },
        shortDescription: proj.shortDescription,
        description: proj.description,
        coverImageUrl: proj.coverImage?.url,
        videoUrl: proj.videoUrl,
        technologies: techRefs,
        features: proj.features || [],
        liveUrl: proj.liveUrl,
        githubUrl: proj.githubUrl,
        priority: proj.priority,
        status: proj.status || "Operational",
        publishedAt: proj.publishedAt,
      });
      createdCount++;
      console.log(`  ✓ Project: "${proj.title}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Project: "${proj.title}"`, err);
      errorCount++;
    }
  }

  // ─── 6. Blogs Domain ──────────────────────────────────────────────────────
  console.log("\n📝 [6/7] Migrating Blog Posts...");
  for (const post of blogData) {
    const docId = post.id;
    try {
      await client.createOrReplace({
        _id: docId,
        _type: "blogPost",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        excerpt: post.excerpt,
        introCallout: post.introCallout,
        content: post.content,
        coverImageUrl: post.coverImage?.url,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        tags: post.tags || [],
        featured: post.featured ?? false,
        author: post.author,
      });
      createdCount++;
      console.log(`  ✓ Blog Post: "${post.title}" (${docId})`);
    } catch (err) {
      console.error(`  ✗ Failed Blog Post: "${post.title}"`, err);
      errorCount++;
    }
  }

  // ─── 7. Final Summary ─────────────────────────────────────────────────────
  console.log("\n==============================================");
  console.log("🎉 Migration Complete!");
  console.log(`  ✓ Total Operations Processed: ${createdCount}`);
  console.log(`  ✗ Total Errors: ${errorCount}`);
  console.log("==============================================\n");
}

runMigration().catch((err) => {
  console.error("Fatal migration error:", err);
  process.exit(1);
});
