import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GraminGCC — Rural Talent. Global Impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 72px",
          background: "linear-gradient(125deg, #f7f5eb 0%, #edf3e7 58%, #dcebe0 100%)",
          color: "#123e33",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -90, top: -180, width: 590, height: 590, borderRadius: 295, border: "1px solid rgba(18,62,51,0.12)", display: "flex" }} />
        <div style={{ position: "absolute", right: 0, top: -85, width: 400, height: 400, borderRadius: 200, border: "1px solid rgba(18,62,51,0.12)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 68, height: 68, borderRadius: 18, background: "#123e33", display: "flex", alignItems: "center", justifyContent: "center", color: "#f4d58a", fontSize: 30, fontWeight: 800 }}>
            G
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 31, fontWeight: 800, letterSpacing: "-1px" }}>GraminGCC</div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "3px", marginTop: 5, color: "#527568" }}>RURAL TALENT. GLOBAL IMPACT.</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 930, marginTop: 8 }}>
          <div style={{ fontSize: 68, lineHeight: 1.08, fontWeight: 800, letterSpacing: "-3px" }}>Talent is everywhere.</div>
          <div style={{ fontSize: 68, lineHeight: 1.08, fontWeight: 800, letterSpacing: "-3px", color: "#d36f3f" }}>Readiness is the bridge.</div>
          <div style={{ fontSize: 25, lineHeight: 1.45, color: "#45665a", marginTop: 24, maxWidth: 820 }}>
            Connecting real GCC demand with talent through skill mapping, focused preparation and evidence of readiness.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 16, fontWeight: 700, letterSpacing: "2px", color: "#527568" }}>
          <div style={{ width: 42, height: 4, background: "#d36f3f", borderRadius: 2 }} />
          DEMAND-LED · SKILL-BASED · READY FOR GLOBAL WORK
        </div>
      </div>
    ),
    { ...size }
  );
}
