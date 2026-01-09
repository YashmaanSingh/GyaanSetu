import React, { useState } from 'react';

export default function Admin(){
  const [students, setStudents] = useState(()=> JSON.parse(localStorage.getItem('students')||'[]'));
  const [name, setName] = useState('');

  const add = ()=>{
    if(!name) return;
    const next = [...students, {id:Date.now(), name}];
    setStudents(next);
    localStorage.setItem('students', JSON.stringify(next));
    setName('');
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow dark:bg-gray-800">
          <h3 className="font-semibold mb-2">Add Student</h3>
          <div className="flex gap-2">
            <input value={name} onChange={e=>setName(e.target.value)} className="border px-2 py-1 rounded flex-1" placeholder="Student name"/>
            <button onClick={add} className="px-3 py-1 bg-purple-600 text-white rounded">Add</button>
          </div>
          <ul className="mt-3 list-disc pl-5">
            {students.map(s=> <li key={s.id}>{s.name}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow dark:bg-gray-800">
          <h3 className="font-semibold mb-2">Manage</h3>
          <p className="text-sm">Export data, manage roles (placeholders)</p>
        </div>
      </div>
    </section>
  );
}
