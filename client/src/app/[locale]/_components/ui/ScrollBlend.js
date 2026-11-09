// Scroll blend section (scroll-blend-animation skill): as the section scrolls
// into view, a deep indigo sweep grows across the brand purple using corner-shape +
// mix-blend-mode: difference. Purple #4726d9 (brand-700) "minus" #24107f
// gives deep indigo #23165a, which still stands out from the dark page bg.
//
// The CSS is in a <style> tag rather than globals.css so the build can't strip
// corner-shape / animation-timeline, and it's wrapped in @supports so browsers
// without them (Firefox, Safari today) just see the plain purple band instead
// of a static half-drawn shape.
const BLEND_CSS = `
@supports (animation-timeline: view()) and (corner-shape: round) {
  @keyframes corner-morph {
    from { corner-shape: superellipse(-6); }
    to   { corner-shape: superellipse(6); }
  }
  .scroll-blend-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #24107f;
    mix-blend-mode: difference;
    border-bottom-right-radius: 100%;
    pointer-events: none;
    animation-name: corner-morph;
    animation-timing-function: linear;
    animation-fill-mode: both;
    animation-timeline: view();
    animation-range: entry 0% cover 60%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scroll-blend-section::before { display: none; }
}
`

export default function ScrollBlend({ children, className = '', ...rest }) {
  return (
    <section
      className={`scroll-blend-section relative isolate bg-[#4726d9] text-white ${className}`}
      {...rest}
    >
      <style dangerouslySetInnerHTML={{ __html: BLEND_CSS }} />
      <div className="relative isolate">{children}</div>
    </section>
  )
}
