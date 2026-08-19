import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/config";

export default defineConfig({
  basePath: "/studio",
  name: "nihal-portfolio-studio",
  title: "Mohammed Nihal K — Portfolio Studio",
  projectId: projectId || "placeholder-project-id",
  dataset: dataset || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content Domains")
          .items([
            // ─── Home Domain ──────────────────────────────────────────
            S.listItem()
              .title("Home Domain")
              .child(
                S.list()
                  .title("Home Content")
                  .items([
                    S.listItem()
                      .title("Site & Hero Identity")
                      .id("siteSettings")
                      .child(
                        S.document()
                          .schemaType("siteSettings")
                          .documentId("site-settings-singleton")
                      ),
                    S.listItem()
                      .title("About Me Page")
                      .id("about")
                      .child(
                        S.document()
                          .schemaType("about")
                          .documentId("about-singleton")
                      ),
                    S.documentTypeListItem("achievement").title("Achievements & Certifications"),
                    S.documentTypeListItem("book").title("Books Shelf"),
                    S.documentTypeListItem("movie").title("Movies & Cinema"),
                    S.documentTypeListItem("recentSnap").title("Recent Snaps"),
                    S.documentTypeListItem("currentResource").title("Curated Resources"),
                  ])
              ),

            // ─── Projects Domain ──────────────────────────────────────
            S.documentTypeListItem("project").title("Projects Domain"),

            // ─── Blogs Domain ─────────────────────────────────────────
            S.documentTypeListItem("blogPost").title("Blogs & Writing Domain"),

            // ─── Connect Domain (Singleton) ───────────────────────────
            S.listItem()
              .title("Connect Domain")
              .id("connectLinks")
              .child(
                S.document()
                  .schemaType("connectLinks")
                  .documentId("connect-links-singleton")
              ),

            S.divider(),

            // ─── Stacks Domain (Single Source of Truth) ───────────────
            S.listItem()
              .title("Stacks Domain (Skills & Tech)")
              .child(
                S.list()
                  .title("Stacks Management")
                  .items([
                    S.documentTypeListItem("stack").title("Technologies & Tools"),
                    S.documentTypeListItem("stackCategory").title("Stack Categories"),
                  ])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
