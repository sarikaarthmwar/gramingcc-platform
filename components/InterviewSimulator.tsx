"use client";

import Link from "next/link";
import { useState } from "react";

type Role = "data" | "qa" | "ops";
type InterviewType = "mixed" | "technical" | "behavioural";
type Mode = "demo" | "live";
type Question = { id: string; competency: string; prompt: string; followUp: string; kind?: "technical" | "behavioural" };
type AnswerFeedback = { competency: string; score: number; feedback: string; evidence: string };
type Report = {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  answers: AnswerFeedback[];
  nextPractice: string[];
  evaluationMode: string;
};

const roleNames: Record<Role, string> = {
  data: "Junior Data Analyst",
  qa: "QA / Test Automation Associate",
  ops: "AI Operations Associate"
};

const demoQuestions: Record<Role, Question[]> = {
  data: [
    { id: "d1", competency: "Data quality", kind: "technical", prompt: "You receive a spreadsheet with duplicate customer rows, inconsistent dates and missing region values. What would you check before sharing a report?", followUp: "How would you prove the cleaned data is still accurate?" },
    { id: "d2", competency: "SQL and analysis", kind: "technical", prompt: "A table Orders contains customer_id and amount. Explain how you would calculate total order amount per customer.", followUp: "What would you check if the totals looked unexpectedly high?" },
    { id: "d3", competency: "Business insight", kind: "technical", prompt: "Sales rose 20% this month, but order count fell 10%. Give possible explanations and describe what data you would check next.", followUp: "How would you communicate uncertainty to a business stakeholder?" },
    { id: "d4", competency: "Communication", kind: "behavioural", prompt: "Tell me about a time you had to explain a complex idea or an error to someone who was not familiar with the details. How did you make it clear?", followUp: "What would you do differently next time?" },
    { id: "d5", competency: "Problem solving", kind: "behavioural", prompt: "Imagine a report is due in an hour, but the source data has a quality issue. What would you do and what would you tell your manager?", followUp: "How would you balance speed with accuracy?" },
    { id: "d6", competency: "Learning agility", kind: "behavioural", prompt: "Describe how you would learn an unfamiliar reporting tool when a task depends on it.", followUp: "How would you check that you had learned it correctly?" }
  ],
  qa: [
    { id: "q1", competency: "Test design", kind: "technical", prompt: "A registration form asks for a name, email and password. Describe positive, negative and edge-case tests you would run.", followUp: "Which cases would you automate first, and why?" },
    { id: "q2", competency: "Debugging", kind: "technical", prompt: "A user clicks Submit but sees a spinner forever. Walk through how you would investigate the issue.", followUp: "What evidence would you include before raising a defect?" },
    { id: "q3", competency: "Automation strategy", kind: "technical", prompt: "A repeated test takes 20 minutes manually. How would you decide whether to automate it, and what would you verify in the automation?", followUp: "What can make an automated test unreliable?" },
    { id: "q4", competency: "Defect communication", kind: "behavioural", prompt: "A developer says a bug you reported cannot be reproduced. How would you handle the conversation and move the issue forward?", followUp: "What would you do if you still disagreed about severity?" },
    { id: "q5", competency: "Prioritisation", kind: "behavioural", prompt: "You have time to test only three of ten scenarios before a release. How would you prioritise?", followUp: "What risk would you communicate to the release owner?" },
    { id: "q6", competency: "Learning agility", kind: "behavioural", prompt: "Tell me about a time you had to learn a tool or process quickly to solve a problem.", followUp: "How did you verify your solution worked?" }
  ],
  ops: [
    { id: "o1", competency: "AI output validation", kind: "technical", prompt: "An AI assistant writes a fluent case summary but includes a number not present in the source document. What would you do before using the summary?", followUp: "How would you prevent this issue from recurring?" },
    { id: "o2", competency: "Process judgement", kind: "technical", prompt: "A workflow checks required fields, routes a request and closes it. Which exceptions should be stopped or escalated rather than processed automatically?", followUp: "What information would you record for the human reviewer?" },
    { id: "o3", competency: "Quality assurance", kind: "technical", prompt: "An AI-generated answer appears correct but cites no evidence. Describe a practical quality-check process before it reaches a customer.", followUp: "What would make you reject or escalate the output?" },
    { id: "o4", competency: "Privacy and responsible AI", kind: "behavioural", prompt: "A colleague wants to paste customer names, phone numbers and account details into a public AI tool to save time. How would you respond?", followUp: "What safe alternative would you suggest?" },
    { id: "o5", competency: "Ownership", kind: "behavioural", prompt: "You discover an operational checklist was followed, but an important error still reached the next team. What would you do first?", followUp: "How would you improve the process without blaming a person?" },
    { id: "o6", competency: "Communication", kind: "behavioural", prompt: "Describe how you would explain an AI workflow limitation to a colleague who expects the system to be correct every time.", followUp: "How would you make the guidance easy to follow?" }
  ]
};

