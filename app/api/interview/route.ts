import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const roles = {
  data: { name: "Junior Data Analyst", skills: ["Data quality", "SQL and analysis", "Business insight", "Communication"] },
  qa: { name: "QA / Test Automation Associate", skills: ["Test design", "Debugging", "Automation strategy", "Defect communication"] },
  ops: { name: "AI Operations Associate", skills: ["AI output validation", "Process judgement", "Quality assurance", "Privacy and responsible AI"] }
} as const;
type Role = keyof typeof roles;
type InterviewType = "mixed" | "technical" | "behavioural";

function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function callModel(instructions: string, input: unknown) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("Live AI is not configured. Add OPENAI_API_KEY to the server environment, or choose Demo mode.");
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions,
      input: JSON.stringify(input),
      text: { format: { type: "json_object" } },
      store: false
    }),
    cache: "no-store"
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error?.message;
    throw new Error(typeof message === "string" ? message.slice(0, 300) : `AI service returned HTTP ${response.status}`);
  }
  const output = (payload.output || [])
    .flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content || [])
    .filter((item: { type?: string }) => item.type === "output_text")
    .map((item: { text?: string }) => item.text || "")
    .join("\n");
  if (!output) throw new Error("The AI service returned no structured response. Please retry.");
  try { return JSON.parse(output) as Record<string, unknown>; }
  catch { throw new Error("The AI response was not valid JSON. Please retry."); }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const role = body?.role as Role;
    const type = body?.interviewType as InterviewType;
    if (!Object.prototype.hasOwnProperty.call(roles, role)) return fail("Choose a supported target role.");
    if (!["mixed", "technical", "behavioural"].includes(type)) return fail("Choose an interview format.");
    const spec = roles[role];

    if (body.action === "generate") {
      const data = await callModel(
        "Create exactly four fair, accessible mock-interview questions for a learner preparing for an entry-level GCC role. Return JSON only in {questions:[{id,competency,prompt,followUp}]}. Match the requested interview format. Questions must test observable work skills and use realistic, role-relevant scenarios. Avoid protected traits, personal-life questions, trivia, trick questions and hiring recommendations. Use plain English, one clear question at a time, and a practical follow-up. Use only the supplied competency names.",
        { role: spec.name, competencies: spec.skills, interviewType: type }
      );
      if (!Array.isArray(data.questions) || data.questions.length < 4) return fail("The model did not return a complete interview. Please retry.", 502);
      const questions = (data.questions as Array<Record<string, unknown>>).slice(0, 4).map((q, i) => ({
        id: `q${i + 1}`,
        competency: spec.skills.includes(String(q.competency) as never) ? String(q.competency) : spec.skills[i],
        prompt: String(q.prompt || "").slice(0, 1500),
        followUp: String(q.followUp || "What evidence would help you verify your approach?").slice(0, 500)
      }));
      if (questions.some(q => !q.prompt)) return fail("The model returned an incomplete question. Please retry.", 502);
      return NextResponse.json({ questions }, { headers: { "Cache-Control": "no-store" } });
    }

    if (body.action === "evaluate") {
      if (!Array.isArray(body.questions) || body.questions.length !== 4 || !Array.isArray(body.answers) || body.answers.length !== 4) {
        return fail("Complete all four interview questions before evaluation.");
      }
      const questions = (body.questions as Array<Record<string, unknown>>).slice(0, 4).map((q, i) => ({
        competency: spec.skills.includes(String(q.competency) as never) ? String(q.competency) : spec.skills[i],
        prompt: String(q.prompt || "").slice(0, 1500),
        answer: String(body.answers[i] || "").slice(0, 4000)
      }));
      if (questions.some(q => !q.answer.trim())) return fail("Answer every question before requesting feedback.");
      const data = await callModel(
        "Evaluate this mock interview for learning and practice only, never as an automated hiring decision. Return JSON only: {summary, strengths:[string], improvements:[string], answers:[{competency,score,feedback,evidence}], nextPractice:[string]}. Score each answer from 1-5 using observable evidence: 1 no relevant evidence; 2 partial, unclear approach; 3 reasonable approach with gaps; 4 clear practical approach and checks; 5 thorough, accurate and actionable. Do not score accent, grammar perfection, verbosity alone, identity or protected traits. Reward clear reasoning even when wording is simple. Be constructive and specific; distinguish evidence in the answer from assumptions. Scores are formative and not validated psychometrics. Give 2-4 strengths, 2-4 improvement actions, and up to 3 practical next exercises. Do not recommend hiring or rejection.",
        { role: spec.name, interviewType: type, competencyFramework: spec.skills, answers: questions }
      );
      const answerResults = Array.isArray(data.answers) ? data.answers as Array<Record<string, unknown>> : [];
      const results = questions.map((q, i) => {
        const item = answerResults.find(a => a.competency === q.competency) || answerResults[i] || {};
        const raw = Number(item.score);
        return {
          competency: q.competency,
          score: Number.isFinite(raw) ? Math.max(1, Math.min(5, Math.round(raw))) : 1,
          feedback: String(item.feedback || "Practise this answer with a concrete example, your steps and the result.").slice(0, 800),
          evidence: String(item.evidence || "Evidence needs further practical validation.").slice(0, 500)
        };
      });
      const list = (value: unknown, fallback: string) => Array.isArray(value)
        ? value.slice(0, 4).map(v => String(v).slice(0, 500))
        : [fallback];
      const overallScore = Math.round(results.reduce((sum, item) => sum + item.score, 0) / results.length * 20);
      return NextResponse.json({
        overallScore,
        summary: String(data.summary || "Use this report as practice feedback and validate skills through practical tasks and mentor review.").slice(0, 800),
        strengths: list(data.strengths, "Keep practising structured, evidence-based answers."),
        improvements: list(data.improvements, "Use a clear situation, action, reasoning and result in your answers."),
        answers: results,
        nextPractice: list(data.nextPractice, "Repeat one question and compare the clarity and evidence in your answer."),
        evaluationMode: "live-ai"
      }, { headers: { "Cache-Control": "no-store" } });
    }
    return fail("Unsupported action. Use generate or evaluate.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Interview service failed.";
    const status = message.includes("not configured") ? 503 : 502;
    return fail(message, status);
  }
}
