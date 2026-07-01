import { motion } from "framer-motion";
import { GraduationCap, MapPin, Mail, Heart } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import InfoCard from "../components/InfoCard";
import portfolioData from "../data/portfolio";

const infoCards = (personal) => [
  {
    icon: GraduationCap,
    label: "University",
    value: `${personal.university} (${personal.department})`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personal.location,
  },
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: Heart,
    label: "Interests",
    value: personal.interests,
  },
];

export default function About() {
  const { personal } = portfolioData;
  const cards = infoCards(personal);

  return (
    <section id="about" className="py-24 bg-secondary" aria-label="About me">
      <Container>
        <SectionTitle prefix="About" accent="Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Profile Image */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-border bg-card">
                <img
                  src="/images/profile.jpg"
                  alt={`${personal.name} profile`}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=Tanjimul+Islam&size=512&background=09090B&color=06B6D4`;
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + Info Cards */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-poppins font-semibold mb-6 text-text-main">
              {personal.subtitle}
            </h3>

            <p className="text-text-muted text-lg leading-relaxed mb-8">{personal.about}</p>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card) => (
                <InfoCard
                  key={card.label}
                  icon={card.icon}
                  label={card.label}
                  value={card.value}
                  href={card.href}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