function makeDemoSet(role: Role, type: InterviewType): Question[] {
  const source = demoQuestions[role];
  const selected = type === "mixed"
    ? [source[0], source[3], source[1], source[4]]
    : source.filter(q => q.kind === type).slice(0, 4);
  return selected.map((q, i) => ({ ...q, id: `q${i + 1}` }));
}

function evaluateDemo(questions: Question[], answers: Record<string, string>): Report {
  const results = questions.map(q => {
    const answer = (answers[q.id] || "").trim();
    const words = answer.split(/\s+/).filter(Boolean);
    const hasEvidence = /because|for example|for instance|first|then|check|verify|measure|result|learn|evidence|test|compare|review|communicat/i.test(answer);
    const score = Math.max(1, Math.min(4, (words.length >= 65 ? 3 : words.length >= 25 ? 2 : 1) + (hasEvidence && words.length >= 25 ? 1 : 0)));
    return {
      competency: q.competency,
      score,
      feedback: score >= 4
        ? "Your answer includes useful detail. In the next round, make the evidence and outcome even more explicit."
        : score >= 3
          ? "You have a workable starting point. Add a concrete example, explain why you chose the steps, and state how you would verify the result."
          : "Build this answer with a clear approach, one concrete example and a check or outcome. Short answers can be valid, but make your reasoning visible.",
      evidence: words.length < 25
        ? "The response is brief, so there is limited evidence to review."
        : hasEvidence
          ? "The response includes some action or verification language; the approach still needs human review."
          : "Add explicit steps, reasoning and a way to check the result."
    };
  });
  const average = Math.round(results.reduce((sum, item) => sum + item.score, 0) / results.length * 20);
  return {
    overallScore: average,
    summary: "This is a demo practice indicator based on answer length and a few reasoning cues. It is not an AI evaluation, validated assessment or hiring recommendation.",
    strengths: [
      "You completed a role-focused practice round.",
      "Review the feedback question by question and keep the parts of your answers that are clear and specific."
    ],
    improvements: [
      "Use a concrete example rather than only describing what you might do.",
      "Explain your reasoning and how you would check the outcome.",
      "For experience-based questions, try Situation → Task → Action → Result (STAR)."
    ],
    answers: results,
    nextPractice: [
      "Choose your lowest-scoring question and answer it again with specific steps.",
      "Practise explaining how you would verify the outcome.",
      "Ask a mentor to review one answer for accuracy and clarity."
    ],
    evaluationMode: "demo"
  };
}

