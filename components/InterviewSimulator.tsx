"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Role = "data" | "qa" | "ops";
type InterviewType = "mixed" | "technical" | "behavioural";
type Mode = "demo" | "live";
type Question = { id: string; competency: string; prompt: string; followUp: string; kind?: "technical" | "behavioural" };
type Review = { overallScore: number; summary: string; strengths: string[]; improvements: string[]; answers: { competency: string; score: number; feedback: string; evidence: string }[]; nextPractice: string[]; evaluationMode: string };
type Answer = { transcript: string; videoUrl?: string; audioUrl?: string };
type RecorderBundle = { audio: MediaRecorder; video?: MediaRecorder; audioChunks: Blob[]; videoChunks: Blob[] };

const roleNames: Record<Role, string> = { data: "Junior Data Analyst", qa: "QA / Test Automation Associate", ops: "AI Operations Associate" };
const prompts: Record<Role, Question[]> = {
 data: [
  { id:"d1",competency:"Data quality",kind:"technical",prompt:"You receive a spreadsheet with duplicate customer rows, inconsistent dates and missing region values. What would you check before sharing a report?",followUp:"How would you prove the cleaned data is still accurate?" },
  { id:"d2",competency:"SQL and analysis",kind:"technical",prompt:"A table Orders contains customer_id and amount. Explain how you would calculate total order amount per customer.",followUp:"What would you check if the totals looked unexpectedly high?" },
  { id:"d3",competency:"Business insight",kind:"technical",prompt:"Sales rose 20% this month, but order count fell 10%. Give possible explanations and describe what data you would check next.",followUp:"How would you communicate uncertainty to a stakeholder?" },
  { id:"d4",competency:"Communication",kind:"behavioural",prompt:"Tell me about a time you explained a complex idea or an error to someone unfamiliar with the details. How did you make it clear?",followUp:"What would you do differently next time?" },
  { id:"d5",competency:"Problem solving",kind:"behavioural",prompt:"A report is due in an hour, but the source data has a quality issue. What would you do and what would you tell your manager?",followUp:"How would you balance speed with accuracy?" },
  { id:"d6",competency:"Learning agility",kind:"behavioural",prompt:"Describe how you would learn an unfamiliar reporting tool when a task depends on it.",followUp:"How would you verify that you had learned it correctly?" }
 ],
 qa: [
  { id:"q1",competency:"Test design",kind:"technical",prompt:"A registration form asks for a name, email and password. Describe positive, negative and edge-case tests you would run.",followUp:"Which cases would you automate first, and why?" },
  { id:"q2",competency:"Debugging",kind:"technical",prompt:"A user clicks Submit but sees a spinner forever. Walk through how you would investigate the issue.",followUp:"What evidence would you include in a defect report?" },
  { id:"q3",competency:"Automation strategy",kind:"technical",prompt:"A repeated test takes 20 minutes manually. How would you decide whether to automate it, and what would you verify?",followUp:"What can make an automated test unreliable?" },
  { id:"q4",competency:"Defect communication",kind:"behavioural",prompt:"A developer says a bug you reported cannot be reproduced. How would you handle the conversation?",followUp:"What would you do if you disagreed about severity?" },
  { id:"q5",competency:"Prioritisation",kind:"behavioural",prompt:"You have time to test only three of ten scenarios before a release. How would you prioritise?",followUp:"What risk would you communicate to the release owner?" },
  { id:"q6",competency:"Learning agility",kind:"behavioural",prompt:"Tell me about a time you had to learn a tool or process quickly to solve a problem.",followUp:"How did you verify your solution worked?" }
 ],
 ops: [
  { id:"o1",competency:"AI output validation",kind:"technical",prompt:"An AI assistant writes a fluent case summary but includes a number not present in the source document. What would you do before using it?",followUp:"How would you prevent this issue from recurring?" },
  { id:"o2",competency:"Process judgement",kind:"technical",prompt:"A workflow checks required fields, routes a request and closes it. Which exceptions should be stopped or escalated?",followUp:"What information would you record for a human reviewer?" },
  { id:"o3",competency:"Quality assurance",kind:"technical",prompt:"An AI-generated answer appears correct but cites no evidence. Describe a practical quality-check process.",followUp:"What would make you reject or escalate the output?" },
  { id:"o4",competency:"Privacy and responsible AI",kind:"behavioural",prompt:"A colleague wants to paste customer names and account details into a public AI tool to save time. How would you respond?",followUp:"What safe alternative would you suggest?" },
  { id:"o5",competency:"Ownership",kind:"behavioural",prompt:"An operational checklist was followed, but an important error still reached the next team. What would you do first?",followUp:"How would you improve the process without blaming someone?" },
  { id:"o6",competency:"Communication",kind:"behavioural",prompt:"Explain an AI workflow limitation to a colleague who expects the system to be correct every time.",followUp:"How would you make the guidance easy to follow?" }
 ]
};

