import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGo,
  SiPostgresql,
  SiNodedotjs,
  SiJavascript,
} from "react-icons/si"

const skills = [
  { icon: SiNextdotjs,   label: "Next.js" },
  { icon: SiReact,       label: "React" },
  { icon: SiTypescript,  label: "TypeScript" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiGo,          label: "Go" },
  { icon: SiPostgresql,  label: "PostgreSQL" },
  { icon: SiNodedotjs,   label: "Node.js" },
  { icon: SiJavascript,  label: "JavaScript" },
]

export default function TechStack() {
  return (
    <section className="container mx-auto px-4 py-20" id="skills">
      <h2 className="text-5xl md:text-6xl font-light text-white text-center mb-16">
        Skills
      </h2>
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-10">
        {skills.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <Icon className="text-white" size={72} />
            <span className="text-slate-300 text-lg">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
