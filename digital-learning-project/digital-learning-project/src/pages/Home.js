import React, { useContext } from 'react';
import { LangContext } from '../App';
import { STR } from '../utils/languageData';

export default function Home() {
  const { lang } = useContext(LangContext);
  const t = STR[lang];

  return (
    <main className="min-h-[calc(100vh-56px)] relative overflow-hidden">

      {/* Soft gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-indigo-50 dark:from-[#0b1220] dark:via-[#0b1220] dark:to-[#0b1220]" />

      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_60%)] blur-2xl dark:opacity-40" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)] blur-2xl dark:opacity-40" />

      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {t.appTitle}
            </h1>
            <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-2xl">
              {t.welcome}
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="/student"
                className="inline-flex items-center px-5 py-3 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900"
              >
                Start Learning
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-5 py-3 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Illustration placeholder (can swap with an image later) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative h-64">
              <div className="absolute inset-0 rounded-2xl bg-white/70 backdrop-blur-md ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10" />
              <div className="absolute inset-4 rounded-xl grid place-items-center text-gray-600 dark:text-gray-300">
                <span className="text-sm">Add an illustration or stats here</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study-friendly cards (glassmorphism) */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-black/10 shadow-sm dark:bg-white/10 dark:ring-white/10">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t.home_problem}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t.home_ps_text}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-black/10 shadow-sm dark:bg-white/10 dark:ring-white/10">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t.home_expected}</h3>
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>{t.home_point_offline}</li>
              <li>{t.home_point_locale}</li>
              <li>{t.home_point_dash}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick links row */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/student" className="group p-4 rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-black/10 hover:ring-indigo-300 hover:shadow-md transition dark:bg-white/10 dark:ring-white/10 dark:hover:ring-indigo-400">
            <div className="font-semibold text-gray-900 dark:text-white">Student Area</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Lessons, downloads, and progress</p>
          </a>
          <a href="/teacher" className="group p-4 rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-black/10 hover:ring-indigo-300 hover:shadow-md transition dark:bg-white/10 dark:ring-white/10 dark:hover:ring-indigo-400">
            <div className="font-semibold text-gray-900 dark:text-white">Teacher Tools</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Attendance, assignments, resources</p>
          </a>
          <a href="/admin" className="group p-4 rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-black/10 hover:ring-indigo-300 hover:shadow-md transition dark:bg-white/10 dark:ring-white/10 dark:hover:ring-indigo-400">
            <div className="font-semibold text-gray-900 dark:text-white">Admin Panel</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Students, announcements, oversight</p>
          </a>
        </div>
      </section>
    </main>
  );
}