function selectQuestions(role: Role, type: InterviewType) {
 const all = prompts[role];
 const picked = type === "mixed" ? [all[0],all[3],all[1],all[4]] : all.filter(q => q.kind === type).slice(0,4);
 return picked.map((q,i) => ({...q,id:`q${i+1}`}));
}

export default function InterviewSimulator() {
 const [role,setRole] = useState<Role>("data");
 const [format,setFormat] = useState<InterviewType>("mixed");
 const [mode,setMode] = useState<Mode>("demo");
 const [stage,setStage] = useState<"setup"|"interview"|"report">("setup");
 const [questions,setQuestions] = useState<Question[]>([]);
 const [index,setIndex] = useState(0);
 const [answers,setAnswers] = useState<Record<string,Answer>>({});
 const [report,setReport] = useState<Review|null>(null);
 const [error,setError] = useState("");
 const [busy,setBusy] = useState("");
 const [cameraEnabled,setCameraEnabled] = useState(true);
 const [mediaReady,setMediaReady] = useState(false);
 const [recording,setRecording] = useState(false);
 const [elapsed,setElapsed] = useState(0);
 const streamRef = useRef<MediaStream|null>(null);
 const videoRef = useRef<HTMLVideoElement|null>(null);
 const recorderRef = useRef<RecorderBundle|null>(null);
 const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);
 const current = questions[index];

 useEffect(() => {
   if (videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current;
 },[mediaReady,cameraEnabled,stage]);

 useEffect(() => () => {
   if(timerRef.current) clearInterval(timerRef.current);
   streamRef.current?.getTracks().forEach(t=>t.stop());
   Object.values(answers).forEach(a=>{ if(a.videoUrl) URL.revokeObjectURL(a.videoUrl); if(a.audioUrl) URL.revokeObjectURL(a.audioUrl); });
 },[]);

 function speak(text:string) {
   if(typeof window === "undefined" || !("speechSynthesis" in window)) return;
   window.speechSynthesis.cancel();
   const utterance = new SpeechSynthesisUtterance(text);
   utterance.lang = "en-IN";
   utterance.rate = 0.92;
   window.speechSynthesis.speak(utterance);
 }

 async function enableMedia() {
   setError("");
   try {
     const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:cameraEnabled});
     streamRef.current?.getTracks().forEach(t=>t.stop());
     streamRef.current = stream;
     setMediaReady(true);
     if(videoRef.current) videoRef.current.srcObject = stream;
   } catch {
     setError("Allow microphone" + (cameraEnabled ? " and camera" : "") + " access in your browser settings. Use HTTPS or localhost. You can switch camera off and try again.");
   }
 }

 function stopTracks() {
   streamRef.current?.getTracks().forEach(t=>t.stop());
   streamRef.current = null;
   setMediaReady(false);
 }

 function beginRecording() {
   const stream = streamRef.current;
   if(!stream) { setError("Enable your microphone and camera first."); return; }
   if(typeof MediaRecorder === "undefined") { setError("This browser does not support recording. Try an up-to-date Chrome or Edge browser."); return; }
   try {
     const audioStream = new MediaStream(stream.getAudioTracks());
     const audioMime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
     const videoMime = MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus") ? "video/webm;codecs=vp8,opus" : "";
     const audio = new MediaRecorder(audioStream,audioMime ? {mimeType:audioMime}:undefined);
     const video = cameraEnabled ? new MediaRecorder(stream,videoMime ? {mimeType:videoMime}:undefined) : undefined;
     const bundle:RecorderBundle = {audio,video,audioChunks:[],videoChunks:[]};
     audio.ondataavailable = e=>{if(e.data.size) bundle.audioChunks.push(e.data);};
     if(video) video.ondataavailable = e=>{if(e.data.size) bundle.videoChunks.push(e.data);};
     recorderRef.current = bundle;
     audio.start(250); video?.start(250);
     setRecording(true); setElapsed(0); setError("");
     timerRef.current = setInterval(()=>setElapsed(v=>v+1),1000);
     speak("You may begin your answer when you are ready.");
   } catch {
     setError("Recording could not start. Check your browser's microphone and camera permissions.");
   }
 }

 async function stopRecording() {
   const bundle = recorderRef.current;
   if(!bundle) return;
   setBusy("transcribe");
   setRecording(false);
   if(timerRef.current) clearInterval(timerRef.current);
   const waitForStop = (recorder:MediaRecorder) => new Promise<void>(resolve => {
     if(recorder.state === "inactive") { resolve(); return; }
     recorder.addEventListener("stop",()=>resolve(),{once:true});
     recorder.stop();
   });
   await Promise.all([waitForStop(bundle.audio),...(bundle.video?[waitForStop(bundle.video)]:[])]);
   const audioBlob = new Blob(bundle.audioChunks,{type:bundle.audio.mimeType || "audio/webm"});
   const videoBlob = bundle.video ? new Blob(bundle.videoChunks,{type:bundle.video.mimeType || "video/webm"}) : null;
   const audioUrl = URL.createObjectURL(audioBlob);
   const videoUrl = videoBlob ? URL.createObjectURL(videoBlob) : undefined;
   let transcript = "";
   try {
     const form = new FormData();
     form.append("file",audioBlob,"answer.webm");
     const response = await fetch("/api/interview/transcribe",{method:"POST",body:form});
     const data = await response.json();
     if(response.ok) transcript = String(data.text || "").trim();
     else if(mode === "live") throw new Error(data.error || "Speech transcription failed.");
   } catch(e) {
     if(mode === "live") {
       URL.revokeObjectURL(audioUrl); if(videoUrl) URL.revokeObjectURL(videoUrl);
       setError(e instanceof Error ? e.message : "Could not transcribe the recording. You can retry or type your answer.");
       setBusy("");
       return;
     }
   }
   setAnswers(prev=>({...prev,[current.id]:{transcript,videoUrl,audioUrl}}));
   setBusy("");
   if(!transcript) setError("Recording saved in this session. If speech transcription is unavailable, type what you said in the answer box below.");
 }

 async function startInterview() {
   setError(""); setBusy("start"); setReport(null); setAnswers({}); setIndex(0);
   try {
     let qs:Question[];
     if(mode==="demo") qs=selectQuestions(role,format);
     else {
       const res=await fetch("/api/interview",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"generate",role,interviewType:format})});
       const data=await res.json(); if(!res.ok) throw new Error(data.error || "Could not prepare questions.");
       qs=data.questions;
     }
     setQuestions(qs); setStage("interview");
   } catch(e) {setError(e instanceof Error?e.message:"Could not start the interview.");}
   finally {setBusy("");}
 }

 async function finish() {
   const transcripts=questions.map(q=>(answers[q.id]?.transcript||"").trim());
   if(transcripts.some(a=>!a)) {setError("Please record and transcribe or type an answer for each question before finishing.");return;}
   setBusy("review"); setError("");
   try {
     let result:Review;
     if(mode==="live") {
       const res=await fetch("/api/interview",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"evaluate",role,interviewType:format,questions,answers:transcripts})});
       const data=await res.json(); if(!res.ok) throw new Error(data.error || "Could not review your answers."); result=data;
     } else {
       const items=questions.map((q,i)=>{const a=transcripts[i];const words=a.split(/\s+/).filter(Boolean);const evidence=/because|for example|first|then|check|verify|measure|result|test|compare|review|communicat/i.test(a);const score=Math.max(1,Math.min(4,(words.length>=65?3:words.length>=25?2:1)+(evidence&&words.length>=25?1:0)));return {competency:q.competency,score,feedback:score>=4?"Good detail. Make the evidence and outcome even more explicit.":score>=3?"Workable approach. Add a concrete example, explain why you chose the steps and state how you would verify the result.":"Add a clear approach, a concrete example and a check or outcome.",evidence:words.length<25?"Brief answer; there is limited evidence to review.":evidence?"Some action or verification language is present; mentor review is still needed.":"Explain your steps, reasoning and how you would check the result."};});
       result={overallScore:Math.round(items.reduce((s,x)=>s+x.score,0)/items.length*20),summary:"Demo practice indicator based on answer length and reasoning cues. It is not an AI evaluation or validated assessment.",strengths:["You completed a role-specific practice round.","Review each answer and keep the parts that are clear and specific."],improvements:["Use concrete examples.","Explain your reasoning and how you would verify the result.","Try Situation → Task → Action → Result (STAR) for experience-based questions."],answers:items,nextPractice:["Repeat your lowest-scoring answer with specific steps.","Practise explaining how you would verify the outcome.","Ask a mentor to review one answer."],evaluationMode:"demo"};
     }
     setReport(result); setStage("report"); stopTracks();
   } catch(e) {setError(e instanceof Error?e.message:"Could not review answers.");}
   finally {setBusy("");}
 }

 function updateTranscript(value:string) { if(!current)return; setAnswers(prev=>({...prev,[current.id]:{...prev[current.id],transcript:value}})); }
 function reset() { stopTracks(); setStage("setup");setQuestions([]);setAnswers({});setIndex(0);setReport(null);setError("");setRecording(false); }

 const question = current;
 return <main className="interview-shell">
  <header className="site-header interview-header"><Link className="brand" href="/" aria-label="GraminGCC home"><span className="interview-brand-mark">✳</span><span className="brand-copy"><span className="brand-name">Gramin<span>GCC</span></span><span className="brand-tagline">RURAL TALENT. GLOBAL IMPACT.</span></span></Link><Link href="/" className="portal-home-link">← Back to homepage</Link></header>
  <section className="interview-hero"><div className="eyebrow"><span className="eyebrow-dot"/> TALENT READINESS · SPEAK & PRACTISE</div><h1>Practise out loud.<br/><span>Build confidence on camera.</span></h1><p>Hear interview questions, answer using your microphone, and optionally record video for playback. Get structured practice feedback and next steps.</p><div className="interview-step-pills"><span>01 · Prepare</span><span className="active">02 · Audio / video</span><span>03 · Reflect</span></div></section>

  {stage==="setup"&&<section className="interview-card interview-setup"><div className="interview-card-heading"><span>01</span><div><h2>Set up your interview</h2><p>Choose your target role and interview style.</p></div></div><div className="interview-form-grid">
   <div><label htmlFor="av-role">Target role</label><select id="av-role" value={role} onChange={e=>setRole(e.target.value as Role)}><option value="data">Junior Data Analyst</option><option value="qa">QA / Test Automation Associate</option><option value="ops">AI Operations Associate</option></select></div>
   <div><label htmlFor="av-format">Interview format</label><select id="av-format" value={format} onChange={e=>setFormat(e.target.value as InterviewType)}><option value="mixed">Mixed — recommended</option><option value="technical">Technical / work scenarios</option><option value="behavioural">Behavioural & situational</option></select></div>
   <div className="interview-form-wide"><label htmlFor="av-mode">Feedback engine</label><select id="av-mode" value={mode} onChange={e=>setMode(e.target.value as Mode)}><option value="demo">Demo mode — prepared questions and practice cues</option><option value="live">Live AI — generated questions and rubric feedback</option></select><p className="interview-help">{mode==="demo"?"Demo mode works without an AI key. Speech transcription requires the server API key; if unavailable, type your answer after recording.":"Live AI mode requires OPENAI_API_KEY on the server for questions, transcription and feedback."}</p></div>
   <div className="interview-form-wide"><label className="interview-checkbox-label"><input type="checkbox" checked={cameraEnabled} onChange={e=>{stopTracks();setCameraEnabled(e.target.checked);setMediaReady(false);}}/> Include camera video (optional)</label><p className="interview-help">Your video is kept in this browser session for playback; it is not uploaded to the AI reviewer. Audio is sent for transcription when configured. Nothing is saved to your GraminGCC profile in this prototype.</p></div>
  </div><div className="interview-notice"><strong>Privacy first.</strong> Use a quiet place. Allow microphone/camera permissions only when ready. Avoid recording confidential information. This is practice feedback, not a hiring decision.</div>{error&&<div className="interview-error" role="alert">{error}</div>}<button className="button button-primary interview-primary-button" onClick={async()=>{await enableMedia();}}>{mediaReady?"Refresh microphone / camera permissions":"Enable microphone"+(cameraEnabled?" & camera":"")} →</button><div className="interview-media-preview"><video ref={videoRef} autoPlay muted playsInline aria-label="Your camera preview" className={cameraEnabled?"":"interview-video-hidden"}/>{!cameraEnabled&&<p>Camera is off. Audio-only practice is selected.</p>}<span className={mediaReady?"interview-media-status ready":"interview-media-status"}>{mediaReady?"Devices ready":"Waiting for device permission"}</span></div><button className="button button-primary interview-primary-button" onClick={startInterview} disabled={!!busy}>{busy==="start"?"Preparing questions…":"Start audio / video interview →"}</button></section>}

  {stage==="interview"&&question&&<section className="interview-card interview-question-card"><div className="interview-progress-top"><span>QUESTION {String(index+1).padStart(2,"0")} OF {String(questions.length).padStart(2,"0")}</span><span>{roleNames[role]}</span></div><div className="interview-progress-bar"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div><div className="interview-card-heading"><span>{String(index+1).padStart(2,"0")}</span><div><h2>{question.competency}</h2><p>Listen to the question, then record your response in your own words.</p></div></div><div className="interview-prompt"><span>YOUR INTERVIEWER ASKS</span><p>{question.prompt}</p><button className="interview-secondary-button" onClick={()=>speak(question.prompt)}>▶ Hear question again</button><details><summary>Possible follow-up</summary><p>{question.followUp}</p><button className="interview-secondary-button" onClick={()=>speak(question.followUp)}>▶ Hear follow-up</button></details></div><div className="interview-record-layout"><div className="interview-live-preview"><video ref={videoRef} autoPlay muted playsInline className={cameraEnabled?"":"interview-video-hidden"} aria-label="Live camera preview"/>{!cameraEnabled&&<div className="interview-audio-only">🎙<span>Audio-only mode</span></div>}<span className={recording?"interview-media-status recording":"interview-media-status"}>{recording?"● Recording · "+String(Math.floor(elapsed/60)).padStart(2,"0")+":"+String(elapsed%60).padStart(2,"0"):"Camera / microphone preview"}</span></div><div className="interview-record-controls"><p>{recording?"Speak naturally. Select Stop when you finish.":"Record your answer when you are ready."}</p>{!recording?<button className="button button-primary interview-next-button" onClick={beginRecording} disabled={!mediaReady||!!busy}>● Start recording</button>:<button className="interview-secondary-button" onClick={stopRecording} disabled={!!busy}>{busy==="transcribe"?"Processing recording…":"■ Stop & transcribe"}</button>}<p className="interview-help">Your video clip remains local to this session. Speech transcription may need the live API configuration.</p></div></div><label htmlFor="av-answer">Transcript / answer (edit if needed)</label><textarea id="av-answer" value={answers[question.id]?.transcript||""} onChange={e=>updateTranscript(e.target.value)} placeholder="Your transcribed answer appears here. You can also type or correct it…" rows={6}/>{answers[question.id]?.videoUrl&&<div className="interview-playback"><label>Recorded answer preview</label><video controls playsInline src={answers[question.id].videoUrl} className="interview-recorded-video"/></div>}{answers[question.id]?.audioUrl&&<audio controls src={answers[question.id].audioUrl} className="interview-audio-playback"/>}{error&&<div className="interview-error" role="alert">{error}</div>}<div className="interview-question-actions"><button className="interview-secondary-button" onClick={()=>{setError("");setIndex(Math.max(0,index-1));}} disabled={index===0||!!busy}>← Previous</button>{index<questions.length-1?<button className="button button-primary interview-next-button" onClick={()=>{if(!(answers[question.id]?.transcript||"").trim()){setError("Record and transcribe, or type an answer before continuing.");return;}setError("");setIndex(index+1);}} disabled={!!busy}>Next question →</button>:<button className="button button-primary interview-next-button" onClick={finish} disabled={!!busy}>{busy==="review"?"Reviewing answers…":"Finish & get feedback →"}</button>}</div></section>}

  {stage==="report"&&report&&<section className="interview-card interview-report" aria-live="polite"><div className="interview-report-heading"><div><div className="eyebrow">YOUR PRACTICE REVIEW</div><h2>Learn from this round.</h2><p>{roleNames[role]} · {format} interview</p></div><span className={`interview-mode-badge ${report.evaluationMode==="live-ai"?"live":""}`}>{report.evaluationMode==="live-ai"?"AI feedback":"Demo feedback"}</span></div><div className="interview-score-row"><div className="interview-score"><strong>{report.overallScore}</strong><span>/ 100</span></div><div><h3>Practice indicator</h3><p>{report.summary}</p></div></div><div className="interview-report-grid"><div className="interview-report-panel"><h3>What went well</h3><ul>{report.strengths.map((x,i)=><li key={i}>{x}</li>)}</ul></div><div className="interview-report-panel"><h3>What to strengthen</h3><ul>{report.improvements.map((x,i)=><li key={i}>{x}</li>)}</ul></div></div><h3 className="interview-subheading">Question-by-question feedback</h3><div className="interview-answer-review">{report.answers.map((x,i)=><article key={i}><div className="interview-answer-review-top"><strong>{i+1}. {x.competency}</strong><span>{x.score}/5</span></div><p>{x.feedback}</p><small>{x.evidence}</small></article>)}</div><h3 className="interview-subheading">Next practice steps</h3><ol className="interview-next-steps">{report.nextPractice.map((x,i)=><li key={i}>{x}</li>)}</ol><p className="interview-disclaimer">This is a learning tool, not a validated psychometric assessment, official qualification or hiring recommendation. Video is not analysed for appearance, accent or personality. Ask a mentor to validate practical skills.</p><div className="interview-question-actions"><button className="interview-secondary-button" onClick={reset}>Start another round</button><button className="button button-primary interview-next-button" onClick={()=>window.print()}>Print / save feedback ↗</button></div></section>}
  <footer className="interview-footer"><span>GRAMINGCC · TALENT READINESS</span><span>Practise with purpose. Grow with evidence.</span></footer>
 </main>;
}
