"use client";

import * as React from "react";
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useStaggerReveal } from "@/lib/animation/hooks";
import { contactFormSchema } from "@/lib/validation/contact";
import { cn } from "@/lib/utils/cn";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactView() {
  const [formData, setFormData] = React.useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const containerRef = useStaggerReveal<HTMLDivElement>({
    itemSelector: "[data-animate-item]",
    y: 20,
    duration: 0.5,
    stagger: 0.08,
  });

  const validateField = (name: keyof FormState, value: string): string | undefined => {
    const singleFieldSchema = contactFormSchema.pick({ [name]: true } as Record<keyof FormState, true>);
    const result = singleFieldSchema.safeParse({ [name]: value });
    if (!result.success) {
      const issue = result.error.issues[0];
      return issue?.message;
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError(null);

    // Validate on change if field was already touched
    if (touched[name]) {
      const errorMsg = validateField(name as keyof FormState, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    // Validate full form
    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors: FormErrors = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof FormErrors;
        if (fieldName && !newErrors[fieldName]) {
          newErrors[fieldName] = issue.message;
        }
      }
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationResult.data),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(data.message || "Failed to send message. Please try again.");
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 py-8 sm:py-12 md:py-16">
      <Container className="max-w-2xl space-y-8 sm:space-y-10">
        {/* Header */}
        <div ref={containerRef} className="space-y-3">
          <div
            data-animate-item
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-border/40 text-xs font-mono text-muted-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Get In Touch</span>
          </div>

          <h1
            data-animate-item
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans"
          >
            Contact
          </h1>
          <p
            data-animate-item
            className="text-sm sm:text-base text-muted-foreground font-mono leading-relaxed"
          >
            Have a project in mind, an opportunity, or just want to say hi? Fill out the form below.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-sm">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in-50 duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground font-sans">
                Message Sent Successfully!
              </h3>
              <p className="text-xs sm:text-sm font-mono text-muted-foreground max-w-sm mx-auto">
                Thank you for reaching out. I&apos;ve received your message and will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="glass-button inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-mono font-medium text-foreground transition-all shadow-xs mt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Server Error Alert */}
              {serverError && (
                <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-mono flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Field 1: Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-mono font-medium text-foreground"
                >
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(
                    "w-full h-11 px-4 rounded-xl glass-card text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/60 border transition-all shadow-xs focus:outline-none",
                    errors.name
                      ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/30"
                      : "border-border/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
                  )}
                />
                {errors.name && (
                  <p id="name-error" className="text-[11px] font-mono text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-mono font-medium text-foreground"
                >
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(
                    "w-full h-11 px-4 rounded-xl glass-card text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/60 border transition-all shadow-xs focus:outline-none",
                    errors.email
                      ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/30"
                      : "border-border/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
                  )}
                />
                {errors.email && (
                  <p id="email-error" className="text-[11px] font-mono text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Field 3: Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-mono font-medium text-foreground"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder="What would you like to discuss? (minimum 10 characters)"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(
                    "w-full p-4 rounded-xl glass-card text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/60 border transition-all shadow-xs focus:outline-none resize-y",
                    errors.message
                      ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/30"
                      : "border-border/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
                  )}
                />
                {errors.message && (
                  <p id="message-error" className="text-[11px] font-mono text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 text-xs sm:text-sm font-mono font-semibold transition-all shadow-sm select-none",
                    isSubmitting
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:opacity-90 active:scale-[0.99] cursor-pointer"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </main>
  );
}
