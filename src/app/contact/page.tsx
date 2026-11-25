import { Metadata } from "next";
import { ContactView } from "@/components/contact/contact-view";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for web development projects, engineering opportunities, or general inquiries.",
};

export default function ContactPage() {
  return <ContactView />;
}
