import { portfolioData } from "@/data/portfolio";

export function SkillsSection() {
  const { skillCategories } = portfolioData;

  return (
    <section id="skills" className="flex items-center py-16 lg:py-[120px] lg:min-h-screen">
      <div className="mx-auto px-4 w-full max-w-5xl">
        <h2 className="mb-12 font-bold text-[8vw] lg:text-[4vw]">Skills</h2>
        <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.heading}>
              <h3 className="mb-6 font-semibold text-[#ededed] text-xl">
                {category.heading}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-[#ededed]/70">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
