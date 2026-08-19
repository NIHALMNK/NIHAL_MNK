import { Metadata } from "next";
import { ContactView } from "@/components/contact/contact-view";

export const metadata: Metadata = {
  title: "Contact — Mohammed Nihal K",
  description:
    "Get in touch with Mohammed Nihal K for web development projects, engineering opportunities, or general inquiries.",
};

export default function ContactPage() {
  return <ContactView />;
}
