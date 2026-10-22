import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const roles = {
 data: { name:"Junior Data Analyst", skills:["Excel / spreadsheets","SQL","Data interpretation","Business communication"], targets:[4,3,4,4] },
 qa: { name:"QA / Test Automation Associate", skills:["Testing fundamentals","Web application basics","Automation thinking","Bug reporting"], targets:[4,3,3,4] },
 ops: { name:"AI Operations Associate", skills:["AI workflow literacy","Process understanding","Quality assurance","Privacy & responsible AI"], targets:[4,4,4,4] }
} as const;
type RoleKey = keyof typeof roles;
function error(message:string,status=400){return NextResponse.json({error:message},{status,headers:{"Cache-Control":"no-store"}});}
async function callModel(instructions:string,input:unknown){
 const key=process.env.OPENAI_API_KEY;
 if(!key)throw new Error("Live AI is not configured. Add OPENAI_API_KEY to the server environment, or switch to Demo mode.");
 const response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4.1-mini",instructions,input:JSON.stringify(input),text:{format:{type:"json_object"}},store:false}),cache:"no-store"});
 const payload=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(payload?.error?.message||`OpenAI API returned HTTP ${response.status}`);
 const output=(payload.output||[]).flatMap((item:{content?:Array<{type?:string;text?:string}>})=>item.content||[]).filter((item:{type?:string})=>item.type==="output_text").map((item:{text?:string})=>item.text||"").join("\n");
 if(!output)throw new Error("The model returned no structured output.");
 try{return JSON.parse(output) as Record<string,unknown>;}catch{throw new Error("The model response was not valid JSON. Please retry.");}
}
export async function POST(request:Request){
 try{
  const body=await request.json();const role=body?.role as RoleKey;const spec=roles[role];if(!spec)return error("Choose a supported target role.");
  if(body.action==="generate"){
   const data=await callModel("Design fair, accessible entry-level work-skill assessments. Return JSON only. Create exactly four practical role-relevant questions in plain English, including at least one realistic scenario. Each question tests observable ability, not personal background. Use only supplied skill names. Do not include answers or grading keys, use protected traits, or make hiring recommendations. Each object: id q1-q4, skill, title, prompt, hint.",{role:spec.name,skills:spec.skills,learnerLabel:String(body.learner||"Learner").slice(0,60)});
   if(!Array.isArray(data.questions)||data.questions.length<4)return error("The model did not return a complete assessment. Retry.",502);
   const qs=(data.questions as Array<Record<string,unknown>>).slice(0,4).map((q,i)=>({id:`q${i+1}`,skill:spec.skills.includes(String(q.skill) as never)?String(q.skill):spec.skills[i],title:String(q.title||`Question ${i+1}`).slice(0,120),prompt:String(q.prompt||"").slice(0,1800),hint:String(q.hint||"Explain your reasoning and practical steps.").slice(0,400)}));
   if(qs.some(q=>!q.prompt))return error("The model returned an incomplete question. Retry.",502);
   return NextResponse.json({questions:qs},{headers:{"Cache-Control":"no-store"}});
  }
  if(body.action==="evaluate"){
   if(!Array.isArray(body.answers)||body.answers.length!==4)return error("Submit all four answers before evaluation.");
   const answers=(body.answers as Array<Record<string,unknown>>).map(a=>({skill:spec.skills.includes(String(a.skill) as never)?String(a.skill):spec.skills[0],question:String(a.question||"").slice(0,1800),answer:String(a.answer||"").slice(0,5000)}));
   if(answers.some(a=>!a.answer.trim()))return error("Answer every question before evaluation.");
   const data=await callModel("Evaluate entry-level skills for learning, not automated hiring. Return JSON only. Score each supplied skill 0-5 based on answer evidence, not fluency, accent, grammar perfection, identity or demographic assumptions. Rubric: 0 no evidence; 1 minimal/mostly incorrect; 2 partial with important omissions; 3 mostly correct with gaps; 4 correct, practical and reasonably complete; 5 accurate, thorough and independently actionable. Be conservative. Explain evidence, missing elements and next improvement. Confidence low/medium/high. Ambiguous answers require low confidence and practical validation. Provide up to three learning activities for the largest gaps. State this is not a validated psychometric or hiring assessment. JSON: {skills:[{skill,score,feedback,confidence}],summary,learningPlan:[{skill,priority,activity,duration}]}.",{role:spec.name,skills:spec.skills.map((skill,i)=>({skill,target:spec.targets[i]})),answers});
   const returned=Array.isArray(data.skills)?data.skills as Array<Record<string,unknown>>:[];
   const skills=spec.skills.map((skill,i)=>{const item=returned.find(s=>s.skill===skill)||{};const n=Number(item.score),score=Number.isFinite(n)?Math.max(0,Math.min(5,Math.round(n))):0,target=spec.targets[i];const confidence=["low","medium","high"].includes(String(item.confidence))?String(item.confidence):"low";return {skill,score,target,gap:Math.max(0,target-score),feedback:String(item.feedback||"Insufficient evidence; validate with a practical task.").slice(0,900),confidence};});
   const overallReadiness=Math.round(skills.reduce((n,s)=>n+Math.min(s.score/s.target,1),0)/skills.length*100);
   const learningPlan=(Array.isArray(data.learningPlan)?data.learningPlan as Array<Record<string,unknown>>:[]).filter(p=>spec.skills.includes(String(p.skill) as never)).slice(0,3).map(p=>({skill:String(p.skill),priority:["High","Medium","Low"].includes(String(p.priority))?String(p.priority):"Focus area",activity:String(p.activity||"Complete a guided practical exercise and request mentor feedback.").slice(0,700),duration:String(p.duration||"1–2 weeks").slice(0,40)}));
   return NextResponse.json({overallReadiness,skills,learningPlan,summary:String(data.summary||"AI-generated formative feedback only. Validate skills through practical tasks and human review.").slice(0,700),evaluationMode:"live-ai"},{headers:{"Cache-Control":"no-store"}});
  }
  return error("Unsupported action. Use generate or evaluate.");
 }catch(e){console.error("GraminGCC assessment API error:",e instanceof Error?e.message:"Unknown error");return error(e instanceof Error?e.message:"Assessment service failed.",500);}
}
