"use client";
import { getMatches, Match } from "../services/matchService";

interface MatchListProps {
  favoriteTeams: string[];
}

export default function MatchList({ favoriteTeams }: MatchListProps) {
  const matches: Match[] = getMatches();
  const now = new Date();

  // ✅ If no favorites selected, show all matches
  const visibleMatches =
    favoriteTeams.length > 0
      ? matches.filter(
          (m) => favoriteTeams.includes(m.home) || favoriteTeams.includes(m.away)
        )
      : matches;

  const pastMatches = visibleMatches.filter((m) => new Date(m.date) < now);
  const upcomingMatches = visibleMatches.filter((m) => new Date(m.date) >= now);

  const renderMatch = (m: Match) => (
    <li
      key={m.id}
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "15px 18px",
        marginBottom: "14px",
        backgroundColor: "#fafafa",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        listStyle: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.02)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      <div style={{ fontWeight: "600", marginBottom: "6px" }}>
        <span style={{ color: "#0d47a1" }}>{m.home}</span> vs{" "}
        <span style={{ color: "#b71c1c" }}>{m.away}</span>
      </div>
      <div style={{ color: "#444" }}>📅 Date: {m.date}</div>
      <div style={{ color: "#444" }}>
        ⚽ Score: {m.score ?? "Not yet played"}
      </div>
    </li>
  );

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "14px",
        marginTop: "30px",
        backgroundColor: "rgba(255,255,255,0.97)",
      }}
    >
      {/* Past Matches */}
      <h2
        style={{
          color: "#555",
          borderBottom: "3px solid #1976d2",
          paddingBottom: "5px",
          marginBottom: "15px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Past Matches
      </h2>
      {pastMatches.length === 0 ? (
        <p style={{ color: "#777", marginBottom: "20px" }}>
          No past matches available.
        </p>
      ) : (
        <ul style={{ padding: 0, marginBottom: "30px" }}>
          {pastMatches.map(renderMatch)}
        </ul>
      )}

      {/* Upcoming Matches */}
      <h2
        style={{
          color: "#1565c0",
          borderBottom: "3px solid #1976d2",
          paddingBottom: "5px",
          marginBottom: "15px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Upcoming Matches
      </h2>
      {upcomingMatches.length === 0 ? (
        <p style={{ color: "#777" }}>No upcoming matches available.</p>
      ) : (
        <ul style={{ padding: 0 }}>{upcomingMatches.map(renderMatch)}</ul>
      )}
    </div>
  );
}
