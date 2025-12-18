import Image from "next/image"

export default function SingleProject({heading, src, alt, desc, link}) {
  return (
    <article className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden hover:border-purple-500 transition-all group">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Image - 50% width on desktop */}
        <div className="md:w-1/2 flex-shrink-0">
          <a
            href={link}
            target='_blank'
            rel="noopener noreferrer"
            className="block relative overflow-hidden h-64 md:h-full"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </a>
        </div>

        {/* Content - Larger text */}
        <div className="flex-1 p-10 md:p-12 flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 group-hover:text-purple-400 transition-colors">
            <a href={link} target='_blank' rel="noopener noreferrer">
              {heading}
            </a>
          </h3>
          <p className="text-lg md:text-xl text-slate-100 leading-relaxed mb-6">
            {desc}
          </p>
          <a
            href={link}
            target='_blank'
            rel="noopener noreferrer"
            className="inline-flex items-center text-lg text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            View Project →
          </a>
        </div>
      </div>
    </article>
  )
}
