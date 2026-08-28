import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Send, Github, Linkedin, Facebook } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import portfolioData from "../data/portfolio";

/* ─── animation variants ─────────────────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const colVariants = (dir = 1) => ({
  hidden: { opacity: 0, x: dir * 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
});

const statusVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.2 } },
};

const infoItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ─── social icon map (lucide) ───────────────────────────────────── */
const socialIconMap = { github: Github, linkedin: Linkedin, facebook: Facebook };

/* ─── Codeforces inline SVG (not in lucide) ──────────────────────── */
function CfIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.5 7.5A1.5 1.5 0 0 1 6 6h2a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 8 18H6a1.5 1.5 0 0 1-1.5-1.5v-9ZM10.5 3A1.5 1.5 0 0 1 12 1.5h2A1.5 1.5 0 0 1 15.5 3v13.5A1.5 1.5 0 0 1 14 18h-2a1.5 1.5 0 0 1-1.5-1.5V3ZM16.5 10.5A1.5 1.5 0 0 1 18 9h2a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 20 18h-2a1.5 1.5 0 0 1-1.5-1.5v-6Z" />
    </svg>
  );
}

export default function Contact() {
  const { contact, socials } = portfolioData;
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({ type: "success", message: result.message });
        reset();
      } else {
        const errorMsg = result.errors
          ? result.errors.map((err) => err.msg).join(", ")
          : result.message || "Something went wrong. Please try again.";
        setFormStatus({ type: "error", message: errorMsg });
      }
    } catch {
      setFormStatus({ type: "error", message: "Network error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: contact.address,
      isPreformatted: true,
    },
    {
      icon: Phone,
      title: "Phone",
      content: contact.phone,
    },
    {
      icon: Mail,
      title: "Email",
      content: contact.email,
      href: `mailto:${contact.email}`,
    },
  ];

  /* ── input class: plain border + transitions; glow applied via CSS utility ── */
  const inputBase =
    "w-full bg-background border border-border rounded px-4 py-3 text-text-main font-mono text-xs transition-all duration-200 input-focus-glow";

  /* ── derive entrance variants respecting reduced motion ── */
  const entranceLeft = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : colVariants(-1);
  const entranceRight = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : colVariants(1);

  return (
    <section
      id="contact"
      className="py-32 lg:py-48 bg-secondary relative overflow-hidden"
      aria-label="Contact"
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 100%, var(--color-glow) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 100% 0%, var(--color-glow) 0%, transparent 100%)",
        }}
      />

      <Container>
        <SectionTitle prefix="Get In" accent="Touch" number="08" />

        {/* Terminal closing line */}
        <motion.p
          className="font-mono text-xs text-accent-primary tracking-widest uppercase mb-12 -mt-12 flex items-center gap-2"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-text-muted/40 select-none">{">"}</span>
          ready to connect? let&apos;s build something.
          <span className="inline-block w-2 h-3.5 bg-accent-primary animate-pulse ml-0.5 align-middle" />
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Left: Contact Info ── */}
          <motion.div
            variants={entranceLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4 text-text-main">
              Let&apos;s Connect
            </h3>
            <p className="text-text-muted mb-8 leading-relaxed text-sm">
              I&apos;m currently open to new opportunities. Whether you have a question or just want
              to say hi, I&apos;ll try my best to get back to you!
            </p>

            {/* Contact info items — staggered */}
            <div className="space-y-5 mb-8">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  className="flex items-start gap-4 group"
                  custom={i}
                  variants={
                    shouldReduceMotion
                      ? {}
                      : infoItemVariants
                  }
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded bg-card border border-border flex items-center justify-center text-accent-primary flex-shrink-0 group-hover:border-accent-primary/50 group-hover:bg-accent-primary/10 transition-all duration-300">
                    <info.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] font-bold tracking-wider uppercase text-text-muted mb-0.5">
                      {info.title}
                    </h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm text-text-muted hover:text-accent-primary transition-colors duration-200 group-hover:underline underline-offset-2"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p
                        className={`text-sm text-text-muted ${info.isPreformatted ? "whitespace-pre-line" : ""}`}
                      >
                        {info.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted/40 mb-3">
                // Find me on
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => {
                  const Icon =
                    s.icon === "codeforces"
                      ? CfIcon
                      : socialIconMap[s.icon] ?? Mail;
                  return (
                    <motion.a
                      key={s.platform}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="
                        flex items-center gap-2 px-3.5 py-2 rounded
                        border border-border bg-card
                        font-mono text-[11px] text-text-muted
                        hover:border-accent-primary/60 hover:text-accent-primary hover:bg-accent-primary/5
                        focus-visible:outline-none focus-visible:border-accent-primary focus-visible:ring-2 focus-visible:ring-accent-primary/30
                        transition-all duration-200
                      "
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{s.platform}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Google Maps */}
            <motion.div
              className="h-56 w-full rounded overflow-hidden border border-border"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14601.769062638848!2d90.3752538965682!3d23.802874136814757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72c231751d3%3A0xc48c0356cbb45db0!2sMirpur-14%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) opacity(0.85) contrast(1.05)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </motion.div>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            variants={entranceRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-card border border-border rounded p-6 md:p-8 shadow-lg">
              {/* Form header */}
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted/40 mb-5">
                // send a message
              </p>

              <form
                id="contactForm"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Animated status banner */}
                <AnimatePresence mode="wait">
                  {formStatus.message && (
                    <motion.div
                      key={formStatus.type + formStatus.message}
                      variants={shouldReduceMotion ? {} : statusVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`rounded p-4 text-xs font-mono border flex items-start gap-2 ${
                        formStatus.type === "success"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/25"
                          : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25"
                      }`}
                      role="alert"
                      aria-live="polite"
                    >
                      <span className="select-none mt-0.5">
                        {formStatus.type === "success" ? "✓" : "✗"}
                      </span>
                      <span>{formStatus.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="John Doe"
                    className={inputBase}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    {...register("name", { required: "Name is required" })}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        id="contact-name-error"
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-xs text-red-500 font-mono overflow-hidden"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="john@example.com"
                    className={inputBase}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        id="contact-email-error"
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-xs text-red-500 font-mono overflow-hidden"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    placeholder="Project Inquiry"
                    className={inputBase}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    {...register("subject", { required: "Subject is required" })}
                  />
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.p
                        id="contact-subject-error"
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-xs text-red-500 font-mono overflow-hidden"
                      >
                        {errors.subject.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    placeholder="Hello Tanjim, I would like to..."
                    className={`${inputBase} resize-none`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    {...register("message", { required: "Message is required" })}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        id="contact-message-error"
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-xs text-red-500 font-mono overflow-hidden"
                      >
                        {errors.message.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-accent-primary text-background font-mono text-xs uppercase tracking-widest font-bold rounded px-4 py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:bg-accent-secondary hover-glow"
                  }`}
                  whileHover={shouldReduceMotion || isSubmitting ? {} : { scale: 1.01 }}
                  whileTap={shouldReduceMotion || isSubmitting ? {} : { scale: 0.98 }}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <motion.span
                    animate={shouldReduceMotion || isSubmitting ? {} : { x: isSubmitting ? 2 : 0 }}
                    transition={{ repeat: isSubmitting ? Infinity : 0, duration: 0.6, repeatType: "mirror" }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </form>
            </div>

            {/* Bottom terminal line */}
            <p className="mt-4 font-mono text-[10px] text-text-muted/30 tracking-widest text-right">
              islamtanjim316@gmail.com :: Dhaka, Bangladesh
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
