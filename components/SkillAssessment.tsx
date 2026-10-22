"use client";
import Link from "next/link";
import { useState } from "react";

type Role = "data" | "qa" | "ops";
type Question = { id: string; skill: string; title: string; prompt: string; hint: string };
type SkillResult = { skill: string; score: number; target: number; gap: number; feedback: string; confidence: string };
type Plan = { skill: string; priority: string; activity: string; duration: string };
type Evaluation = { overallReadiness: number; skills: SkillResult[]; learningPlan: Plan[]; summary: string; evaluationMode: string };

const roleNames: Record<Role, string> = { data: "Junior Data Analyst", qa: "QA / Test Automation Associate", ops: "AI Operations Associate" };
const targets: Record<Role, number[]> = { data: [4,3,4,4], qa: [4,3,3,4], ops: [4,4,4,4] };
const samples: Record<Role, Question[]> = {
 data: [
  {id:"q1",skill:"Excel / spreadsheets",title:"Prepare reliable data",prompt:"A spreadsheet has duplicate customer rows, inconsistent date formats and blank region fields. Describe the steps you would take before reporting totals.",hint:"Mention validation, duplicates and missing values."},
  {id:"q2",skill:"SQL",title:"Summarise order data",prompt:"A table Orders contains customer_id and amount. Explain or write a query to calculate total order amount for each customer.",hint:"Think about grouping records and aggregating amounts."},
  {id:"q3",skill:"Data interpretation",title:"Interpret a trend",prompt:"Sales rose 20% this month, but the number of orders fell 10%. Give two possible explanations and what you would check before concluding performance improved.",hint:"Separate observations from hypotheses."},
  {id:"q4",skill:"Business communication",title:"Communicate a delay",prompt:"Write a short update to a manager explaining a report is delayed because source data has quality issues. Include next steps.",hint:"Be concise, clear and action-oriented."}
 ],
 qa: [
  {id:"q1",skill:"Testing fundamentals",title:"Test a registration form",prompt:"A registration form requires name, email and password. Describe positive, negative and edge-case tests you would run.",hint:"Include valid data, missing fields, invalid formats and boundary cases."},
  {id:"q2",skill:"Web application basics",title:"Investigate a stalled page",prompt:"A user clicks Submit but sees a spinner forever. What would you inspect to diagnose the issue?",hint:"Consider browser console, network requests and server response."},
  {id:"q3",skill:"Automation thinking",title:"Choose what to automate",prompt:"Which steps in a repeated registration-form test would you automate, and what should still be checked carefully by a human?",hint:"Consider repeatability, selectors, assertions and judgement."},
  {id:"q4",skill:"Bug reporting",title:"Write a useful bug report",prompt:"Write a concise bug report for a form that accepts an invalid email. Include reproduction steps, expected result and actual result.",hint:"Make the problem reproducible and specific."}
 ],
 ops: [
  {id:"q1",skill:"AI workflow literacy",title:"Verify an AI summary",prompt:"An AI assistant drafts a customer-support case summary. Describe how you would check it before using it in an operational workflow.",hint:"Verify against the source; fluent text is not proof."},
  {id:"q2",skill:"Process understanding",title:"Handle exceptions",prompt:"A workflow receives a request, checks required fields, routes it and closes it. What exceptions should be escalated instead of processed automatically?",hint:"Consider missing information, conflicts, urgency and policy."},
  {id:"q3",skill:"Quality assurance",title:"Check an unsupported claim",prompt:"An AI answer is well written but includes a number not present in the source document. How would you assess and handle it?",hint:"Trace claims to evidence."},
  {id:"q4",skill:"Privacy & responsible AI",title:"Protect sensitive data",prompt:"A colleague wants to paste customer names, phone numbers and account details into a public AI tool. What would you advise?",hint:"Consider approved tools, redaction and policy."}
 ]
};
const keywords: Record<string,string[]> = {
 "Excel / spreadsheets":["duplicate","clean","format","missing","validate","check","pivot","formula"],
 SQL:["group by","sum","select","customer","aggregate","query","total"],
 "Data interpretation":["check","possible","orders","revenue","evidence","hypothesis","compare","data"],
 "Business communication":["delay","issue","data","next","update","timeline","manager"],
 "Testing fundamentals":["positive","negative","edge","valid","invalid","boundary","missing"],
 "Web application basics":["console","network","request","response","reproduce","server","inspect"],
 "Automation thinking":["repeat","selector","assert","automate","human","stable","script"],
 "Bug reporting":["steps","expected","actual","invalid","email","reproduce","result"],
 "AI workflow literacy":["verify","source","check","accuracy","evidence","fact","validate"],
 "Process understanding":["missing","exception","escalate","conflict","urgent","policy","manual"],
 "Quality assurance":["source","verify","unsupported","evidence","correct","trace","accuracy"],
 "Privacy & responsible AI":["approved","redact","privacy","sensitive","policy","public","secure"]
};
function demoScore(role:Role, qs:Question[], answers:string[]):Evaluation {
 const skills=qs.map((q,i)=>{const a=answers[i].toLowerCase();const hits=(keywords[q.skill]||["explain","check","example"]).filter(w=>a.includes(w)).length;const score=Math.min(5,Math.max(1,Math.round(Math.min(a.length,350)/350*2+Math.min(hits,3)*1.2)));const target=targets[role][i];return {skill:q.skill,score,target,gap:Math.max(0,target-score),confidence:"low",feedback:score>=4?"Relevant steps and reasoning are present; validate with a practical task.":score>=3?"Some relevant evidence is present. Add concrete steps and checks.":"Add more detail and evidence, then practise with a guided task."};});
 const learningPlan=skills.filter(s=>s.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,3).map(s=>({skill:s.skill,priority:s.gap>=3?"High":s.gap>=2?"Medium":"Build depth",activity:`Practise ${s.skill.toLowerCase()} in a guided role-related exercise and ask a mentor to review your work.`,duration:"1–2 weeks"}));
 return {overallReadiness:Math.round(skills.reduce((n,s)=>n+Math.min(s.score/s.target,1),0)/skills.length*100),skills,learningPlan,summary:"Demo evaluation uses simple answer-length and keyword heuristics. It is not a real AI evaluation or validated proficiency score.",evaluationMode:"demo"};
}
export default function SkillAssessment(){
 const [role,setRole]=useState<Role>("data"),[mode,setMode]=useState<"demo"|"live">("demo"),[learner,setLearner]=useState("Demo Learner 01");
 const [questions,setQuestions]=useState<Question[]>([]),[answers,setAnswers]=useState<Record<string,string>>({}),[result,setResult]=useState<Evaluation|null>(null),[busy,setBusy]=useState(""),[error,setError]=useState("");
 async function generate(){setBusy("generate");setError("");setResult(null);setAnswers({});try{if(mode==="demo")setQuestions(samples[role]);else{const r=await fetch("/api/assessment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"generate",role,learner})});const d=await r.json();if(!r.ok)throw Error(d.error||"Question generation failed.");setQuestions(d.questions);}}catch(e){setError(e instanceof Error?e.message:"Something went wrong.");}finally{setBusy("");}}
 async function evaluate(){setBusy("evaluate");setError("");try{const submitted=questions.map(q=>({questionId:q.id,skill:q.skill,question:q.prompt,answer:(answers[q.id]||"").trim()}));if(submitted.some(a=>!a.answer))throw Error("Please answer every question before evaluating.");let d:Evaluation;if(mode==="demo")d=demoScore(role,questions,submitted.map(a=>a.answer));else{const r=await fetch("/api/assessment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"evaluate",role,learner,questions,answers:submitted})});const body=await r.json();if(!r.ok)throw Error(body.error||"Evaluation failed.");d=body;}setResult(d);}catch(e){setError(e instanceof Error?e.message:"Something went wrong.");}finally{setBusy("");}}
 return <main className="assessment-shell">
  <header className="site-header assessment-header"><Link className="brand" href="/" aria-label="GraminGCC home"><span className="assessment-brand-mark">✳</span><span className="brand-copy"><span className="brand-name">Gramin<span>GCC</span></span><span className="brand-tagline">RURAL TALENT. GLOBAL IMPACT.</span></span></Link><Link href="/" className="portal-home-link">← Back to homepage</Link></header>
  <section className="assessment-hero"><div className="eyebrow"><span className="eyebrow-dot"/> THE READINESS JOURNEY · STEP 02</div><h1>Show what you can do.<br/><span>Discover what to build next.</span></h1><p>Complete a practical, role-specific assessment. See feedback, identify skills to strengthen and get a focused learning plan.</p><div className="assessment-steps"><span>01 · Choose a role</span><span className="active">02 · Demonstrate skills</span><span>03 · Close the gap</span></div></section>
  <div className="assessment-layout"><section className="assessment-panel"><div className="assessment-section-head"><span>01</span><div><h2>Learner and target role</h2><p>Use a demo ID. Do not enter sensitive personal information.</p></div></div>
   <label htmlFor="learner-name">Learner name / demo ID</label><input id="learner-name" value={learner} maxLength={60} onChange={e=>setLearner(e.target.value)}/>
   <label htmlFor="target-role">Target GCC role</label><select id="target-role" value={role} onChange={e=>{setRole(e.target.value as Role);setQuestions([]);setResult(null);setAnswers({});}}>{(Object.keys(roleNames) as Role[]).map(k=><option key={k} value={k}>{roleNames[k]}</option>)}</select>
   <label htmlFor="assessment-mode">Assessment engine</label><select id="assessment-mode" value={mode} onChange={e=>{setMode(e.target.value as "demo"|"live");setQuestions([]);setResult(null);}}><option value="demo">Demo mode — works without API setup</option><option value="live">Live AI mode — requires server API key</option></select>
   <p className="assessment-help">{mode==="demo"?"Sample questions and a simple heuristic evaluator. No AI model is called.":"Live mode generates questions and evaluates answers through the server-side OpenAI API. Configure OPENAI_API_KEY first."}</p>
   <button className="button button-primary assessment-button" onClick={generate} disabled={!!busy}>{busy==="generate"?"Preparing assessment…":"Generate assessment"} <span>→</span></button>{error&&<div role="alert" className="assessment-error">{error}</div>}
  </section><section className="assessment-panel assessment-questions"><div className="assessment-section-head"><span>02</span><div><h2>Demonstrate your skills</h2><p>Answer in your own words and explain your reasoning.</p></div></div>
   {!questions.length?<div className="assessment-empty"><span>⌘</span><b>Your assessment will appear here</b><p>Choose a target role and generate questions to begin.</p></div>:<>{questions.map((q,i)=><div className="assessment-question" key={q.id}><div className="assessment-q-meta"><span>QUESTION {String(i+1).padStart(2,"0")}</span><span>{q.skill}</span></div><h3>{q.title||q.skill}</h3><p>{q.prompt}</p><label htmlFor={"answer-"+q.id}>Your answer</label><textarea id={"answer-"+q.id} rows={4} value={answers[q.id]||""} onChange={e=>setAnswers({...answers,[q.id]:e.target.value})} placeholder="Describe your approach and practical details…"/><p className="assessment-hint">Hint: {q.hint}</p></div>)}<button className="button button-primary assessment-button" onClick={evaluate} disabled={!!busy}>{busy==="evaluate"?"Evaluating answers…":"Evaluate answers & map skill gaps"} <span>→</span></button></>}
  </section></div>
  {result&&<section className="assessment-panel assessment-results" aria-live="polite"><div className="assessment-section-head"><span>03</span><div><h2>Your skill-gap report</h2><p>{learner||"Learner"} · {roleNames[role]}</p></div><span className={"assessment-badge "+(mode==="live"?"live":"")}>{mode==="live"?"AI evaluated":"Demo evaluation"}</span></div>
   <div className="assessment-metrics"><div><small>Readiness indicator</small><strong>{result.overallReadiness}%</strong><span>Against demo role benchmarks</span></div><div><small>Skills assessed</small><strong>{result.skills.length}</strong><span>Evidence reviewed</span></div><div><small>Gaps to work on</small><strong>{result.skills.filter(s=>s.gap>0).length}</strong><span>Prioritised for practice</span></div></div>
   <div className="assessment-skill-list">{result.skills.map(s=><article className="assessment-skill" key={s.skill}><div className="assessment-skill-top"><strong>{s.skill}</strong><span>{s.score}/5 <i>· target {s.target}/5</i></span></div><div className="assessment-bar"><span style={{width:`${Math.max(0,Math.min(100,s.score/5*100))}%`}}/></div><p>{s.feedback}</p><small>Confidence: {s.confidence||"not provided"} · Gap: {s.gap}</small></article>)}</div>
   <h2 className="assessment-plan-title">Your recommended learning path</h2>{result.learningPlan.length?result.learningPlan.map((p,i)=><article className="assessment-plan-item" key={p.skill}><span>{String(i+1).padStart(2,"0")}</span><div><strong>{p.skill} · {p.priority}</strong><p>{p.activity}</p></div><small>{p.duration}</small></article>):<p className="assessment-help">Scores meet the illustrative benchmarks. Validate with a practical task and mentor review.</p>}
   <p className="assessment-disclaimer">{result.summary} Scores are formative indicators, not hiring decisions. A mentor should validate practical ability before placement.</p><button className="button button-primary assessment-button print-button" onClick={()=>window.print()}>Print / save report ↗</button>
  </section>}
  <p className="assessment-privacy">This prototype does not save answers. Live mode sends submitted answers to the configured server and AI provider. Avoid personal or confidential data.</p>
 </main>;
}
