import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  BarChart3,
  CalendarClock,
} from "lucide-react";
import { BRAND_LOGO, BRAND_NAME, BRAND_TAGLINE } from "../config/brand";

const platformLogos = [
  {
    name: "Instagram",
    logo: "https://img.icons8.com/3d-fluency/1200/instagram-new.png",
    sizeClass: "w-32 lg:w-48 xl:w-56",
    posClass: "top-2 left-6 lg:top-2 lg:left-10",
    rotate: "-rotate-[16deg]",
    z: "z-40",
    shadow: "drop-shadow-[0_22px_18px_rgba(15,23,42,0.28)]",
  },
  {
    name: "Facebook",
    logo: "https://img.icons8.com/3d-fluency/1200/facebook-logo.png",
    sizeClass: "w-24 lg:w-40 xl:w-44",
    posClass: "top-8 right-6 lg:top-20 lg:right-8",
    rotate: "rotate-[10deg]",
    z: "z-20",
    shadow: "drop-shadow-[0_18px_15px_rgba(15,23,42,0.24)]",
  },
  {
    name: "YouTube",
    logo: "https://img.icons8.com/3d-fluency/1200/youtube-play.png",
    sizeClass: "w-36 lg:w-56 xl:w-64",
    posClass: "bottom-2 left-12 lg:bottom-2 lg:left-16",
    rotate: "-rotate-[7deg]",
    z: "z-50",
    shadow: "drop-shadow-[0_26px_20px_rgba(15,23,42,0.3)]",
  },
  {
    name: "LinkedIn",
    logo: "https://img.icons8.com/3d-fluency/1200/linkedin--v1.png",
    sizeClass: "w-24 lg:w-40 xl:w-44",
    posClass: "bottom-4 right-8 lg:bottom-8 lg:right-8",
    rotate: "rotate-[18deg]",
    z: "z-30",
    shadow: "drop-shadow-[0_20px_16px_rgba(15,23,42,0.26)]",
  },
];

const features = [
  {
    icon: CalendarClock,
    title: "AI Scheduling",
    text: "Auto-pick best posting windows.",
  },
  {
    icon: BarChart3,
    title: "Unified Analytics",
    text: "Track reach and engagement together.",
  },
  {
    icon: ShieldCheck,
    title: "Brand Safe Workflow",
    text: "Review, approve, and publish safely.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-[100dvh] overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-sky-100 text-slate-900 lg:h-[100dvh] lg:overflow-hidden"
      style={{ fontFamily: '"Sora", "Segoe UI", sans-serif' }}
    >
      <div className="pointer-events-none absolute -left-24 -top-32 -z-10 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 -z-10 h-[22rem] w-[22rem] rounded-full bg-cyan-200/35 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/50 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={BRAND_LOGO}
              alt={BRAND_NAME}
              className="h-9 w-9 rounded-xl shadow-md shadow-blue-200 sm:h-11 sm:w-11 sm:rounded-2xl"
            />
            <div>
              <p className="text-base font-semibold leading-none tracking-tight sm:text-lg">{BRAND_NAME}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">{BRAND_TAGLINE}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 sm:rounded-xl sm:px-4 sm:text-sm"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700 sm:rounded-xl sm:px-4 sm:text-sm"
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between gap-6 px-4 py-5 sm:px-6 sm:py-8 lg:grid lg:h-[calc(100dvh-7.5rem)] lg:grid-cols-2 lg:items-center lg:gap-8 lg:py-6">
        <section className="order-2 lg:order-1">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700 sm:mb-4 sm:px-4 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Social Command Center
          </div>

          <h1 className="max-w-xl text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Plan. Publish. Grow.
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              All Platforms. One Flow.
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
            Manage your social channels in one clean workspace. Create faster, schedule smarter,
            and track results without jumping between tools.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 sm:rounded-2xl sm:px-6 sm:py-3.5"
            >
              Create Workspace
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:rounded-2xl sm:px-6 sm:py-3.5"
            >
              <PlayCircle className="h-4 w-4" />
              Go to Login
            </button>
          </div>

          <div className="mt-5 hidden grid-cols-3 gap-3 sm:mt-6 md:grid">
            {features.map((item) => (
              <div key={item.title} className="rounded-xl bg-white/85 p-3 shadow-sm sm:rounded-2xl sm:p-4">
                <item.icon className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                <h3 className="mt-2 text-sm font-semibold text-slate-900 sm:mt-3">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="order-1 relative h-[220px] sm:h-[260px] lg:order-2 lg:h-[500px] xl:h-[560px]">
          <div className="pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-full bg-pink-200/35 blur-3xl sm:h-28 sm:w-28 lg:left-12 lg:top-16 lg:h-36 lg:w-36" />
          <div className="pointer-events-none absolute right-4 top-4 h-24 w-24 rounded-full bg-blue-200/30 blur-3xl sm:h-28 sm:w-28 lg:right-10 lg:top-12 lg:h-40 lg:w-40" />
          <div className="pointer-events-none absolute bottom-2 right-10 h-24 w-24 rounded-full bg-cyan-200/30 blur-3xl sm:h-28 sm:w-28 lg:right-20 lg:bottom-10 lg:h-44 lg:w-44" />

          <div className="absolute inset-0 [perspective:1500px]">
            {platformLogos.map((item) => (
              <img
                key={item.name}
                src={item.logo}
                alt={item.name}
                className={`absolute ${item.posClass} ${item.sizeClass} ${item.rotate} ${item.z} ${item.shadow} select-none object-contain transition-transform duration-500 hover:scale-105`}
                draggable={false}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-4 pb-4 text-xs text-slate-500 sm:px-6 sm:pb-5 lg:absolute lg:bottom-4 lg:left-1/2 lg:w-auto lg:-translate-x-1/2 lg:p-0">
        <Link to="/terms" className="hover:text-blue-600 hover:underline">
          Terms
        </Link>
        <span>|</span>
        <Link to="/privacy" className="hover:text-blue-600 hover:underline">
          Privacy
        </Link>
      </footer>
    </div>
  );
}
