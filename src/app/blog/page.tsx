import { redirect } from "next/navigation";

export default function LegacyBlogIndexRedirect() {
  redirect("/blogs");
}
