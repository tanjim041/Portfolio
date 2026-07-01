import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import ActivityCard from "../components/ActivityCard";
import portfolioData from "../data/portfolio";

export default function Activities() {
  const { activities } = portfolioData;

  return (
    <section id="activities" className="py-24 bg-secondary" aria-label="Extracurricular activities">
      <Container>
        <SectionTitle
          prefix="Extracurricular"
          accent="Activities"
          accentColor="text-accent-secondary"
          lineColor="from-accent-secondary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.title} activity={activity} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
