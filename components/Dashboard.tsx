"use client";
import Link from "next/link";
import { useMemo } from "react";
import TeamSelector from "@components/TeamSelector";
import MatchList from "@components/MatchList";
import { saveFavorites, UserProfile } from "@services/authService";
import { getTeamById } from "@services/teamService";

interface DashboardProps {
  user: UserProfile;
  onUserUpdate: (updated: UserProfile) => void;
  onLogout: () => void;
}

export default function Dashboard({ user, onUserUpdate, onLogout }: DashboardProps) {
  const favoriteTeams = useMemo(
    () =>
      user.favorites
        .map((teamId) => getTeamById(teamId))
        .filter((team): team is NonNullable<typeof team> => Boolean(team)),
    [user.favorites]
  );

  const handleFavoritesSave = (teamIds: number[]) => {
    const updated = saveFavorites(user.email, teamIds);
    if (updated) {
      onUserUpdate(updated);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
        display: "grid",
        gap: "28px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px",
          borderRadius: "20px",
          background: "linear-gradient(120deg, #1d4ed8, #0ea5e9)",
          color: "#fff",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Welcome back</h1>
          <p style={{ marginTop: "4px", fontSize: "0.95rem", opacity: 0.9 }}>{user.email}</p>
        </div>
        <button
          onClick={onLogout}
          style={{
            border: "none",
            borderRadius: "999px",
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
          }}
        >
          Logout
        </button>
      </header>

      <TeamSelector selectedFavorites={user.favorites} onSave={handleFavoritesSave} />

      <section
        style={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          background: "#fff",
          padding: "24px",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>Favorite teams</h2>
        {favoriteTeams.length === 0 ? (
          <p style={{ color: "#475569", marginTop: "12px" }}>
            Save at least one team to start tracking updates.
          </p>
        ) : (
          <ul style={{ marginTop: "16px", display: "grid", gap: "12px", padding: 0 }}>
            {favoriteTeams.map((team) => (
              <li key={team.id} style={{ listStyle: "none" }}>
                <Link
                  href={`/teams/${team.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    textDecoration: "none",
                    color: "#0f172a",
                  }}
                >
                  <span>{team.name}</span>
                  <span style={{ color: "#1d4ed8", fontWeight: 600 }}>{team.league}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <MatchList favoriteTeamIds={user.favorites} />
    </div>
  );
}
