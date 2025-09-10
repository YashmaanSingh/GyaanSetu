import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Attendance() {
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem('students')||'[]'));
  const [marked, setMarked] = useState({});
  const weekKey = new Date().toISOString().slice(0,10);

  const toggle = (id) => setMarked(m => ({ ...m, [id]: !m[id] }));

  const save = () => {
    const hist = JSON.parse(localStorage.getItem('attendance')||'{}');
    hist[weekKey] = { ...(hist[weekKey]||{}), ...marked };
    localStorage.setItem('attendance', JSON.stringify(hist));
    alert('Attendance saved');
  };

  const data = useMemo(() => {
    const hist = JSON.parse(localStorage.getItem('attendance')||'{}');
    const days = Object.keys(hist).slice(-7);
    return days.map(d => {
      const entries = Object.values(hist[d]||{});
      const present = entries.filter(Boolean).length;
      return { day: d.slice(5), present };
    });
  }, [weekKey, marked]);

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <section className="bg-white dark:bg-gray-800 rounded p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Attendance</h1>
        <ul className="space-y-2">
          {students.map(s => (
            <li key={s.id} className="flex items-center justify-between border dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900">
              <span>{s.name}</span>
              <button
                onClick={() => toggle(s.id)}
                className={`px-3 py-1 rounded ${marked[s.id] ? 'bg-green-600' : 'bg-gray-300'} text-white`}
              >
                {marked[s.id] ? 'Present' : 'Absent'}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={save} className="mt-4 px-4 py-2 rounded bg-blue-600 text-white">Save Today</button>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">Last 7 Days</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="present" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
