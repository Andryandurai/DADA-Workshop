import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Braces, BrainCircuit, Check, ChevronDown, Code2, Compass, ExternalLink, Github, Globe2, GraduationCap, Layers3, Lightbulb, Linkedin, Menu, Moon, Palette, Search, ShieldCheck, Sparkles, Sun, Users, X } from 'lucide-react';
import { activities, asset, categories, faqs, filterWorkshops, members, officialSite, type Activity, type Audience, type CategoryId, type Workshop } from './data';
import Contact from './Contact';

const categoryIcons = { web: Globe2, ai: BrainCircuit, coding: Code2, design: Palette, innovation: Lightbulb };
const navItems = [['Home', 'home'], ['Workshops', 'workshops'], ['Activities', 'activities'], ['For Schools', 'schools'], ['For Colleges', 'colleges'], ['About Us', 'about'], ['Contact', 'contact']];
const categoryOf = (id: CategoryId) => categories.find(c => c.id === id)!;
function Chapter({ number, children }: { number: string; children: ReactNode }) { return <div className="chapter"><span>[ {number} / {children} ]</span><span className="chapter-line" /></div>; }
function Mascot({ pose, alt, className = '', eager = false }: { pose: string; alt: string; className?: string; eager?: boolean }) { return <img className={`mascot ${className}`} src={asset(`mascot/dada-neon-${pose}.png`)} alt={alt} width="1024" height="1536" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} />; }
function Logo() { return <img className="logo" src={asset('branding/dada-logo-blue.png')} alt="TEAM DADA" width="1536" height="1024" />; }
function CategoryIcon({ id, size = 24 }: { id: CategoryId; size?: number }) { const Icon = categoryIcons[id]; return <Icon size={size} aria-hidden="true" />; }

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'dark');
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id); }, { rootMargin: '-15% 0px -65% 0px' });
    navItems.forEach(([, id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }
    const desktop = window.matchMedia('(min-width: 1180px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', onKey); desktop.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', onKey); desktop.removeEventListener('change', resize); };
  }, [open]);
  function switchTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#030405' : '#ffffff');
    try { localStorage.setItem('dada-theme', next); } catch { /* Theme still works without storage. */ }
  }
  function follow(id: string) { setOpen(false); document.getElementById(id)?.focus({ preventScroll: true }); }
  return <header className="site-header"><div className="nav-container">
    <a className="brand" href="#home" onClick={() => follow('home')} aria-label="TEAM DADA Workshops home"><Logo /><span className="brand-caption mono">LEARNING<br />BY BUILDING.</span></a>
    <nav id="main-navigation" className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => follow(id)}>{label}</a>)}<a href="#contact" className="button button-small" onClick={() => follow('contact')}>Organise a Workshop<ArrowUpRight size={16} /></a></nav>
    <div className="nav-actions"><button className="icon-button theme-toggle" type="button" onClick={switchTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button><button ref={toggle} className="icon-button menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </div></header>;
}

function Hero() {
  return <section id="home" className="hero" tabIndex={-1}><div className="container">
    <div className="hero-topline mono"><span><i className="status-dot" />TEAM DADA / WORKSHOPS</span><span>CURIOUS MINDS. REAL POSSIBILITIES.</span></div>
    <div className="hero-grid"><div className="hero-copy"><h1>LEARN. BUILD.<br /><span className="outline">EXPERIMENT.</span><br />INNOVATE<span className="orange-text">.</span></h1><p className="hero-lead">Technology is more than something you use.<br /><em>It’s something you can create.</em></p><p className="hero-description">Hands-on workshops, creative challenges, and real-world technology exploration. Made for the next generation of thinkers, makers, and problem-solvers.</p><div className="hero-actions"><a href="#workshops" className="button">Explore Workshops<ArrowUpRight size={21} /></a><a href="#contact" className="text-link">Bring DADA to your campus<ArrowRight size={18} /></a></div></div>
    <div className="hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="visual-grid" /><span className="hero-code mono"><Braces size={18} />hello, possibility.</span><Mascot pose="pointing" alt="The DADA mascot pointing towards you, ready to build" eager /><span className="visual-note mono">YOUR NEXT IDEA<br />STARTS HERE. ↗</span><div className="visual-caption mono"><span className="status-dot" />DADA / ALWAYS CURIOUS</div></div></div>
    <div className="hero-foot"><div className="hero-audiences mono"><span><GraduationCap size={17} />SCHOOLS · CLASSES 8–12</span><span><Code2 size={17} />COLLEGES · ALL CURIOUS MINDS</span></div><a href="#pathways" className="scroll-cue mono">FIND YOUR STARTING POINT<ArrowDown size={16} /></a></div>
  </div><div className="signal-strip" aria-hidden="true"><span>THINK OUT LOUD</span><b>+</b><span>MAKE SOMETHING</span><b>+</b><span>BREAK IT. FIX IT.</span><b>+</b><span>BUILD TOGETHER</span><b>+</b><span>STAY CURIOUS</span><b>+</b></div></section>;
}

