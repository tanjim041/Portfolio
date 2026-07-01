import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import TimelineItem from "../components/TimelineItem";
import portfolioData from "../data/portfolio";

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 relative" aria-label="Education">
      <Container maxWidth="max-w-4xl">
        <SectionTitle prefix="My" accent="Education" />

        <div className="relative wrap overflow-hidden h-full">
          {/* Timeline Vertical Line */}
          <div
            className="border-2-2 absolute border-opacity-20 border-accent-primary h-full border"
            style={{ left: "50%" }}
          />

          {education.map((edu, index) => (
            <TimelineItem
              key={edu.institution}
              item={edu}
              index={index}
              total={education.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
