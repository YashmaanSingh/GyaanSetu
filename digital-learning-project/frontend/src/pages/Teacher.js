import React, { useState } from 'react';

export default function Teacher(){
  const [resources, setResources] = useState(()=> JSON.parse(localStorage.getItem('resources')||'[]'));
  const [name, setName] = useState('');

  const upload = ()=>{
    if(!name) return;
    const next = [...resources, {id:Date.now(), name}];
    setResources(next);
    localStorage.setItem('resources', JSON.stringify(next));
    setName('');
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <div className="p-4 bg-white rounded shadow dark:bg-gray-800">
        <h3 className="font-semibold">Upload Resource</h3>
        <div className="mt-2 flex gap-2">
          <input value={name} onChange={e=>setName(e.target.value)} className="border px-2 py-1 rounded flex-1" placeholder="Resource name or link"/>
          <button onClick={upload} className="px-3 py-1 bg-blue-600 text-white rounded">Upload</button>
        </div>
        {resources.length>0 && (
          <ul className="mt-3 list-disc pl-5">
            {resources.map(r=> <li key={r.id}>{r.name}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