function Pathways({ choose }: { choose: (audience: Audience) => void }) {
  return <section className="section pathways-section" id="pathways"><div className="container"><Chapter number="01">FIND YOUR PATH</Chapter><div className="section-heading"><h2>BIG IDEAS.<br /><span className="outline">EVERY STARTING POINT.</span></h2><p>Just getting curious or ready to go deeper?<br />There’s a place to begin.</p></div>
    <div className="pathway-grid"><article id="schools" className="pathway school-path" tabIndex={-1}><div className="pathway-content"><span className="mono green-text">01 / FOR SCHOOLS</span><h3>SMALL SPARKS.<br />BIG DISCOVERIES.</h3><p>Meet coding, AI, and design through approachable ideas and creative challenges.</p><dl><div><dt>Classes 8–10</dt><dd>First steps in coding, AI, digital design, and creative technology.</dd></div><div><dt>Classes 11–12</dt><dd>Practical challenges, innovation, and a window into technology careers.</dd></div></dl><button className="text-link" onClick={() => choose('school')}>Explore school workshops<ArrowUpRight size={19} /></button></div><Mascot pose="thinking" alt="DADA mascot thinking about a new idea" /></article>
    <article id="colleges" className="pathway college-path" tabIndex={-1}><div className="pathway-content"><span className="mono orange-text">02 / FOR COLLEGES</span><h3>GO DEEPER.<br />BUILD WHAT’S NEXT.</h3><p>Connect what you learn with what you can make. Explore technology through practical problem-solving.</p><ul className="pathway-topics"><li>AI tools & prompt engineering</li><li>Web development & programming</li><li>UI/UX & digital creation</li><li>Debugging, innovation & entrepreneurship</li></ul><button className="text-link" onClick={() => choose('college')}>Explore college workshops<ArrowUpRight size={19} /></button></div><Mascot pose="laptop" alt="DADA mascot learning with a laptop" /></article></div>
    <p className="pathway-note mono">A STARTING POINT, NOT A PREREQUISITE. TOPICS CAN BE DISCUSSED FOR YOUR GROUP.</p>
  </div></section>;
}

function Filters({ selected, onChange, label }: { selected: string; onChange: (id: string) => void; label: string }) {
  return <div className="filter-pills" role="group" aria-label={label}><button aria-pressed={selected === 'all'} onClick={() => onChange('all')}>All topics</button>{categories.map(category => <button key={category.id} aria-pressed={selected === category.id} onClick={() => onChange(category.id)}>{category.label}</button>)}</div>;
}

