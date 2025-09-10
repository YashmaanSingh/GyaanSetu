import React, { useState } from 'react';

export default function Assignments() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('quizzes')||'[]'));
  const [title, setTitle] = useState('');
  const [qText, setQText] = useState('');
  const [opts, setOpts] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState(0);

  const save = () => {
    if (!title.trim() || !qText.trim() || opts.some(o => !o.trim())) return;
    const quiz = { id: Date.now(), title: title.trim(), q: qText.trim(), opts: opts.map(o=>o.trim()), answer };
    const next = [...items, quiz];
    setItems(next);
    localStorage.setItem('quizzes', JSON.stringify(next));
    setTitle(''); setQText(''); setOpts(['','','','']); setAnswer(0);
  };

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <section className="bg-white dark:bg-gray-800 rounded p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Assignments (MCQ)</h1>

        <div className="grid gap-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} className="border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900" placeholder="Quiz title" />
          <textarea value={qText} onChange={e=>setQText(e.target.value)} className="border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900" placeholder="Question text" />
          <div className="grid sm:grid-cols-2 gap-2">
            {opts.map((o,i)=>(
              <input key={i} value={o} onChange={e=>setOpts(prev=>prev.map((x,idx)=> idx===i? e.target.value: x))} className="border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900" placeholder={`Option ${i+1}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Correct answer:</label>
            <select value={answer} onChange={e=>setAnswer(Number(e.target.value))} className="border dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-900">
              {opts.map((_,i)=><option key={i} value={i}>Option {i+1}</option>)}
            </select>
          </div>
          <button onClick={save} className="px-4 py-2 rounded bg-blue-600 text-white">Save Quiz</button>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">All Quizzes</h2>
          <ul className="space-y-2">
            {items.map(q=>(
              <li key={q.id} className="border dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900">
                <div className="font-semibold">{q.title}</div>
                <div className="text-sm text-gray-500">{q.q}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
