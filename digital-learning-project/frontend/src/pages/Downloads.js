import React, { useEffect, useState } from 'react';

export default function Downloads() {
  const [downloads, setDownloads] = useState(() => JSON.parse(localStorage.getItem('downloads')||'[]'));
  const [lessonsMap, setLessonsMap] = useState(() => JSON.parse(localStorage.getItem('lessonsMap')||'{}'));

  useEffect(() => localStorage.setItem('downloads', JSON.stringify(downloads)), [downloads]);

  const remove = (id) => {
    setDownloads(ds => ds.filter(x => x !== id));
    // In future: also delete from Cache Storage via service worker message
  };

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Offline Downloads</h1>
        {downloads.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No lessons cached yet.</p>
        ) : (
          <ul className="space-y-2">
            {downloads.map(id => (
              <li key={id} className="flex items-center justify-between border dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900">
                <div>
                  <div className="font-semibold">{lessonsMap[id]?.title || `Lesson #${id}`}</div>
                  <div className="text-xs text-green-600">Available offline</div>
                </div>
                <button onClick={() => remove(id)} className="px-3 py-1 rounded bg-red-500 text-white">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
