import React, { useState } from 'react';

export default function Announcements() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('ann')||'[]'));
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    const next = [{ id: Date.now(), text: text.trim(), ts: Date.now() }, ...items];
    setItems(next);
    localStorage.setItem('ann', JSON.stringify(next));
    setText('');
  };

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Announcements</h1>
        <div className="flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="border dark:border-gray-700 rounded px-3 py-2 flex-1 bg-white dark:bg-gray-900" placeholder="New announcement..." />
          <button onClick={add} className="px-4 py-2 rounded bg-blue-600 text-white">Post</button>
        </div>
        <ul className="mt-4 space-y-2">
          {items.map(a=>(
            <li key={a.id} className="border dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900">
              <div>{a.text}</div>
              <div className="text-xs text-gray-500">{new Date(a.ts).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
