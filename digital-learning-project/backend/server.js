// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let assignments = [
  {
    id: 1,
    title: "Math Quiz",
    questions: [
      { id: 1, question: "2 + 2 =", options: ["3", "4", "5"], answer: "4" },
      { id: 2, question: "5 - 3 =", options: ["1", "2", "3"], answer: "2" },
    ],
  },
];

let submissions = {}; // {assignmentId: {userId: {answers, score}}}

app.get("/api/assignments/:id", (req, res) => {
  const assignment = assignments.find((a) => a.id == req.params.id);
  if (!assignment) return res.status(404).json({ error: "Not found" });
  res.json(assignment);
});

app.post("/api/assignments/:id/submit", (req, res) => {
  const { answers, userId = "student1" } = req.body; // temp userId
  const assignment = assignments.find((a) => a.id == req.params.id);
  if (!assignment) return res.status(404).json({ error: "Not found" });

  let score = 0;
  assignment.questions.forEach((q) => {
    if (answers[q.id] === q.answer) score++;
  });

  submissions[assignment.id] = submissions[assignment.id] || {};
  submissions[assignment.id][userId] = { answers, score };

  res.json({ score });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
