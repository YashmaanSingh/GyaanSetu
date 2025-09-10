import React, { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LangContext } from '../App';
import { fetchLessons } from '../services/api';

export default function Student(){
  const { lang } = useContext(LangContext);
  const [lessons, setLessons] = useState([]);
  const [downloads, setDownloads] = useState(()=> JSON.parse(localStorage.getItem('downloads')||'[]'));
  const [progress, setProgress] = useState(()=> Number(localStorage.getItem('progress')||20));

  useEffect(()=>{ fetchLessons().then(setLessons); },[]);
  useEffect(()=> localStorage.setItem('downloads', JSON.stringify(downloads)), [downloads]);
  useEffect(()=> localStorage.setItem('progress', progress), [progress]);

  const download = (id)=> setDownloads(d=> d.includes(id)? d: [...d, id]);
  const start = ()=> setProgress(p=> Math.min(100, p+10));

  const data = [{name:'Completed', value: progress}, {name:'Remaining', value: 100-progress}];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {lessons.map(l=> (
          <div key={l.id} className="p-4 bg-white rounded shadow dark:bg-gray-800">
            <h3 className="font-semibold">{l.title}</h3>
            <p className="text-sm">{l.minutes} minutes</p>
            <div className="mt-2 flex gap-2">
              <button onClick={()=>download(l.id)} className="px-3 py-1 bg-blue-500 text-white rounded">Download</button>
              <button onClick={start} className="px-3 py-1 bg-green-500 text-white rounded">Start</button>
            </div>
            <div className="mt-2 text-sm">Status: {downloads.includes(l.id)? 'Offline':'Online'}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white rounded shadow dark:bg-gray-800">
        <h3 className="font-semibold mb-2">My Progress</h3>
        <div style={{width:'100%', height:250}}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name"/>
              <YAxis domain={[0,100]}/>
              <Tooltip/>
              <Bar dataKey="value" fill="#8884d8"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
