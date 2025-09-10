import React, { useMemo, useState } from 'react';

export default function TakeQuiz() {
  const quizzes = useMemo(() => JSON.parse(localStorage.getItem('quizzes')||'[]'), []);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const submit = () => {
    let s = 0;
    quizzes.forEach(q => {
      if (Number(answers[q.id]) === q.answer) s += 1;
    });
    setScore(`${s}/${quizzes.length}`);
    const hist = JSON.parse(localStorage.getItem('quiz_scores')||'[]');
    hist.push({ ts: Date.now(), s, total: quizzes.length });
    localStorage.setItem('quiz_scores', JSON.stringify(hist));
  };

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <section className="bg-white dark:bg-gray-800 rounded p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Take Quiz</h1>
        {quizzes.length === 0 ? <p>No quizzes available yet.</p> : (
          <div className="space-y-4">
            {quizzes.map(q=>(
              <div key={q.id} className="border dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900">
                <div className="font-semibold">{q.title}</div>
                <div className="mb-2">{q.q}</div>
                <div className="grid gap-2">
                  {q.opts.map((opt, i)=>(
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q_${q.id}`}
                        checked={Number(answers[q.id])===i}
                        onChange={()=>setAnswers(a=>({...a, [q.id]: i}))}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={submit} className="px-4 py-2 rounded bg-green-600 text-white">Submit</button>
            {score && <div className="text-lg font-semibold">Score: {score}</div>}
          </div>
        )}
      </section>
    </main>
  );
}
