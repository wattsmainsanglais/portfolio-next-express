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
      <h2 className="text-5xl md:text-6xl font-light text-slate-900 dark:text-white text-center mb-6">
        Skills
      </h2>

      <p className="text-xl text-slate-500 dark:text-slate-400 text-center mb-16 max-w-2xl mx-auto">
        Full-stack development using modern JavaScript frameworks — Next.js, Vite, React — plus Go backend and PostgreSQL. Available for freelance contracts across Europe.
      </p>

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-10">
        {skills.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <Icon className="text-slate-700 dark:text-white" size={72} />
            <span className="text-slate-500 dark:text-slate-300 text-lg">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
