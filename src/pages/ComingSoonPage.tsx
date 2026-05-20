import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Clock, Mail, ArrowRight, Globe, Zap } from 'lucide-react';

// ----------------------------------------------------------------------
// CONFIG: Change the launch date here.
// ----------------------------------------------------------------------
const LAUNCH_DATE = new Date(
  new Date().getTime() + 30 * 24 * 60 * 60 * 1000
);

// Brand colors for the bouncing text color cycle
const BRAND_COLORS = ['#E64E03', '#FFA812', '#ffffff', '#FF6B2C'];

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (target: Date): TimeLeft => {
  const diff = target.getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => n.toString().padStart(2, '0');

const ComingSoonPage = () => {
  const target = useMemo(() => LAUNCH_DATE, []);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(target)
  );
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  // Cycle the brand name color on every bounce
  useEffect(() => {
    const id = window.setInterval(() => {
      setColorIndex((prev) => (prev + 1) % BRAND_COLORS.length);
    }, 1200);
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

      <div className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1/4 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[#E64E03]/20 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[35rem] w-[35rem] rounded-full bg-[#FFA812]/15 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E64E03]/10 blur-[80px]" />
          </motion.div>
        </div>

        {/* Grain texture overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
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
              <p className="text-sm font-medium text-[#FFA812]">Impacts</p>
            </motion.div>

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E64E03]/30 bg-[#E64E03]/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E64E03] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E64E03]" />
              </span>
              <span className="text-xs font-medium tracking-wide text-[#E64E03]">
                Under Development
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              We're Building
              <br />
              <span className="bg-gradient-to-r from-[#E64E03] to-[#FFA812] bg-clip-text text-transparent">
                Something Big.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mb-10 max-w-lg text-base leading-relaxed text-white/60 lg:text-lg"
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
                { icon: Globe, label: 'Community Driven' },
                { icon: Zap, label: 'Impactful Programs' },
                { icon: Clock, label: 'Launching Soon' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                >
                  <item.icon className="h-3.5 w-3.5 text-[#FFA812]" />
                  <span className="text-xs font-medium text-white/70">{item.label}</span>
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
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                      <input
                        type="email"
                        required
                        disabled={submitting}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none transition-all duration-300 focus:border-[#E64E03]/50 focus:bg-white/10 focus:ring-1 focus:ring-[#E64E03]/30 disabled:opacity-60"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E64E03] to-[#FFA812] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E64E03]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#E64E03]/30 disabled:cursor-not-allowed disabled:opacity-70"
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
                  className="rounded-xl border border-[#FFA812]/20 bg-[#FFA812]/10 px-6 py-4 text-sm text-white backdrop-blur-xl"
                >
                  <span className="mr-2">✓</span>
                  You're on the list! We'll notify you when we launch.
                </motion.div>
              )}
              {errorMsg && !submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-xs text-red-400"
                >
                  {errorMsg}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Right section - Glassmorphism countdown card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="mt-12 w-full max-w-sm flex-shrink-0 lg:mt-0"
          >
            <div className="relative">
              {/* Glow behind the card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#E64E03]/20 to-[#FFA812]/20 blur-2xl" />

              {/* Glass card */}
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
                {/* Card header */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#E64E03]" />
                    <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                      Countdown
                    </span>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <span className="text-[10px] font-medium text-[#FFA812]">LIVE</span>
                  </div>
                </div>

                {/* Countdown grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Min', value: timeLeft.minutes },
                    { label: 'Sec', value: timeLeft.seconds },
                  ].map((box) => (
                    <div
                      key={box.label}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-[#E64E03]/20 hover:bg-white/[0.05]"
                    >
                      <motion.span
                        key={box.value}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="block text-3xl font-bold tabular-nums text-white"
                      >
                        {pad(box.value)}
                      </motion.span>
                      <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-white/40">
                        {box.label}
                      </span>
                      {/* Subtle gradient accent on hover */}
                      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#E64E03]/0 via-[#E64E03]/50 to-[#FFA812]/0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Progress indicator */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/40">Progress</span>
                    <span className="text-[#FFA812]">Building...</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#E64E03] to-[#FFA812]"
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
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 bg-black/30 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <span className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} Chrismaison Impacts
            </span>
            <span className="text-xs text-white/30">All rights reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoonPage;
