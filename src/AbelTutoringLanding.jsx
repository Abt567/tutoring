import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Star,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Calendar,
  MessageSquare,
  Clock,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Phone,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// ----- THEME ----- //
const palette = {
  bg: "bg-slate-950",
  surface: "bg-slate-900/70",
  card: "bg-slate-900/80",
  ring: "ring-1 ring-white/10",
  text: "text-slate-100",
  subtext: "text-slate-300",
  accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
  accentText: "text-indigo-300",
  gradientStroke: "bg-gradient-to-r from-indigo-500/40 via-violet-500/40 to-fuchsia-500/40",
};

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`relative ${palette.text} ${className}`}>{children}</section>
);

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 sm:px-8 ${className}`}>{children}</div>
);

// Stronger fade/slide on scroll
const Fade = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// ── Animation Variants ───────────────────────────────────────────────
const servicesVars = {
  initial: { opacity: 0, scale: 1.08 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const pricingContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const pricingItem = {
  hidden: { x: -40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ── Reviews (localStorage-backed, desktop horizontal, mobile vertical) ─────────
function ReviewsInteractive() {
  const storageKey = "abelReviews";
  const defaultReviews = [
    { q: "From 68% to 90% in six weeks.", a: "Abel broke down problems so clearly. The weekly goals kept my son locked in.", n: "Parent, Math 30-1" },
    { q: "Finally confident.", a: "I stopped freezing on tests. The checklists and timing helped so much.", n: "Student, Chem 20" },
    { q: "Worth every penny.", a: "Professional, reliable, and actually results-driven.", n: "Parent, Grade 10" },
  ];

  const [reviews, setReviews] = useState(defaultReviews);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const [mobileCount, setMobileCount] = useState(3);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setReviews(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }, [reviews]);

  function addReview(e) {
    e.preventDefault();
    if (!newQuote.trim() || !newName.trim()) return;
    const item = {
      q: newQuote.trim(),
      a: "—",
      n: `${newName.trim()}${newRole.trim() ? `, ${newRole.trim()}` : ""}`,
    };
    setReviews([item, ...reviews]);
    setNewName("");
    setNewRole("");
    setNewQuote("");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold">Parent & Student Reviews</h2>
        <div className="hidden md:flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400/90 text-yellow-400" />
          ))}
        </div>
      </div>

      {/* Desktop: horizontal scroller with snap (scrollbar hidden) */}
      <div className="hidden md:block">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="flex gap-6 snap-x snap-mandatory px-1">
            {reviews.map((r, i) => (
              <div key={i} className="snap-start min-w-[360px] max-w-[420px]">
                <Card className={`${palette.card} ${palette.ring} rounded-3xl`}>
                  <CardContent className="pt-6">
                    <p className="text-lg font-semibold mb-2">“{r.q}”</p>
                    {r.a && <p className={`${palette.subtext}`}>{r.a}</p>}
                    <p className="mt-3 text-sm text-slate-400">— {r.n}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical list + Show more (no horizontal scrollbar) */}
      <div className="md:hidden space-y-4 overflow-x-hidden">
        {reviews.slice(0, mobileCount).map((r, i) => (
          <Card key={i} className={`${palette.card} ${palette.ring} rounded-3xl`}>
            <CardContent className="pt-6">
              <p className="text-lg font-semibold mb-2">“{r.q}”</p>
              {r.a && <p className={`${palette.subtext}`}>{r.a}</p>}
              <p className="mt-3 text-sm text-slate-400">— {r.n}</p>
            </CardContent>
          </Card>
        ))}
        {mobileCount < reviews.length && (
          <div className="flex justify-center">
            <Button variant="secondary" onClick={() => setMobileCount((x) => Math.min(x + 3, reviews.length))}>
              Show more
            </Button>
          </div>
        )}
      </div>

      {/* Add Review form */}
      <Card className={`mt-10 ${palette.card} ${palette.ring} rounded-3xl`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-300" /> Add a review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid sm:grid-cols-2 gap-4" onSubmit={addReview}>
            <Input placeholder="Your name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Input placeholder="Role (e.g., Parent, Chem 20)" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
            <div className="sm:col-span-2">
              <Textarea rows={4} placeholder="Your review (e.g., From 68% to 90% in six weeks…)" value={newQuote} onChange={(e) => setNewQuote(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full">Submit Review</Button>
            </div>
          </form>
          <p className={`mt-3 text-xs ${palette.subtext}`}>Note: Saved to this device only. We’ll add global reviews later.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AbelTutoringLanding() {
  // Contact details
  const email = "abellema943@gmail.com";
  const phoneIntl = "+18253651202";

  // 1) Book Consultation (pre-filled Gmail compose)
  const consultBody = "Hi Abel,\n\nI would like a virtual consultation on {DAY} at {TIME}.\n\nThanks!";
  const consultHref =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=` +
    encodeURIComponent("Book a Free Consultation") +
    `&body=${encodeURIComponent(consultBody)}`;

  // 2) Plain "Email Me" (no prefilled body)
  const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  // 3) SMS and TEL
  const smsHref = `sms:${phoneIntl}`;
  const telHref = `tel:${phoneIntl}`;

  // --- Formspree contact form state + handler ---
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");
    setSent(false);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);

      const res = await fetch("https://formspree.io/f/xpwlbppj", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      const json = await res.json();
      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        setError(json?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`${palette.bg} min-h-screen ${palette.text} selection:bg-indigo-500/30 selection:text-white`}>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
        <Container className="flex items-center justify-between py-4">
          <a href="#home" className="group inline-flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-[2px]">
              <div className="h-full w-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-indigo-300 group-hover:scale-110 transition" />
              </div>
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">Abel Tutoring</p>
              <p className={`text-xs ${palette.subtext}`}>Results. Clarity. Confidence.</p>
            </div>
          </a>
          <nav className={`hidden md:flex items-center gap-8 text-sm ${palette.subtext}`}>
            {[
              ["Services", "services"],
              ["Subjects", "subjects"],
              ["Results", "results"],
              ["Pricing", "pricing"],
              ["Reviews", "reviews"],
              ["Contact", "contact"],
            ].map(([label, href]) => (
              <a key={href} href={`#${href}`} className="hover:text-white transition">
                {label}
              </a>
            ))}
          </nav>
          {/* Navbar Book Consultation (always visible) */}
          <div className="hidden md:block">
            <Button asChild className="gap-2">
              <a href={consultHref} target="_blank" rel="noopener noreferrer">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          {/* On mobile, we still want Book in the hero—so no duplicate here */}
        </Container>
      </header>

      {/* HERO */}
      <Section id="home" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(80rem 40rem at 20% -10%, rgba(99,102,241,0.25), transparent), radial-gradient(60rem 30rem at 90% 10%, rgba(236,72,153,0.15), transparent)",
            }}
          />
        </div>
        <Container className="grid lg:grid-cols-2 gap-10 py-20 sm:py-28">
          <Fade>
            <Badge className="mb-5 border-white/10 bg-white/5 px-3 py-1.5 text-[11px] tracking-wide uppercase">
              1:1 • Small Groups • Online & In-Person (Calgary)
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Master the material.
              <span className={`block bg-clip-text text-transparent bg-gradient-to-r ${palette.accent}`}>Ace the exam.</span>
            </h1>

            <p className={`mt-5 max-w-xl ${palette.subtext}`}>
              Premium tutoring for Math, Sciences, and Study Skills. We turn confusion into clear steps—and grades into wins.
            </p>

            {/* Friendly reassurance right under the paragraph */}
            <p className="mt-3 text-sm text-slate-400">
              Book your <span className="font-semibold text-slate-200">free 15-minute consultation</span> — no pressure, just a plan.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {/* Book Consultation — shows on all devices */}
              <Button asChild size="lg" className="gap-2">
                <a href={consultHref} target="_blank" rel="noopener noreferrer">
                  Book a Free Consultation <Calendar className="h-4 w-4" />
                </a>
              </Button>

              {/* Email Me — shows on all devices (no prefilled body) */}
              <Button asChild variant="secondary" size="lg" className="gap-2">
                <a href={emailHref} target="_blank" rel="noopener noreferrer">
                  Email Me <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              {/* Text Me — mobile only */}
              <Button asChild variant="secondary" size="lg" className="gap-2 md:hidden">
                <a href={smsHref}>
                  Text Me <MessageSquare className="h-4 w-4" />
                </a>
              </Button>

              {/* Call Me — mobile only */}
              <Button asChild variant="secondary" size="lg" className="gap-2 md:hidden">
                <a href={telHref}>
                  Call Me <Phone className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Small subtext under buttons */}
            <div className={`mt-3 text-xs ${palette.subtext}`}>
              I’ll reply within 24 hours. Calgary in-person available.
            </div>

            <div className={`mt-6 flex items-center gap-5 text-sm ${palette.subtext}`}>
              <div className="inline-flex items-center gap-2"><Shield className="h-4 w-4" /> Satisfaction Guarantee</div>
              <div className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> Flexible Scheduling</div>
              <div className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> 1:1 or Group</div>
            </div>
          </Fade>

          <Fade delay={0.1}>
            <div className="relative">
              <div className={`absolute -inset-1 rounded-3xl blur-3xl opacity-40 ${palette.gradientStroke}`} />
              <Card className={`relative overflow-hidden ${palette.card} ${palette.ring} rounded-3xl`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    What you get
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  {[
                    ["Custom Study Plan", "We map your exact gaps and build a step-by-step plan."],
                    ["Live Skill Coaching", "We teach the concept and the test tactic—fast."],
                    ["Accountability", "You’ll have weekly goals and check-ins."],
                    ["Exam Strategy", "Time traps, partial marks, and checklists."],
                  ].map(([title, sub], i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-1"><Check className="h-5 w-5 text-indigo-400" /></div>
                      <div>
                        <p className="font-semibold">{title}</p>
                        <p className={`text-sm ${palette.subtext}`}>{sub}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </Fade>
        </Container>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="py-20">
        <Container>
          <Fade>
            <div className="flex items-center justify-between gap-6 mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold">Services</h2>
              <Badge className="bg-white/5 border-white/10">Built for real results</Badge>
            </div>
          </Fade>

          <motion.div
            variants={servicesVars}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: BookOpen,
                title: "1:1 Elite Tutoring",
                desc: "Personalized sessions that target your exact sticking points and accelerate mastery.",
                bullets: ["Diagnostic in first session", "Homework + test prep plan", "Weekly progress recap"],
              },
              {
                icon: Users,
                title: "Small Group (2–4)",
                desc: "Peer learning without the chaos—curated groups with similar goals.",
                bullets: ["Lower cost per student", "Shared practice sets", "Competition + accountability"],
              },
              {
                icon: Trophy,
                title: "Exam Bootcamps",
                desc: "Intensive review sprints for unit tests and diplomas. Systems, not cramming.",
                bullets: ["Concept refreshers", "50+ practice Qs", "Marking strategies"],
              },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.05}>
                <Card className={`${palette.card} ${palette.ring} rounded-3xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <s.icon className="h-5 w-5 text-indigo-300" />
                      {s.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm ${palette.subtext} mb-4`}>{s.desc}</p>
                    <ul className="space-y-2 text-sm">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2 items-start">
                          <Check className="h-4 w-4 mt-0.5 text-indigo-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* SUBJECTS */}
      <Section id="subjects" className="py-12">
        <Container>
          <Fade>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Subjects & Levels</h2>
          </Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Math 7–12",
              "Math 30-1/30-2",
              "Calculus",
              "Chemistry 20/30",
              "Physics 20/30",
              "Biology 20/30",
              "IB & AP Support",
              "Study Skills & Organization",
            ].map((tag, i) => (
              <Fade key={tag} delay={i * 0.03}>
                <div className={`rounded-2xl ${palette.ring} ${palette.surface} px-4 py-3 text-sm flex items-center justify-between`}>
                  <span>{tag}</span>
                  <Badge className="bg-white/5 border-white/10">Available</Badge>
                </div>
              </Fade>
            ))}
          </div>
        </Container>
      </Section>

      {/* RESULTS */}
      <Section id="results" className="py-16">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Average grade lift", value: "+12%" },
              { label: "5-star reviews", value: "57" },
              { label: "Sessions delivered", value: "1,400+" },
            ].map((stat, i) => (
              <Fade key={i} delay={i * 0.04}>
                <Card className={`${palette.card} ${palette.ring} rounded-3xl text-center py-8`}>
                  <CardContent>
                    <p className="text-5xl font-extrabold tracking-tight">{stat.value}</p>
                    <p className={`mt-2 ${palette.subtext}`}>{stat.label}</p>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICING */}
      <Section id="pricing" className="py-20">
        <Container>
          <Fade>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Simple, Transparent Pricing</h2>
          </Fade>

          <motion.div
            variants={pricingContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { name: "Starter", price: "$35/hr", points: ["1:1 online", "Weekly recap", "Homework help"] },
              { name: "Pro", price: "$45/hr", badge: "Most popular", points: ["1:1 online or in-person", "Custom study plan", "Mock test each unit"] },
              { name: "Elite", price: "$60/hr", points: ["Founder-led coaching", "Priority scheduling", "Exam bootcamp included"] },
            ].map((p) => (
              <motion.div key={p.name} variants={pricingItem}>
                <Card className={`${palette.card} ${palette.ring} rounded-3xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{p.name}</span>
                      {p.badge && <Badge className="bg-white/10 border-white/10">{p.badge}</Badge>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-extrabold tracking-tight">{p.price}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-2 items-start">
                          <Check className="h-4 w-4 mt-0.5 text-indigo-400" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Pricing: Get Started -> Book Consultation (prefilled) */}
                    <Button asChild className="w-full mt-6">
                      <a href={consultHref} target="_blank" rel="noopener noreferrer">
                        Get Started
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <p className={`mt-4 text-xs ${palette.subtext}`}>* Calgary in-person subject to availability. Group rates on request.</p>
        </Container>
      </Section>

      {/* REVIEWS (Interactive) */}
      <Section id="reviews" className="py-20">
        <Container>
          <ReviewsInteractive />
        </Container>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Fade>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">Let’s plan your path</h2>
                <p className={`mt-3 ${palette.subtext}`}>Tell us about your goals, challenges, and timeline. We’ll reply within 24 hours.</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    ["Average reply time", "< 2 hours"],
                    ["Locations", "Online • Calgary"],
                    ["Availability", "Mon–Sat"],
                    ["Guarantee", "First session risk-free"],
                  ].map(([k, v]) => (
                    <div key={k} className={`rounded-2xl ${palette.ring} ${palette.surface} p-4`}>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{k}</p>
                      <p className="text-base font-medium mt-1">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
            <Fade delay={0.05}>
              <Card className={`${palette.card} ${palette.ring} rounded-3xl`}>
                <CardContent className="pt-6">
                  {/* FORM --- Formspree */}
                  <form className="grid gap-4" onSubmit={handleSubmit}>
                    {/* Honeypot anti-bot field (hidden) */}
                    <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input name="name" placeholder="Your name" required />
                      <Input name="email" type="email" placeholder="Email" required />
                    </div>
                    <Input name="phone" placeholder="Phone (optional)" />
                    <Input name="subject" placeholder="Subject (e.g., Math 30-1)" />
                    <Textarea name="message" placeholder="Tell us about your goals" rows={5} required />

                    {/* Optional: Formspree subject + template */}
                    <input type="hidden" name="_subject" value="New Tutoring Inquiry from Website" />
                    <input type="hidden" name="_template" value="table" />

                    <Button type="submit" className="gap-2" disabled={sending || sent}>
                      {sent ? "Message Sent ✓" : sending ? "Sending..." : <>Send Message <ArrowRight className="h-4 w-4" /></>}
                    </Button>

                    {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
                    {sent && <p className="text-sm text-green-400 mt-1">Thanks! I’ll reply within 24 hours.</p>}
                  </form>
                </CardContent>
              </Card>
            </Fade>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <Container>
          <div className={`relative overflow-hidden rounded-3xl ${palette.ring} ${palette.surface} p-8`}>
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(40rem 20rem at 20% 50%, rgba(99,102,241,0.35), transparent)" }} />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold">Ready to chat?</h3>
                <p className={`mt-1 ${palette.subtext}`}>Quick intro call or message—whatever’s easiest.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {/* Book Consultation — all devices */}
                <Button asChild size="lg" className="gap-2">
                  <a href={consultHref} target="_blank" rel="noopener noreferrer">
                    Book a Free Consultation <Calendar className="h-4 w-4" />
                  </a>
                </Button>

                {/* Email Me — all devices */}
                <Button asChild size="lg" variant="secondary" className="gap-2">
                  <a href={emailHref} target="_blank" rel="noopener noreferrer">
                    Email Me <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>

                {/* Text Me — mobile only */}
                <Button asChild size="lg" variant="secondary" className="gap-2 md:hidden">
                  <a href={smsHref}>
                    Text Me <MessageSquare className="h-4 w-4" />
                  </a>
                </Button>

                {/* Call Me — mobile only */}
                <Button asChild size="lg" variant="secondary" className="gap-2 md:hidden">
                  <a href={telHref}>
                    Call Me <Phone className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className={`border-t border-white/10 py-10 ${palette.subtext}`}>
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Abel Tutoring. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
