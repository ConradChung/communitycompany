import { FormEvent, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Check, Menu, X } from "lucide-react";

const chapters = [
  { id: "story", label: "The story" },
  { id: "details", label: "The details" },
  { id: "rsvp", label: "RSVP" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function PlaceholderMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`placeholder-mark ${compact ? "placeholder-mark--compact" : ""}`} aria-label="Placeholder logo">
      <span className="placeholder-mark__word">MARA</span>
      <span className="placeholder-mark__seal">EST.<br />2026</span>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeChapter, setActiveChapter] = useState("story");

  useEffect(() => {
    const observers = chapters.map(({ id }) => {
      const section = document.getElementById(id);
      if (!section) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveChapter(id);
        },
        { rootMargin: "-35% 0px -55% 0px" },
      );
      observer.observe(section);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <button className="header-logo" onClick={() => scrollToSection("top")} aria-label="Back to top">
          <PlaceholderMark compact />
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={activeChapter === chapter.id ? "nav-link nav-link--active" : "nav-link"}
              onClick={() => scrollToSection(chapter.id)}
            >
              {chapter.label}
            </button>
          ))}
        </nav>
        <button
          className="menu-trigger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu__inner">
            <p className="eyebrow">A private invitation</p>
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                className="mobile-menu__link"
                onClick={() => {
                  scrollToSection(chapter.id);
                  setMenuOpen(false);
                }}
              >
                <span>0{index + 1}</span>{chapter.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <div className="hero-frame" />
        <div className="hero-note hero-note--left">
          <p>Some evenings are<br />made to be remembered.</p>
          <span className="micro-rule" />
          <p className="muted-copy">A gathering by invitation<br />for the curious and kind.</p>
        </div>
        <div className="hero-center">
          <p className="eyebrow">An evening in three acts</p>
          <h1 id="hero-title">Mara<span className="hero-dot">·</span>House</h1>
          <p className="hero-subtitle">A night for the stories between us</p>
          <button className="hero-cta" onClick={() => scrollToSection("story")}>
            <span>Enter the story</span>
            <ArrowDown size={15} strokeWidth={1.5} />
          </button>
        </div>
        <div className="hero-note hero-note--right">
          <PlaceholderMark />
          <button className="inquire-link" onClick={() => scrollToSection("rsvp")}>
            Inquire <ArrowUpRight size={14} strokeWidth={1.5} />
          </button>
        </div>
        <div className="hero-bottomline">
          <span>01 / 05</span>
          <span>September 18, 2026</span>
          <span>Brooklyn, NY</span>
        </div>
      </section>

      <section className="story-section" id="story" aria-labelledby="story-title">
        <div className="section-kicker"><span>01</span><span>The story</span></div>
        <div className="story-layout">
          <div className="story-intro">
            <p className="eyebrow">A note from the hosts</p>
            <h2 id="story-title">The room<br /><em>between</em><br />moments.</h2>
          </div>
          <div className="story-copy">
            <p className="lede">There is a particular kind of evening that begins long before the first glass is poured.</p>
            <p>It starts with a name on a list, a door left slightly open, the feeling that something worth remembering is about to happen. Mara House is an invitation into that feeling.</p>
            <p>On September 18, we will gather around one long table to make room for good questions, unexpected friends, and the kind of conversation that keeps going after midnight.</p>
            <button className="text-link" onClick={() => scrollToSection("details")}>Read on <ArrowDown size={14} strokeWidth={1.5} /></button>
          </div>
        </div>
        <div className="story-marquee" aria-hidden="true"><span>MAKE ROOM FOR WONDER · MAKE ROOM FOR WONDER · </span></div>
      </section>

      <section className="interlude-section" aria-label="Mara House statement">
        <div className="interlude-frame" />
        <p className="eyebrow">Mara House / No. 01</p>
        <p className="interlude-quote">“The best gatherings<br /><em>leave a little light on.</em>”</p>
        <div className="interlude-caption"><span>02</span><span>A shared table</span></div>
      </section>

      <section className="details-section" id="details" aria-labelledby="details-title">
        <div className="section-kicker section-kicker--dark"><span>02</span><span>The details</span></div>
        <div className="details-heading">
          <p className="eyebrow">Mark your calendar</p>
          <h2 id="details-title">An evening,<br /><em>carefully made.</em></h2>
          <p className="details-intro">Arrive as you are. Stay for the parts you did not expect.</p>
        </div>
        <div className="schedule-grid">
          <article className="schedule-card">
            <span className="schedule-number">01</span>
            <p className="schedule-time">6:30 PM</p>
            <h3>Arrival</h3>
            <p>Meet us on the roof for a welcome pour and a view of the city finding its evening color.</p>
          </article>
          <article className="schedule-card schedule-card--featured">
            <span className="schedule-number">02</span>
            <p className="schedule-time">7:30 PM</p>
            <h3>The long table</h3>
            <p>A seasonal dinner by candlelight, with courses shaped around the stories we bring to the room.</p>
          </article>
          <article className="schedule-card">
            <span className="schedule-number">03</span>
            <p className="schedule-time">10:00 PM</p>
            <h3>After hours</h3>
            <p>Music, something sweet, and the option to keep the night moving a little longer.</p>
          </article>
        </div>
        <div className="details-footer">
          <div><span className="label">Where</span><span>Canal House<br />78 Water Street<br />Brooklyn, New York</span></div>
          <div><span className="label">Dress</span><span>Soft tailoring<br />After-dark ease</span></div>
          <div><span className="label">Note</span><span>Adults only<br />By invitation</span></div>
        </div>
      </section>

      <section className="rsvp-section" id="rsvp" aria-labelledby="rsvp-title">
        <div className="section-kicker"><span>03</span><span>RSVP</span></div>
        <div className="rsvp-layout">
          <div className="rsvp-message">
            <p className="eyebrow">The door is open</p>
            <h2 id="rsvp-title">Will we<br /><em>see you there?</em></h2>
            <p>Let us know if you would like to join us. We will follow up with the evening's final details.</p>
            <div className="rsvp-mark"><PlaceholderMark /></div>
          </div>
          <div className="form-panel">
            {submitted ? (
              <div className="success-state">
                <div className="success-icon"><Check size={20} strokeWidth={1.5} /></div>
                <p className="eyebrow">Thank you</p>
                <h3>Your note is<br /><em>on its way.</em></h3>
                <p>We will be in touch soon with the details.</p>
                <button className="text-link" onClick={() => setSubmitted(false)}>Send another response</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label>Full name<input required name="name" placeholder="Your name" /></label>
                <label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label>
                <label>Will you join us?
                  <select name="attendance" defaultValue="yes">
                    <option value="yes">Yes, with pleasure</option>
                    <option value="maybe">Let me check</option>
                    <option value="no">Not this time</option>
                  </select>
                </label>
                <label>Anything we should know? <span className="optional">Optional</span><textarea name="note" rows={3} placeholder="A note for the hosts" /></label>
                <button className="submit-button" type="submit">Send your RSVP <ArrowUpRight size={15} strokeWidth={1.5} /></button>
                <p className="form-footnote">Your response is private and only shared with the Mara House hosts.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <PlaceholderMark compact />
        <p>Make room for wonder.</p>
        <button onClick={() => scrollToSection("top")} aria-label="Back to top"><ArrowUp size={16} strokeWidth={1.5} /></button>
      </footer>
    </main>
  );
}

export { PlaceholderMark };
