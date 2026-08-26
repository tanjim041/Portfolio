import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import portfolioData from "../data/portfolio";

export default function Projects() {
  const { projects } = portfolioData;
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <section id="projects" className="py-32 lg:py-48 relative overflow-hidden" aria-label="Featured projects">
      <Container>
        <SectionTitle prefix="Featured" accent="Projects" number="05" />

        <div className="flex flex-col gap-8">
          {/* Featured Project */}
          {featuredProject && (
            <ProjectCard project={featuredProject} index={0} featured={true} />
          )}

          {/* Asymmetric grid for remaining projects */}
          {otherProjects.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {otherProjects.map((project, idx) => {
                const colSpanClass = idx % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5";
                return (
                  <div key={project.title} className={colSpanClass}>
                    <ProjectCard project={project} index={idx + 1} featured={false} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
