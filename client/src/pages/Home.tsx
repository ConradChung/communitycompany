import { FormEvent, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Check, Menu, X } from "lucide-react";

const chapters = [
  { id: "story", label: "Why you" },
  { id: "details", label: "The room" },
  { id: "rsvp", label: "Respond" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function InsidersMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`placeholder-mark ${compact ? "placeholder-mark--compact" : ""}`} aria-label="Insiders placeholder logo">
      <span className="placeholder-mark__word">INSIDERS</span>
      <img className="community-logo" src="/manus-storage/pasted_file_FyYkgO_image_a056cd21.png" alt="The Community Company" />
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
        ([entry]) => { if (entry.isIntersecting) setActiveChapter(id); },
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
        <button className="header-logo" onClick={() => scrollToSection("top")} aria-label="Back to top"><InsidersMark compact /></button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {chapters.map((chapter) => (
            <button key={chapter.id} className={activeChapter === chapter.id ? "nav-link nav-link--active" : "nav-link"} onClick={() => scrollToSection(chapter.id)}>{chapter.label}</button>
          ))}
        </nav>
        <button className="menu-trigger" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu__inner">
            <p className="eyebrow">A private invitation</p>
            {chapters.map((chapter, index) => (
              <button key={chapter.id} className="mobile-menu__link" onClick={() => { scrollToSection(chapter.id); setMenuOpen(false); }}><span>0{index + 1}</span>{chapter.label}</button>
            ))}
          </div>
        </div>
      )}

      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <div className="hero-frame" />
        <div className="hero-note hero-note--left">
          <p>A nomination has<br />been made in your name.</p>
        </div>
        <div className="hero-center">
          <p className="eyebrow">For Max Beaumont</p>
          <h1 id="hero-title">Max Beaumont</h1>
          <p className="hero-subtitle">You have been nominated for INSIDERS</p>
          <div className="hero-actions">
            <button className="hero-cta" onClick={() => scrollToSection("story")}><span>Show me why</span><ArrowDown size={15} strokeWidth={1.5} /></button>
            <button className="hero-skip" onClick={() => scrollToSection("rsvp")}><span>Skip to the point</span><ArrowUpRight size={14} strokeWidth={1.5} /></button>
          </div>
          <p className="hero-provenance"><span>A private room for GPs and LPs at</span><strong>a16z · Greylock · NEA · General Catalyst</strong></p>
        </div>
        <div className="hero-note hero-note--right">
          <InsidersMark />
          <button className="inquire-link" onClick={() => scrollToSection("rsvp")}>Respond <ArrowUpRight size={14} strokeWidth={1.5} /></button>
        </div>
        <div className="hero-bottomline"><span>01 / 04</span><span>Private nomination</span><span>Venice, California</span></div>
      </section>

      <section className="story-section" id="story" aria-labelledby="story-title">
        <div className="section-kicker"><span>01</span><span>Why you</span></div>
        <div className="story-layout">
          <div className="story-intro"><p className="eyebrow">A note from the committee</p><h2 id="story-title">The right<br /><em>people</em><br />know.</h2></div>
          <div className="story-copy">
            <p className="lede">INSIDERS is not an application. It is a name put forward by someone already in the room.</p>
            <p>Your name was nominated because of the way you build, think, and make the people around you sharper. The committee meets monthly. It keeps the room small on purpose.</p>
            <p>This is not a public invitation. It is a quiet signal that there may be a place for you here.</p>
            <button className="text-link" onClick={() => scrollToSection("details")}>See the room <ArrowDown size={14} strokeWidth={1.5} /></button>
          </div>
        </div>
        <div className="story-marquee" aria-hidden="true"><span>THE ROOM IS THE PRODUCT · THE ROOM IS THE PRODUCT · </span></div>
      </section>

      <section className="interlude-section" aria-label="INSIDERS statement">
        <div className="interlude-frame" />
        <p className="eyebrow">INSIDERS / Private community</p>
        <p className="interlude-quote">“The value is<br /><em>who is in the room.</em>”</p>
        <div className="interlude-caption"><span>02</span><span>General partners · Venture capital</span></div>
      </section>

      <section className="details-section" id="details" aria-labelledby="details-title">
        <div className="section-kicker section-kicker--dark"><span>02</span><span>The room</span></div>
        <div className="details-heading"><p className="eyebrow">INSIDERS in practice</p><h2 id="details-title">Small by<br /><em>design.</em></h2><p className="details-intro">The guest list is the value. Conversations stay off the record.</p></div>
        <div className="schedule-grid">
          <article className="schedule-card"><span className="schedule-number">01</span><p className="schedule-time">Curated peers</p><h3>The signal</h3><p>A room of elite GPs and investors who have earned their way into the conversation.</p></article>
          <article className="schedule-card schedule-card--featured"><span className="schedule-number">02</span><p className="schedule-time">Across the divide</p><h3>The access</h3><p>Member-to-member introductions across the GP and LP world, before the market does.</p></article>
          <article className="schedule-card"><span className="schedule-number">03</span><p className="schedule-time">Off the record</p><h3>The intelligence</h3><p>Private conversations about the fund landscape, shared without performance or posturing.</p></article>
        </div>
        <div className="details-footer"><div><span className="label">Members</span><span>a16z<br />Greylock<br />SoftBank<br />NEA</span></div><div><span className="label">Format</span><span>Private dinners<br />Small gatherings<br />Direct introductions</span></div><div><span className="label">Admission</span><span>By nomination<br />Committee review<br />No public application</span></div></div>
      </section>

      <section className="rsvp-section" id="rsvp" aria-labelledby="rsvp-title">
        <div className="section-kicker"><span>03</span><span>Respond</span></div>
        <div className="rsvp-layout">
          <div className="rsvp-message"><p className="eyebrow">Your name is in the room</p><h2 id="rsvp-title">A quiet<br /><em>yes?</em></h2><p>There is no application to complete. Let us know if you would like to continue the conversation and the committee will follow up privately.</p><div className="rsvp-mark"><InsidersMark /></div></div>
          <div className="form-panel">
            {submitted ? <div className="success-state"><div className="success-icon"><Check size={20} strokeWidth={1.5} /></div><p className="eyebrow">Received privately</p><h3>We will be<br /><em>in touch.</em></h3><p>Your response has been shared with the INSIDERS committee.</p><button className="text-link" onClick={() => setSubmitted(false)}>Send another response</button></div> : <form onSubmit={handleSubmit}>
              <label>Full name<input required name="name" defaultValue="Max Beaumont" /></label>
              <label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label>
              <label>Would you like to continue the conversation?<select name="attendance" defaultValue="yes"><option value="yes">Yes, I would</option><option value="maybe">I have a question first</option><option value="no">Not at this time</option></select></label>
              <label>Note for the committee <span className="optional">Optional</span><textarea name="note" rows={3} placeholder="Anything you would like us to know" /></label>
              <button className="submit-button" type="submit">Send privately <ArrowUpRight size={15} strokeWidth={1.5} /></button><p className="form-footnote">No public application. No mailing list. Your response is shared only with the INSIDERS committee.</p>
            </form>}
          </div>
        </div>
      </section>

      <footer className="site-footer"><InsidersMark compact /><p>The room is the product.</p><button onClick={() => scrollToSection("top")} aria-label="Back to top"><ArrowUp size={16} strokeWidth={1.5} /></button></footer>
    </main>
  );
}

export { InsidersMark };
