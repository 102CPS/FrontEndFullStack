"use client";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTeamById } from "@services/teamService";
import { getUpcomingMatchesForTeam, Match } from "@services/matchService";

const pageStyles: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 24px",
  background: "linear-gradient(180deg, #0f172a, #1d4ed8)",
};

const cardStyles: CSSProperties = {
  width: "100%",
  maxWidth: "720px",
  borderRadius: "24px",
  padding: "36px",
  background: "#ffffff",
  boxShadow: "0 20px 44px rgba(15, 23, 42, 0.25)",
  display: "grid",
  gap: "24px",
};

const statBadgeStyles: CSSProperties = {
  borderRadius: "16px",
  padding: "16px",
  background: "#f1f5f9",
  textAlign: "center",
};

export default function TeamDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const teamId = Number(params?.id);
  const team = useMemo(() => getTeamById(teamId), [teamId]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (!team) return;
    const loadMatches = () => {
      setUpcomingMatches(getUpcomingMatchesForTeam(team.id));
    };
    loadMatches();
    const interval = setInterval(loadMatches, 30000);
    return () => clearInterval(interval);
  }, [team]);

  if (!team) {
    return (
      <div style={pageStyles}>
        <div style={cardStyles}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0f172a" }}>Team not found</h1>
          <button
            onClick={() => router.push("/")}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "12px 18px",
              background: "#1d4ed8",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const { wins, draws, losses } = team.performance;

  return (
    <div style={pageStyles}>
      <div style={cardStyles}>
        <div>
          <button
            onClick={() => router.push("/")}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "10px 18px",
              background: "#1d4ed8",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "18px",
            }}
          >
            Back
          </button>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a" }}>{team.name}</h1>
          <p style={{ color: "#475569", marginTop: "8px" }}>
            {team.league} · {team.country}
          </p>
        </div>

        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>Performance</h2>
          <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(3, 1fr)", marginTop: "16px" }}>
            <div style={statBadgeStyles}>
              <span style={{ fontSize: "2rem", fontWeight: 700, color: "#16a34a" }}>{wins}</span>
              <p style={{ marginTop: "4px", color: "#64748b" }}>Wins</p>
            </div>
            <div style={statBadgeStyles}>
              <span style={{ fontSize: "2rem", fontWeight: 700, color: "#f59e0b" }}>{draws}</span>
              <p style={{ marginTop: "4px", color: "#64748b" }}>Draws</p>
            </div>
            <div style={statBadgeStyles}>
              <span style={{ fontSize: "2rem", fontWeight: 700, color: "#dc2626" }}>{losses}</span>
              <p style={{ marginTop: "4px", color: "#64748b" }}>Losses</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>Upcoming fixtures</h2>
          {upcomingMatches.length === 0 ? (
            <p style={{ color: "#64748b", marginTop: "8px" }}>No upcoming fixtures scheduled.</p>
          ) : (
            <ul style={{ marginTop: "16px", padding: 0, display: "grid", gap: "12px" }}>
              {upcomingMatches.map((match) => {
                const opponentId = match.homeTeamId === team.id ? match.awayTeamId : match.homeTeamId;
                const opponent = getTeamById(opponentId);
                return (
                  <li
                    key={match.id}
                    style={{
                      listStyle: "none",
                      padding: "16px",
                      borderRadius: "14px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "grid",
                      gap: "6px",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>
                      vs {opponent?.name ?? "TBD"}
                    </span>
                    <span style={{ color: "#475569" }}>
                      {new Date(match.date).toLocaleString(undefined, {
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