function Catalogue({ audience, setAudience, explore }: { audience: string; setAudience: (value: string) => void; explore: (workshop: Workshop) => void }) {
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('all');
  const filtered = filterWorkshops(query, category, audience);
  const clear = () => { setQuery(''); setCategory('all'); setAudience('all'); };
  return <section id="workshops" className="section catalogue-section" tabIndex={-1}><div className="container"><Chapter number="02">THE WORKSHOP CATALOGUE</Chapter><div className="section-heading"><h2>WHAT WILL YOU<br /><span className="blue-text">BUILD NEXT?</span></h2><p>Ten ways to get started.<br />Find a topic that makes you ask “what if?”</p></div>
    <div className="catalogue-tools"><div className="search-field"><Search size={20} /><label className="sr-only" htmlFor="workshop-search">Search workshops</label><input id="workshop-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search an idea, skill, or workshop…" /></div><div className="audience-filter"><label htmlFor="audience-filter">Recommended pathway</label><select id="audience-filter" value={audience} onChange={e => setAudience(e.target.value)}><option value="all">All learners</option><option value="school">School students</option><option value="college">College students</option></select></div></div>
    <Filters selected={category} onChange={setCategory} label="Workshop categories" />
    <div className="results-bar"><p className="mono" role="status" aria-live="polite">SHOWING {String(filtered.length).padStart(2, '0')} / 10 WORKSHOPS</p>{(query || category !== 'all' || audience !== 'all') && <button className="clear-button" onClick={clear}>Clear all filters<X size={14} /></button>}<span className="mono results-note">FIND YOUR SPARK ↘</span></div>
    <div className="workshop-grid">{filtered.map(workshop => { const category = categoryOf(workshop.category); return <article className={`workshop-card accent-${category.color}`} key={workshop.id}><div className="card-top mono"><span>{workshop.number} / {category.label.toUpperCase()}</span><CategoryIcon id={workshop.category} size={24} /></div><h3>{workshop.title}</h3><p>{workshop.summary}</p><div className="workshop-audience mono">{workshop.audiences.map(audience => <span key={audience}>{audience === 'school' ? 'SCHOOL' : 'COLLEGE'}</span>)}</div><button className="card-action" onClick={() => explore(workshop)} aria-label={`Explore workshop: ${workshop.title}`}>Explore workshop<ArrowUpRight size={22} /></button></article>; })}</div>
    {!filtered.length && <div className="empty-state"><Mascot pose="thinking" alt="" /><div><h3>No sparks here. Yet.</h3><p>Try a different word or clear the filters to explore all ten workshops.</p><button className="button" onClick={clear}>Show all workshops<ArrowRight size={18} /></button></div></div>}
    <div className="catalogue-bottom"><span><Layers3 size={18} />Mix your interests. Select more than one topic in your enquiry.</span><a href="#contact">Let’s plan your session<ArrowUpRight size={16} /></a></div>
  </div></section>;
}

function Activities({ explore }: { explore: (activity: Activity) => void }) {
  const [category, setCategory] = useState('all'); const filtered = activities.filter(a => category === 'all' || a.category === category);
  return <section id="activities" className="section activities-section" tabIndex={-1}><div className="container"><Chapter number="03">LESS WATCHING. MORE DOING.</Chapter><div className="activities-intro"><div><h2>IDEAS COME ALIVE<br /><span className="outline orange-outline">WHEN YOU PLAY.</span></h2><p>Team up. Think on your feet. Make something unexpected.<br />Explore the challenges that can turn a session into an experience.</p></div><div className="activity-stamp"><Sparkles size={28} /><span className="mono">CURIOUS + CREATIVE<br />+ A LITTLE COMPETITIVE</span></div></div>
    <Filters selected={category} onChange={setCategory} label="Activity categories" /><p className="sr-only" role="status">{filtered.length} activities</p>
    <div className="activity-grid">{filtered.map(activity => <button key={activity.id} className={`activity-card accent-${categoryOf(activity.category).color}`} onClick={() => explore(activity)} aria-label={`Explore activity: ${activity.title}`}><span className="activity-number mono">{activity.number}</span><CategoryIcon id={activity.category} size={26} /><h3>{activity.title}</h3><span className="activity-skills">{activity.skills.slice(0, 2).join(' / ')}</span><ArrowUpRight className="activity-arrow" size={22} /></button>)}</div>
    <p className="activity-note">These are proposed activities. Your session’s challenges and format can be discussed with the team.</p>
  </div></section>;
}

