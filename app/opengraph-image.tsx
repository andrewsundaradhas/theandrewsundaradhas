import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Andrew Sundaradhas — AI/ML Engineer & Robotics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#dceeff",
          padding: 80,
          border: "16px solid #000000",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 999,
              backgroundColor: "#4da2ff",
              border: "4px solid #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#000000",
            }}
          >
            AS
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#000000",
              border: "3px solid #000000",
              borderRadius: 999,
              padding: "12px 24px",
              backgroundColor: "#ffffff",
            }}
          >
            VIT Chennai · 2027
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 130,
              fontWeight: 800,
              lineHeight: 0.85,
              color: "#000000",
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            Andrew
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 800,
              lineHeight: 0.85,
              color: "#000000",
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            Sundaradhas
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#000000" }}>
            AI/ML · Robotics · Drone Systems
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#ffffff",
              backgroundColor: "#000000",
              borderRadius: 999,
              padding: "14px 28px",
            }}
          >
            andrewsundaradhas.dev
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
