"use client";

import * as React from "react";
import { BlogHeading } from "@/types/blog";

interface MarkdownRendererProps {
  content: string;
  onHeadingsExtracted?: (headings: BlogHeading[]) => void;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Inline formatting helper for bold, italic, inline code, and links
function renderInlineText(text: string): React.ReactNode {
  // Regex to match code, bold, italic, and links
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Inline Code
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground border border-border/50"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={idx} className="italic text-foreground/90">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Links [Text](Url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      return (
        <a
          key={idx}
          href={linkUrl}
          target={linkUrl.startsWith("http") ? "_blank" : undefined}
          rel={linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="font-medium text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-foreground transition-colors"
        >
          {linkText}
        </a>
      );
    }

    return part;
  });
}

export function MarkdownRenderer({ content, onHeadingsExtracted }: MarkdownRendererProps) {
  const extractedHeadingsRef = React.useRef<BlogHeading[]>([]);

  const elements = React.useMemo(() => {
    const lines = content.split("\n");
    const result: React.ReactNode[] = [];
    const headingsList: BlogHeading[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Empty line
      if (!line.trim()) {
        i++;
        continue;
      }

      // Code Block (```lang)
      if (line.trim().startsWith("```")) {
        const lang = line.trim().replace("```", "").trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) i++; // skip closing ```

        result.push(
          <div key={`code-${i}`} className="my-5 rounded-xl border border-border/60 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 overflow-x-auto shadow-sm">
            {lang && (
              <div className="mb-2 text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                {lang}
              </div>
            )}
            <pre className="leading-relaxed">
              <code>{codeLines.join("\n")}</code>
            </pre>
          </div>
        );
        continue;
      }

      // H2 Heading (## Title)
      if (line.startsWith("## ")) {
        const titleText = line.replace("## ", "").trim();
        const slug = slugifyHeading(titleText);
        headingsList.push({ id: slug, text: titleText, level: 2 });

        result.push(
          <h2
            key={`h2-${slug}-${i}`}
            id={slug}
            className="mt-8 mb-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans scroll-mt-24 border-b border-border/30 pb-2"
          >
            {renderInlineText(titleText)}
          </h2>
        );
        i++;
        continue;
      }

      // H3 Heading (### Title)
      if (line.startsWith("### ")) {
        const titleText = line.replace("### ", "").trim();
        const slug = slugifyHeading(titleText);
        headingsList.push({ id: slug, text: titleText, level: 3 });

        result.push(
          <h3
            key={`h3-${slug}-${i}`}
            id={slug}
            className="mt-6 mb-2 text-lg sm:text-xl font-bold tracking-tight text-foreground font-sans scroll-mt-24"
          >
            {renderInlineText(titleText)}
          </h3>
        );
        i++;
        continue;
      }

      // Blockquote (> Quote)
      if (line.startsWith("> ")) {
        const quoteText = line.replace("> ", "").trim();
        result.push(
          <blockquote
            key={`quote-${i}`}
            className="my-4 border-l-2 border-primary/60 bg-muted/20 pl-4 py-1.5 italic text-sm text-muted-foreground rounded-r-md"
          >
            {renderInlineText(quoteText)}
          </blockquote>
        );
        i++;
        continue;
      }

      // Horizontal Rule (--- or ***)
      if (line.trim() === "---" || line.trim() === "***") {
        result.push(<hr key={`hr-${i}`} className="my-6 border-border/40" />);
        i++;
        continue;
      }

      // Unordered List Item (- item or * item)
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const listItems: string[] = [];
        while (
          i < lines.length &&
          (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
        ) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
          i++;
        }

        result.push(
          <ul key={`ul-${i}`} className="my-4 space-y-1.5 pl-5 list-disc text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
            {listItems.map((item, idx) => (
              <li key={idx}>{renderInlineText(item)}</li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered List Item (1. item)
      if (/^\d+\.\s+/.test(line.trim())) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
          i++;
        }

        result.push(
          <ol key={`ol-${i}`} className="my-4 space-y-1.5 pl-5 list-decimal text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
            {listItems.map((item, idx) => (
              <li key={idx}>{renderInlineText(item)}</li>
            ))}
          </ol>
        );
        continue;
      }

      // Paragraph
      result.push(
        <p key={`p-${i}`} className="my-3.5 text-sm sm:text-[15px] leading-relaxed text-muted-foreground/90">
          {renderInlineText(line)}
        </p>
      );
      i++;
    }

    extractedHeadingsRef.current = headingsList;
    return result;
  }, [content]);

  React.useEffect(() => {
    if (onHeadingsExtracted) {
      onHeadingsExtracted(extractedHeadingsRef.current);
    }
  }, [onHeadingsExtracted, elements]);

  return <div className="markdown-content">{elements}</div>;
}