export default function InterviewSimulator() {
  const [role, setRole] = useState<Role>("data");
  const [interviewType, setInterviewType] = useState<InterviewType>("mixed");
  const [mode, setMode] = useState<Mode>("demo");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [stage, setStage] = useState<"setup" | "interview" | "report">("setup");
  const [report, setReport] = useState<Report | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function startInterview() {
    setBusy("start");
    setError("");
    setReport(null);
    setAnswers({});
    setCurrent(0);
    try {
      let nextQuestions: Question[];
      if (mode === "demo") {
        nextQuestions = makeDemoSet(role, interviewType);
      } else {
        const response = await fetch("/api/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate", role, interviewType })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not prepare the interview.");
        nextQuestions = data.questions;
      }
      if (!Array.isArray(nextQuestions) || nextQuestions.length !== 4) throw new Error("The interview could not be prepared. Please retry.");
      setQuestions(nextQuestions);
      setStage("interview");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please retry.");
    } finally {
      setBusy("");
    }
  }

  async function finishInterview() {
    if (questions.some(q => !(answers[q.id] || "").trim())) {
      setError("Please add an answer to every question. You can go back to any question before finishing.");
      return;
    }
    setBusy("evaluate");
    setError("");
    try {
      let nextReport: Report;
      if (mode === "demo") {
        nextReport = evaluateDemo(questions, answers);
      } else {
        const response = await fetch("/api/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "evaluate",
            role,
            interviewType,
            questions,
            answers: questions.map(q => answers[q.id])
          })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not evaluate your answers.");
        nextReport = data;
      }
      setReport(nextReport);
      setStage("report");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please retry.");
    } finally {
      setBusy("");
    }
  }

  function reset() {
    setStage("setup");
    setQuestions([]);
    setAnswers({});
    setCurrent(0);
    setReport(null);
    setError("");
  }

  const question = questions[current];

  return (
    <main className="interview-shell">
      <header className="site-header interview-header">
        <Link className="brand" href="/" aria-label="GraminGCC home">
          <span className="interview-brand-mark" aria-hidden="true">✳</span>
          <span className="brand-copy">
            <span className="brand-name">Gramin<span>GCC</span></span>
            <span className="brand-tagline">RURAL TALENT. GLOBAL IMPACT.</span>
          </span>
        </Link>
        <Link href="/" className="portal-home-link">← Back to homepage</Link>
      </header>

      <section className="interview-hero">
        <div className="eyebrow"><span className="eyebrow-dot" /> THE READINESS JOURNEY · PRACTISE</div>
        <h1>Practise the interview.<br /><span>Build confidence with evidence.</span></h1>
        <p>Work through realistic, role-specific questions, explain your reasoning and get feedback on what to strengthen next.</p>
        <div className="interview-step-pills"><span>01 · Prepare</span><span className="active">02 · Practise</span><span>03 · Reflect</span></div>
      </section>

      {stage === "setup" && (
        <section className="interview-card interview-setup">
          <div className="interview-card-heading"><span>01</span><div><h2>Set up your mock interview</h2><p>Choose the role and practice format that match your goal.</p></div></div>
          <div className="interview-form-grid">
            <div><label htmlFor="interview-role">Target role</label><select id="interview-role" value={role} onChange={e => setRole(e.target.value as Role)}><option value="data">Junior Data Analyst</option><option value="qa">QA / Test Automation Associate</option><option value="ops">AI Operations Associate</option></select></div>
            <div><label htmlFor="interview-type">Interview format</label><select id="interview-type" value={interviewType} onChange={e => setInterviewType(e.target.value as InterviewType)}><option value="mixed">Mixed — recommended</option><option value="technical">Technical / work scenarios</option><option value="behavioural">Behavioural & situational</option></select></div>
            <div className="interview-form-wide"><label htmlFor="interview-engine">Feedback engine</label><select id="interview-engine" value={mode} onChange={e => setMode(e.target.value as Mode)}><option value="demo">Demo mode — works without an API key</option><option value="live">Live AI mode — requires server API key</option></select><p className="interview-help">{mode === "demo" ? "Demo mode uses sample questions and transparent practice heuristics. It does not call an AI model." : "Live AI mode generates questions and gives rubric-based feedback through the server-side OpenAI API."}</p></div>
          </div>
          <div className="interview-notice"><strong>Practice, not a hiring test.</strong> Your answers are not saved by this prototype. Avoid entering personal or confidential information.</div>
          {error && <div className="interview-error" role="alert">{error}</div>}
          <button className="button button-primary interview-primary-button" onClick={startInterview} disabled={!!busy}>{busy === "start" ? "Preparing your interview…" : "Start mock interview"} <span aria-hidden="true">→</span></button>
        </section>
      )}

      {stage === "interview" && question && (
        <section className="interview-card interview-question-card">
          <div className="interview-progress-top"><span>QUESTION {String(current + 1).padStart(2, "0")} OF {String(questions.length).padStart(2, "0")}</span><span>{roleNames[role]}</span></div>
          <div className="interview-progress-bar"><span style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <div className="interview-card-heading"><span>{String(current + 1).padStart(2, "0")}</span><div><h2>{question.competency}</h2><p>Take a moment to organise your thoughts. There is no countdown timer.</p></div></div>
          <div className="interview-prompt"><span>YOUR INTERVIEWER ASKS</span><p>{question.prompt}</p><details><summary>Possible follow-up</summary><p>{question.followUp}</p></details></div>
          <label htmlFor="interview-answer">Your answer</label>
          <textarea id="interview-answer" value={answers[question.id] || ""} onChange={e => setAnswers({ ...answers, [question.id]: e.target.value })} placeholder="Explain your approach, the steps you would take, and how you would check the result…" rows={7} />
          <p className="interview-help">Tip: be specific. Explain what you would do, why, and how you would know it worked.</p>
          {error && <div className="interview-error" role="alert">{error}</div>}
          <div className="interview-question-actions">
            <button className="interview-secondary-button" onClick={() => { setError(""); setCurrent(Math.max(0, current - 1)); }} disabled={current === 0 || !!busy}>← Previous</button>
            {current < questions.length - 1
              ? <button className="button button-primary interview-next-button" onClick={() => { if (!(answers[question.id] || "").trim()) { setError("Add a response before moving to the next question."); return; } setError(""); setCurrent(current + 1); }} disabled={!!busy}>Next question →</button>
              : <button className="button button-primary interview-next-button" onClick={finishInterview} disabled={!!busy}>{busy === "evaluate" ? "Reviewing your answers…" : "Finish & get feedback →"}</button>}
          </div>
        </section>
      )}

      {stage === "report" && report && (
        <section className="interview-card interview-report" aria-live="polite">
          <div className="interview-report-heading"><div><div className="eyebrow">YOUR PRACTICE REVIEW</div><h2>Learn from this round.</h2><p>{roleNames[role]} · {interviewType === "mixed" ? "Mixed interview" : interviewType === "technical" ? "Technical interview" : "Behavioural & situational interview"}</p></div><span className={`interview-mode-badge ${report.evaluationMode === "live-ai" ? "live" : ""}`}>{report.evaluationMode === "live-ai" ? "AI feedback" : "Demo feedback"}</span></div>
          <div className="interview-score-row"><div className="interview-score"><strong>{report.overallScore}</strong><span>/ 100</span></div><div><h3>Practice indicator</h3><p>{report.summary}</p></div></div>
          <div className="interview-report-grid">
            <div className="interview-report-panel"><h3>What went well</h3><ul>{report.strengths.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
            <div className="interview-report-panel"><h3>What to strengthen</h3><ul>{report.improvements.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
          </div>
          <h3 className="interview-subheading">Question-by-question feedback</h3>
          <div className="interview-answer-review">{report.answers.map((item, i) => <article key={`${item.competency}-${i}`}><div className="interview-answer-review-top"><strong>{String(i + 1).padStart(2, "0")} · {item.competency}</strong><span>{item.score}/5</span></div><p>{item.feedback}</p><small>Evidence note: {item.evidence}</small></article>)}</div>
          <h3 className="interview-subheading">Your next practice steps</h3>
          <ol className="interview-next-steps">{report.nextPractice.map((item, i) => <li key={i}>{item}</li>)}</ol>
          <p className="interview-disclaimer">This report is for learning and reflection. Demo scores use simple heuristics; live AI feedback can be wrong or incomplete. Neither is a validated psychometric assessment, official qualification, or hiring recommendation. Practical ability should be validated through work samples and mentor review.</p>
          <div className="interview-question-actions"><button className="interview-secondary-button" onClick={reset}>Start another round</button><button className="button button-primary interview-next-button" onClick={() => window.print()}>Print / save feedback ↗</button></div>
        </section>
      )}

      <footer className="interview-footer"><span>GRAMINGCC · TALENT READINESS</span><span>Practise with purpose. Grow with evidence.</span></footer>
    </main>
  );
}
