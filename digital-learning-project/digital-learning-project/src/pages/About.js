import React from 'react';

export default function About() {
  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
        <h1 className="text-3xl font-bold mb-2">About Digital Pathshala</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Digital Pathshala bridges the rural–urban digital divide in Nabha by delivering offline‑first lessons, multi‑language content, and simple tools for teachers and admins, designed to work on low‑end devices and poor connectivity. 
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Why this matters</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Many government schools in and around Nabha lack up‑to‑date computers, reliable internet, and quality digital content, which limits digital literacy and future employability. An offline‑capable platform ensures equitable access to modern learning for rural students. 
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Who benefits</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Rural school students and teachers in Nabha</li>
            <li>School administrators and parents</li>
            <li>Punjab Education Department (monitoring and planning)</li>
          </ul>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">What this app provides</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Offline lessons and downloads so classes continue without internet</li>
          <li>Local language UI and content (EN/हिन्दी/ਪੰਜਾਬੀ)</li>
          <li>Digital literacy modules tailored for rural learners</li>
          <li>Teacher dashboards for attendance, assignments, and progress charts</li>
          <li>Lightweight UX optimized for low‑end devices and slow networks</li>
        </ul>
      </section>

      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">How it works</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Students download lessons once and access them offline later.</li>
          <li>Teachers create assignments/quizzes and mark attendance.</li>
          <li>Progress and basic analytics are stored locally and can sync when online.</li>
          <li>Admins manage students, announcements, and school‑wide notices.</li>
        </ol>
      </section>

      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">Our goals</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Improve digital literacy outcomes for rural students</li>
          <li>Reduce dependence on continuous internet connectivity</li>
          <li>Empower teachers with simple digital tools that work anywhere</li>
        </ul>
      </section>
    </main>
  );
}
