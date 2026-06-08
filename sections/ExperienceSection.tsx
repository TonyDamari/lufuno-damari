import { portfolioData } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="flex items-center py-16 lg:py-[120px] lg:min-h-screen">
      <div className="mx-auto px-4 w-full max-w-3xl">
        <h2 className="mb-8 font-bold text-[8vw] lg:text-[4vw]">Experience</h2>
        <ul className="list-none">
          {portfolioData.experience.map((role, index) => (
            <li
              key={role.title}
              className={`py-4 text-lg text-[#ededed]/80${
                index < portfolioData.experience.length - 1
                  ? " border-b border-white/10"
                  : ""
              }`}
            >
              {role.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
