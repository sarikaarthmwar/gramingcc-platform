import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "Speech transcription is not configured. Type your answer manually or add OPENAI_API_KEY to the server environment." }, { status: 503, headers: { "Cache-Control": "no-store" } });
    }
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Upload an audio recording to transcribe." }, { status: 400 });
    if (!file.size) return NextResponse.json({ error: "The recording is empty. Please record your answer again." }, { status: 400 });
    if (file.size > 20 * 1024 * 1024) return NextResponse.json({ error: "The recording is over the 20 MB limit. Please record a shorter answer." }, { status: 413 });
    if (!file.type.startsWith("audio/")) return NextResponse.json({ error: "Only audio recordings are accepted for transcription." }, { status: 415 });

    const upstream = new FormData();
    upstream.append("file", file, file.name || "answer.webm");
    upstream.append("model", process.env.OPENAI_TRANSCRIPTION_MODEL || "gpt-4o-mini-transcribe");
    upstream.append("language", "en");
    upstream.append("prompt", "Transcribe an interview practice answer in English. Preserve the speaker's words and technical terms; do not summarise or evaluate.");
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: upstream,
      cache: "no-store"
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = typeof data?.error?.message === "string" ? data.error.message.slice(0, 250) : "Speech transcription failed.";
      return NextResponse.json({ error: message }, { status: response.status === 429 ? 429 : 502, headers: { "Cache-Control": "no-store" } });
    }
    const text = typeof data.text === "string" ? data.text.trim() : "";
    if (!text) return NextResponse.json({ error: "No speech was detected. Try again in a quieter place or type your answer." }, { status: 422 });
    return NextResponse.json({ text }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not process the recording. Please retry or type your answer." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
