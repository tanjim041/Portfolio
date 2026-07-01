import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import portfolioData from "../data/portfolio";

export default function Contact() {
  const { contact } = portfolioData;
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const inputClasses =
    "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors";

  return (
    <section id="contact" className="py-24 bg-secondary" aria-label="Contact">
      <Container>
        <SectionTitle prefix="Get In" accent="Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-poppins font-semibold mb-6 text-text-main">
              Let&apos;s Connect
            </h3>
            <p className="text-text-muted mb-8">
              I&apos;m currently open to new opportunities. Whether you have a question or just want
              to say hi, I&apos;ll try my best to get back to you!
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-accent-primary flex-shrink-0">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-text-main">{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-text-muted hover:text-accent-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p
                        className={`text-text-muted ${info.isPreformatted ? "whitespace-pre-line" : ""}`}
                      >
                        {info.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps */}
            <div className="h-64 w-full rounded-xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14601.769062638848!2d90.3752538965682!3d23.802874136814757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72c231751d3%3A0xc48c0356cbb45db0!2sMirpur-14%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(92%) contrast(83%)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
              <form
                id="contactForm"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                {/* Form Status Message */}
                {formStatus.message && (
                  <div
                    className={`rounded-lg p-4 text-sm font-medium border ${
                      formStatus.type === "success"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                    role="alert"
                  >
                    {formStatus.message}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-text-muted mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="John Doe"
                    className={inputClasses}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-text-muted mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="john@example.com"
                    className={inputClasses}
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-text-muted mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    placeholder="Project Inquiry"
                    className={inputClasses}
                    aria-invalid={errors.subject ? "true" : "false"}
                    {...register("subject", { required: "Subject is required" })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-text-muted mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    placeholder="Hello Tanjim, I would like to..."
                    className={`${inputClasses} resize-none`}
                    aria-invalid={errors.message ? "true" : "false"}
                    {...register("message", { required: "Message is required" })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-accent-primary text-background font-bold rounded-lg px-4 py-3 hover:bg-accent-secondary hover-glow transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
