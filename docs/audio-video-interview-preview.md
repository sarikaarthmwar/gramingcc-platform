# Audio/video interview simulator preview

Preview branch: `preview/audio-video-interview`

Route: `/talent/interview`

This branch is for previewing the in-progress browser-based audio/video interview simulator. It includes spoken question playback, microphone recording, optional webcam recording and local playback, editable transcripts, and optional server-side transcription / live AI feedback.

## Preview configuration

- The demo question flow can be explored without an AI key.
- For speech transcription and live AI question generation / feedback, configure `OPENAI_API_KEY` as a server-side Vercel environment variable.
- Optionally set `OPENAI_MODEL` and `OPENAI_TRANSCRIPTION_MODEL`.
- Browser camera/microphone access requires HTTPS and explicit permission.
- Webcam clips remain in the browser session; the audio recording is sent to the server-side transcription endpoint only when transcription is configured.
- This is a learning prototype, not a hiring decision or official qualification.

## Validation checklist

- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Test camera-on and camera-off flows
- [ ] Test recorded audio/video playback
- [ ] Test transcription without an API key (manual transcript fallback)
- [ ] Test live AI generation and feedback with server configuration
