import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Clock, Mail, ArrowRight, Globe, Zap, CheckCircle2, Circle, Loader2 } from 'lucide-react';

// Brand colors for the bouncing text color cycle (visible on cream bg)
const BRAND_COLORS = ['#450027', '#6B0040', '#A8842A', '#2E001A'];

// Rotating status messages
const STATUS_MESSAGES = [
  'Designing experiences...',
  'Building the future...',
  'Crafting with purpose...',
  'Almost there...',
  'Creating impact...',
];

// Milestones for the tracker
const MILESTONES = [
  { label: 'Research & Planning', done: true },
  { label: 'Design & Branding', done: true },
  { label: 'Core Development', active: true },
  { label: 'Testing & QA', done: false },
  { label: 'Launch', done: false },
];

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  // Cycle the brand name color on every bounce
  useEffect(() => {
    const id = window.setInterval(() => {
      setColorIndex((prev) => (prev + 1) % BRAND_COLORS.length);
    }, 1200);
    return () => window.clearInterval(id);
  }, []);

  // Rotate status messages
  useEffect(() => {
    const id = window.setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || 'Could not subscribe. Please try again.');
      }
      setSubmitted(true);
      setEmail('');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Could not subscribe. Please try again.';
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Coming Soon | Chrismaison Impacts</title>
        <meta
          name="description"
          content="Chrismaison Impacts is launching soon. Stay tuned for our new website."
        />
      </Helmet>

      <div className="relative min-h-screen w-full overflow-hidden bg-[#F5DCA0]">
        {/* Soft faint overlay to mute the cream */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#FBEBC2]/40" />

        {/* Animated mesh gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1/4 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[#450027]/15 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[35rem] w-[35rem] rounded-full bg-[#D4A73B]/30 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#450027]/10 blur-[80px]" />
          </motion.div>
        </div>

        {/* Grain texture overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(69,0,39,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(69,0,39,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Main content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left section - Branding & Info */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Animated bouncing brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <motion.h2
                animate={{
                  y: [0, -12, 0],
                  color: BRAND_COLORS[colorIndex],
                }}
                transition={{
                  y: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
                  color: { duration: 0.4, ease: 'easeInOut' },
                }}
                className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              >
                Chrismaison
              </motion.h2>
              <p className="text-sm font-medium text-[#A8842A]">Impacts</p>
            </motion.div>

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#450027]/30 bg-[#450027]/5 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#450027] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#450027]" />
              </span>
              <span className="text-xs font-medium tracking-wide text-[#450027]">
                Under Development
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#450027] sm:text-5xl lg:text-6xl"
            >
              We're Building
              <br />
              <span className="bg-gradient-to-r from-[#450027] to-[#A8842A] bg-clip-text text-transparent">
                Something Big.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mb-10 max-w-lg text-base leading-relaxed font-medium text-[#450027]/70 lg:text-lg"
            >
              A platform designed to create lasting change in communities.
              We're putting the finishing touches on something truly meaningful.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mb-10 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              {[
                { icon: Globe, label: 'Community Driven', delay: 0 },
                { icon: Zap, label: 'Impactful Programs', delay: 1.2 },
                { icon: Clock, label: 'Launching Soon', delay: 2.4 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative flex items-center gap-2 overflow-hidden rounded-full border border-[#450027]/15 bg-[#450027]/5 px-4 py-2 backdrop-blur-sm"
                >
                  {/* Sweeping highlight */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(212,167,59,0.35) 30%, rgba(69,0,39,0.25) 50%, rgba(212,167,59,0.35) 70%, transparent 100%)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: item.delay,
                      repeatDelay: 1,
                    }}
                  />
                  <item.icon className="relative z-10 h-3.5 w-3.5 text-[#A8842A]" />
                  <span className="relative z-10 text-xs font-medium text-[#450027]/80">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Email form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="w-full max-w-md"
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#450027]/50" />
                      <input
                        type="email"
                        required
                        disabled={submitting}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-[#450027]/15 bg-white/40 py-3.5 pl-11 pr-4 text-sm text-[#450027] placeholder-[#450027]/40 backdrop-blur-xl outline-none transition-all duration-300 focus:border-[#450027]/50 focus:bg-white/60 focus:ring-1 focus:ring-[#450027]/30 disabled:opacity-60"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#450027] to-[#A8842A] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#450027]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#450027]/30 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? 'Sending…' : 'Get Notified'}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-[#450027]/20 bg-white/40 px-6 py-4 text-sm text-[#450027] backdrop-blur-xl"
                >
                  <span className="mr-2">✓</span>
                  You're on the list! We'll notify you when we launch.
                </motion.div>
              )}
              {errorMsg && !submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-xs text-red-700"
                >
                  {errorMsg}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Right section - Creative Mission Status Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="mt-12 w-full max-w-sm flex-shrink-0 lg:mt-0"
          >
            <div className="relative">
              {/* Glow behind the card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#450027]/20 to-[#D4A73B]/30 blur-2xl" />

              {/* Glass card */}
              <div className="relative rounded-3xl border border-[#450027]/15 bg-white/30 p-8 backdrop-blur-2xl">
                {/* Card header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#450027]" />
                    <span className="text-xs font-medium uppercase tracking-widest text-[#450027]/60">
                      Mission Status
                    </span>
                  </div>
                  <div className="rounded-full border border-[#450027]/15 bg-white/40 px-3 py-1">
                    <span className="text-[10px] font-medium text-[#450027]">LIVE</span>
                  </div>
                </div>

                {/* Orbital radar animation */}
                <div className="relative mb-8 flex items-center justify-center">
                  <div className="relative h-40 w-40">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border border-[#450027]/15" />
                    {/* Middle ring */}
                    <div className="absolute inset-4 rounded-full border border-[#450027]/20" />
                    {/* Inner ring */}
                    <div className="absolute inset-8 rounded-full border border-[#450027]/25" />
                    {/* Core ring */}
                    <div className="absolute inset-12 rounded-full border border-[#450027]/30" />

                    {/* Spinning radar sweep */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <div
                        className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom"
                        style={{
                          background: 'linear-gradient(to top, transparent, #450027)',
                        }}
                      />
                      <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#450027] shadow-lg shadow-[#450027]/50" />
                    </motion.div>

                    {/* Orbiting dots */}
                    <motion.div
                      className="absolute inset-4"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#A8842A]" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-8"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#450027]/60" />
                    </motion.div>

                    {/* Center pulsing core */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="h-3 w-3 rounded-full bg-[#450027] shadow-lg shadow-[#450027]/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Rotating status message */}
                <div className="mb-6 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={msgIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="text-sm font-medium text-[#450027]"
                    >
                      {STATUS_MESSAGES[msgIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Divider */}
                <div className="mb-6 h-px bg-gradient-to-r from-transparent via-[#450027]/20 to-transparent" />

                {/* Milestone tracker */}
                <div className="space-y-3">
                  {MILESTONES.map((m, i) => {
                    const isDone = m.done;
                    const isActive = 'active' in m && m.active;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#450027]" />
                        ) : isActive ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          >
                            <Loader2 className="h-4 w-4 flex-shrink-0 text-[#A8842A]" />
                          </motion.div>
                        ) : (
                          <Circle className="h-4 w-4 flex-shrink-0 text-[#450027]/30" />
                        )}
                        <span
                          className={`text-xs font-medium ${
                            isDone
                              ? 'text-[#450027]/60 line-through'
                              : isActive
                              ? 'text-[#450027]'
                              : 'text-[#450027]/40'
                          }`}
                        >
                          {m.label}
                        </span>
                        {isActive && (
                          <span className="ml-auto rounded-full bg-[#450027]/10 px-2 py-0.5 text-[10px] font-medium text-[#450027]">
                            In Progress
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#450027]/20 to-transparent" />

                {/* Looping progress bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#450027]/60">Overall Progress</span>
                    <span className="text-[#450027]">Building...</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#450027]/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#450027] to-[#A8842A]"
                      animate={{ width: ['0%', '85%', '0%'] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-[#450027]/10 bg-white/20 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <span className="text-xs text-[#450027]/60">
              &copy; {new Date().getFullYear()} Chrismaison Impacts
            </span>
            <span className="text-xs text-[#450027]/60">All rights reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoonPage;