function Process() {
  const steps = [ ['Discover', 'Choose the topics that match your students’ interests.'], ['Customise', 'Discuss your audience, goals, and institution’s requirements.'], ['Learn', 'Explore ideas through interactive, guided learning.'], ['Create', 'Put the ideas to work in practical, collaborative challenges.'] ];
  return <section className="section process-section"><div className="container"><Chapter number="04">FROM CURIOSITY TO CREATION</Chapter><div className="section-heading"><h2>A LITTLE CURIOUS.<br /><span className="outline">A LOT POSSIBLE.</span></h2><p>A simple way to start shaping<br />your workshop experience.</p></div><ol className="process-grid">{steps.map(([title, text], i) => <li key={title}><div><span className="mono">0{i + 1}</span><ArrowRight size={23} /></div><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>;
}

function About() {
  const values = [ [Code2, 'Learn by building', 'Connect ideas with practical challenges. Turn “I get it” into “I made it.”'], [Compass, 'Start where you are', 'Approachable introductions that leave room for questions, exploration, and discovery.'], [ShieldCheck, 'Think critically', 'Explore AI with curiosity, fact-checking, and an awareness of its limitations.'], [Users, 'Create together', 'Practise collaboration, problem-solving, and presenting ideas with confidence.'] ] as const;
  return <section id="about" className="section about-section" tabIndex={-1}><div className="container"><Chapter number="05">WHY TEAM DADA?</Chapter><div className="about-layout"><div className="about-manifesto"><h2>WE’RE BUILDERS.<br />AND WE BELIEVE<br /><span className="green-text">YOU CAN BE, TOO.</span></h2><p>Developers Advancing Dreams &amp; Aspirations.</p><p className="muted">A student-led technical team with a belief in learning by doing. We bring that same curiosity to workshops: explore the tools, try an idea, learn from what happens, and keep building.</p><a href={officialSite} target="_blank" rel="noreferrer" className="text-link">Get to know TEAM DADA<ArrowUpRight size={18} /></a></div><div className="values-grid">{values.map(([Icon, title, text], i) => <article key={title} className={`value-card accent-${['blue', 'orange', 'green', 'pink'][i]}`}><Icon size={25} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></div></section>;
}

function Team() {
  return <section id="team" className="section team-section"><div className="container"><Chapter number="06">MEET THE PEOPLE BEHIND THE IDEAS</Chapter><div className="section-heading"><h2>DIFFERENT SKILLS.<br /><span className="outline">ONE TEAM DADA.</span></h2><p>The developers and designers<br />behind the DADA team.</p></div><div className="team-grid">{members.map((member, i) => <article key={member.name} className={`member-card accent-${['blue', 'orange', 'green', 'pink'][i]}`}><div className="member-photo"><img src={asset(`team/${member.image}`)} alt={member.name} width="900" height="1000" loading="lazy" /><span className="mono">DADA / 0{i + 1}</span></div><div className="member-copy"><h3>{member.name}</h3><p className="member-role">{member.role}</p><p>{member.introduction}</p><div className="member-socials"><a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} on GitHub`}><Github size={18} /></a><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><Linkedin size={18} /></a>{member.portfolio && <a href={member.portfolio} target="_blank" rel="noreferrer" aria-label={`${member.name} portfolio`}><ExternalLink size={18} /></a>}</div></div></article>)}</div></div></section>;
}

function FAQ() {
  return <section className="section faq-section" id="faq"><div className="container faq-layout"><div><Chapter number="08">A FEW GOOD QUESTIONS</Chapter><h2>CURIOUS?<br /><span className="outline">GOOD.</span></h2><p>Here’s a little more about getting started.</p></div><div className="faq-list">{faqs.map(([question, answer], i) => <details key={question}><summary><span className="mono">0{i + 1}</span>{question}<ChevronDown size={19} /></summary><p>{answer}</p></details>)}</div></div></section>;
}

function Footer() {
  return <><section className="final-cta" aria-label="Bring DADA to your campus"><div className="container"><div><p className="mono green-text">THE NEXT BIG IDEA COULD START IN YOUR CLASSROOM.</p><h2>LET’S MAKE<br /><span className="outline">SOMETHING HAPPEN.</span></h2><a className="button" href="#contact">Bring DADA to your campus<ArrowUpRight size={20} /></a></div><Mascot pose="celebrating" alt="DADA mascot celebrating a new idea" /></div></section><footer className="footer"><div className="container"><div className="footer-top"><a href="#home" aria-label="Back to TEAM DADA Workshops home"><Logo /><span className="mono">WORKSHOPS / LEARN BY BUILDING.</span></a><nav aria-label="Footer navigation"><a href="#workshops">Workshops</a><a href="#activities">Activities</a><a href="#contact">Enquire</a><a href={officialSite} target="_blank" rel="noreferrer">Main DADA website<ArrowUpRight size={16} /></a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} TEAM DADA. Developers Advancing Dreams &amp; Aspirations.</span><a href="#home">Back to top<ArrowUpRight size={16} /></a></div></div></footer></>;
}

type Detail = { kind: 'workshop'; item: Workshop } | { kind: 'activity'; item: Activity };
function DetailDialog({ detail, close, add, selected }: { detail: Detail; close: () => void; add: () => void; selected: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null; const current = dialog.current!;
    current.showModal();
    return () => { current.close(); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  const { item } = detail; const category = categoryOf(item.category);
  return <dialog ref={dialog} className={`detail-dialog accent-${category.color}`} aria-labelledby="detail-title" onCancel={close} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = dialog.current?.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]');
    if (!controls?.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }} onClick={e => { if (e.target === dialog.current) close(); }}><div className="dialog-inner"><button className="icon-button dialog-close" onClick={close} aria-label="Close details" autoFocus><X size={23} /></button><span className="mono detail-kicker">{detail.kind.toUpperCase()} {item.number} / {category.label.toUpperCase()}</span><CategoryIcon id={item.category} size={36} /><h2 id="detail-title">{item.title}</h2><p className="detail-description">{item.description}</p>
    {detail.kind === 'workshop' ? <><h3>What you’ll explore</h3><ul className="objectives">{detail.item.objectives.map(objective => <li key={objective}><Check size={17} />{objective}</li>)}</ul><div className="detail-callout"><h3>A possible hands-on element</h3><p>{detail.item.practical}</p></div><h3>A starting point for</h3><p>{detail.item.audiences.map(a => a === 'school' ? 'School students (Classes 8–12)' : 'College students').join(' and ')}. These are suggested pathways; we can discuss adapting the topic for your group.</p></> : <><h3>Skills in the spotlight</h3><div className="skill-tags">{detail.item.skills.map(skill => <span key={skill}>{skill}</span>)}</div><p className="detail-note">A proposed team activity. The challenge, materials, and format can be discussed when planning your workshop.</p></>}
    <p className="detail-note">Availability, duration, pricing, delivery mode, equipment, and any certificates can be discussed during your enquiry.</p><button className="button" onClick={add}>{selected ? 'Go to your enquiry' : 'Add to my enquiry'}<ArrowUpRight size={20} /></button></div></dialog>;
}

export default function App() {
  const [audience, setAudience] = useState('all'); const [detail, setDetail] = useState<Detail | null>(null);
  const [topics, setTopics] = useState<string[]>([]); const [selectedActivities, setActivities] = useState<string[]>([]);
  function choose(value: Audience) { setAudience(value); document.getElementById('workshops')?.scrollIntoView(); document.getElementById('workshops')?.focus({ preventScroll: true }); }
  function addDetail() {
    if (!detail) return;
    if (detail.kind === 'workshop') setTopics(previous => previous.includes(detail.item.id) ? previous : [...previous, detail.item.id]);
    else setActivities(previous => previous.includes(detail.item.id) ? previous : [...previous, detail.item.id]);
    setDetail(null);
    requestAnimationFrame(() => { document.getElementById('contact')?.scrollIntoView(); document.getElementById('contact')?.focus({ preventScroll: true }); });
  }
  return <div className="site-shell"><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main"><Hero /><Pathways choose={choose} /><Catalogue audience={audience} setAudience={setAudience} explore={item => setDetail({ kind: 'workshop', item })} /><Activities explore={item => setDetail({ kind: 'activity', item })} /><Process /><About /><Team /><Contact topics={topics} setTopics={setTopics} selectedActivities={selectedActivities} setActivities={setActivities} /><FAQ /></main><Footer />{detail && <DetailDialog detail={detail} close={() => setDetail(null)} add={addDetail} selected={(detail.kind === 'workshop' ? topics : selectedActivities).includes(detail.item.id)} />}</div>;
}
