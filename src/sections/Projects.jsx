import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import portfolioData from "../data/portfolio";

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 relative" aria-label="Featured projects">
      <Container>
        <SectionTitle prefix="Featured" accent="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
