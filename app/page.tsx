"use client";
import { useState } from "react";
import TeamSelector from "@components/TeamSelector";
import MatchList from "@components/MatchList";

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(160deg, #1b5e20 0%, #00c853 100%)", // ⚽ turf-like background
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
          padding: "16px 36px",
          borderRadius: "50px",
          background: "linear-gradient(145deg, #f8fdfb 0%, #eaf6ef 100%)",
          boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(6px)",
        }}
      >
        <img
          src="/logo.png"
          alt="FootTrack Logo"
          width={70}
          height={70}
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.25))",
          }}
        />
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: "800",
            letterSpacing: "0.5px",
            background: "linear-gradient(90deg, #007bff, #00b894)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Rajdhani', 'Poppins', sans-serif",
            textShadow: "0 2px 5px rgba(0,0,0,0.15)",
          }}
        >
          FootTrack
        </h1>
      </div>

      {/* Main Content */}
      <main
        style={{
          width: "100%",
          maxWidth: "650px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "18px",
          padding: "30px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
          backdropFilter: "blur(6px)",
        }}
      >
        <TeamSelector onSave={setFavorites} />
        <MatchList favoriteTeams={favorites} />
      </main>
    </div>
  );
}
