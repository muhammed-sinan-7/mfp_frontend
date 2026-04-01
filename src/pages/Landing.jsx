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
    logo: "https://img.icons8.com/3d-fluency/512/instagram-new.png",
    sizeClass: "md:w-40 lg:w-48 xl:w-56",
    posClass: "md:top-2 md:left-0 lg:top-2 lg:left-10",
    rotate: "-rotate-[16deg]",
    z: "z-40",
    shadow: "drop-shadow-[0_22px_18px_rgba(15,23,42,0.28)]",
  },
  {
    name: "Facebook",
    logo: "https://img.icons8.com/3d-fluency/512/facebook-logo.png",
    sizeClass: "md:w-32 lg:w-40 xl:w-44",
    posClass: "md:top-12 md:right-1 lg:top-20 lg:right-8",
    rotate: "rotate-[10deg]",
    z: "z-20",
    shadow: "drop-shadow-[0_18px_15px_rgba(15,23,42,0.24)]",
  },
  {
    name: "YouTube",
    logo: "https://img.icons8.com/3d-fluency/512/youtube-play.png",
    sizeClass: "md:w-44 lg:w-56 xl:w-64",
    posClass: "md:bottom-2 md:left-10 lg:bottom-2 lg:left-16",
    rotate: "-rotate-[7deg]",
    z: "z-50",
    shadow: "drop-shadow-[0_26px_20px_rgba(15,23,42,0.3)]",
  },
  {
    name: "LinkedIn",
    logo: "https://img.icons8.com/3d-fluency/512/linkedin--v1.png",
    sizeClass: "md:w-32 lg:w-40 xl:w-44",
    posClass: "md:bottom-4 md:right-3 lg:bottom-8 lg:right-8",
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
      className="relative h-[100dvh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-100 text-slate-900"
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

      <main className="mx-auto h-[calc(100dvh-4rem)] w-full max-w-7xl px-4 sm:h-[calc(100dvh-5rem)] sm:px-6 md:grid md:grid-cols-2 md:items-center md:gap-8">
        <section className="flex h-full flex-col justify-center py-3 sm:py-5 md:py-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700 sm:mb-4 sm:px-4 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Social Command Center
          </div>

          <h1 className="max-w-xl text-[1.8rem] font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Plan. Publish. Grow.
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              All Platforms. One Flow.
            </span>
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
            Manage all social channels in one workspace. Create faster, schedule smarter, and track performance clearly.
          </p>

          <div className="mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
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

          <div className="mt-6 hidden grid-cols-3 gap-3 xl:grid">
            {features.map((item) => (
              <div key={item.title} className="rounded-xl bg-white/85 p-3 shadow-sm sm:rounded-2xl sm:p-4">
                <item.icon className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                <h3 className="mt-2 text-sm font-semibold text-slate-900 sm:mt-3">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative hidden h-[420px] md:block lg:h-[500px] xl:h-[560px]">
          <div className="pointer-events-none absolute left-8 top-10 h-28 w-28 rounded-full bg-pink-200/35 blur-3xl lg:left-12 lg:top-16 lg:h-36 lg:w-36" />
          <div className="pointer-events-none absolute right-6 top-8 h-28 w-28 rounded-full bg-blue-200/30 blur-3xl lg:right-10 lg:top-12 lg:h-40 lg:w-40" />
          <div className="pointer-events-none absolute bottom-6 right-12 h-28 w-28 rounded-full bg-cyan-200/30 blur-3xl lg:right-20 lg:bottom-10 lg:h-44 lg:w-44" />

          <div className="absolute inset-0 [perspective:1500px]">
            {platformLogos.map((item) => (
              <img
                key={item.name}
                src={item.logo}
                alt={item.name}
                className={`absolute ${item.posClass} ${item.sizeClass} ${item.rotate} ${item.z} ${item.shadow} select-none object-contain transition-transform duration-500 hover:scale-105`}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center justify-center gap-3 text-xs text-slate-500 md:flex">
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
