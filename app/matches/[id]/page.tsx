"use client";
import { useMemo, type CSSProperties } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMatchById } from "@services/matchService";
import { getTeamById } from "@services/teamService";

const containerStyles: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 24px",
  background: "linear-gradient(160deg, #0f172a, #1d4ed8)",
};

const cardStyles: CSSProperties = {
  width: "100%",
  maxWidth: "640px",
  borderRadius: "24px",
  padding: "32px",
  background: "#ffffff",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.2)",
  display: "grid",
  gap: "22px",
};

export default function MatchDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const matchId = Number(params?.id);

  const match = useMemo(() => getMatchById(matchId), [matchId]);

  const homeTeam = match ? getTeamById(match.homeTeamId) : null;
  const awayTeam = match ? getTeamById(match.awayTeamId) : null;

  if (!match || !homeTeam || !awayTeam) {
    return (
      <div style={containerStyles}>
        <div style={cardStyles}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0f172a" }}>Match not found</h1>
          <button
            onClick={() => router.push("/")}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "12px 16px",
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

  const formatScore = match.score ? `${match.score.home} - ${match.score.away}` : "TBD";

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a" }}>
            {homeTeam.name} vs {awayTeam.name}
          </h1>
          <p style={{ color: "#475569", marginTop: "6px" }}>
            {new Date(match.date).toLocaleString(undefined, {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p style={{ fontSize: "1.6rem", fontWeight: 700, marginTop: "12px", color: "#1d4ed8" }}>
            Result: {formatScore}
          </p>
        </div>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a" }}>Goals</h2>
          {match.stats?.goals.length ? (
            <ul style={{ marginTop: "10px", display: "grid", gap: "8px", padding: 0 }}>
              {match.stats?.goals.map((goal, index) => {
                const team = getTeamById(goal.teamId);
                return (
                  <li key={`${goal.player}-${index}`} style={{ listStyle: "none", color: "#1e293b" }}>
                    {goal.player} ({team?.name}) — {goal.minute}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p style={{ color: "#64748b", marginTop: "6px" }}>No goals recorded.</p>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a" }}>Assists</h2>
          {match.stats?.assists.length ? (
            <ul style={{ marginTop: "10px", display: "grid", gap: "8px", padding: 0 }}>
              {match.stats?.assists.map((assist, index) => {
                const team = getTeamById(assist.teamId);
                return (
                  <li key={`${assist.player}-${index}`} style={{ listStyle: "none", color: "#1e293b" }}>
                    {assist.player} ({team?.name}) — {assist.minute}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p style={{ color: "#64748b", marginTop: "6px" }}>No assists recorded.</p>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a" }}>Cards</h2>
          {match.stats?.cards.length ? (
            <ul style={{ marginTop: "10px", display: "grid", gap: "8px", padding: 0 }}>
              {match.stats?.cards.map((card, index) => {
                const team = getTeamById(card.teamId);
                return (
                  <li key={`${card.player}-${index}`} style={{ listStyle: "none", color: "#1e293b" }}>
                    {card.player} ({team?.name}) — {card.minute} {card.type.toUpperCase()}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p style={{ color: "#64748b", marginTop: "6px" }}>No cards shown.</p>
          )}
        </section>

        <button
          onClick={() => router.push("/")}
          style={{
            justifySelf: "start",
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            background: "#1d4ed8",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
