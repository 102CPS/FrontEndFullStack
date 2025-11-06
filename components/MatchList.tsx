"use client";
import Link from "next/link";
import { useMemo } from "react";
import { getMatchesForTeams, Match } from "@services/matchService";
import { getTeamById } from "@services/teamService";

interface MatchListProps {
  favoriteTeamIds: number[];
}

const formatScore = (match: Match) => {
  if (!match.score) return "TBD";
  return `${match.score.home} - ${match.score.away}`;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function MatchList({ favoriteTeamIds }: MatchListProps) {
  const matches = useMemo(() => getMatchesForTeams(favoriteTeamIds), [favoriteTeamIds]);

  const pastMatches = matches.filter((match) => match.status === "finished");
  const upcomingMatches = matches.filter((match) => match.status === "scheduled");

  const renderRow = (match: Match) => {
    const homeTeam = getTeamById(match.homeTeamId);
    const awayTeam = getTeamById(match.awayTeamId);
    return (
      <li key={match.id} style={{ listStyle: "none" }}>
        <Link
          href={`/matches/${match.id}`}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: "16px",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            textDecoration: "none",
            color: "inherit",
            background: "#f9fafb",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
            <span>{homeTeam?.name}</span>
            <span style={{ color: "#2563eb" }}>{formatScore(match)}</span>
            <span>{awayTeam?.name}</span>
          </div>
          <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>{formatDate(match.date)}</div>
        </Link>
      </li>
    );
  };

  return (
    <section
      style={{
        marginTop: "24px",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        padding: "24px",
        background: "#ffffff",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      <header style={{ marginBottom: "18px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}>My matches</h2>
        <p style={{ color: "#475569" }}>
          Only fixtures for your saved favorites are shown. Click a match to see detailed
          statistics.
        </p>
      </header>

      {matches.length === 0 ? (
        <p style={{ color: "#6b7280", fontWeight: 500 }}>No matches available.</p>
      ) : (
        <div style={{ display: "grid", gap: "22px" }}>
          <div>
            <h3 style={{ color: "#1d4ed8", marginBottom: "12px" }}>Upcoming</h3>
            {upcomingMatches.length === 0 ? (
              <p style={{ color: "#6b7280" }}>No upcoming matches.</p>
            ) : (
              <ul style={{ padding: 0, display: "grid", gap: "12px" }}>
                {upcomingMatches.map(renderRow)}
              </ul>
            )}
          </div>

          <div>
            <h3 style={{ color: "#047857", marginBottom: "12px" }}>Results</h3>
            {pastMatches.length === 0 ? (
              <p style={{ color: "#6b7280" }}>No results to show yet.</p>
            ) : (
              <ul style={{ padding: 0, display: "grid", gap: "12px" }}>
                {pastMatches.map(renderRow)}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
