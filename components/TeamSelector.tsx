"use client";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { getTeams } from "@services/teamService";

interface TeamSelectorProps {
  selectedFavorites: number[];
  onSave: (selected: number[]) => void;
}

const checkboxStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.75rem",
  borderRadius: "10px",
  border: "1px solid #d1d9e6",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
};

export default function TeamSelector({ selectedFavorites, onSave }: TeamSelectorProps) {
  const teams = useMemo(() => getTeams(), []);
  const [selected, setSelected] = useState<number[]>(selectedFavorites);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    setSelected(selectedFavorites);
  }, [selectedFavorites]);

  const toggleTeam = (teamId: number) => {
    setSelected((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    );
  };

  const handleSave = () => {
    if (selected.length === 0) {
      setConfirmation("");
      setError("Select at least one team.");
      return;
    }
    setError("");
    onSave(selected);
    setConfirmation("Favorite teams saved to your profile.");
  };

  return (
    <section
      style={{
        borderRadius: "16px",
        border: "1px solid #e0e7ff",
        background: "linear-gradient(145deg, #ffffff, #f5f7ff)",
        padding: "24px",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
      }}
    >
      <header style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#12263a" }}>
          Select your team(s)
        </h2>
        <p style={{ color: "#5b6b7f", marginTop: "4px" }}>
          Choose the clubs you want to follow in your FootTrack dashboard.
        </p>
      </header>

      <div style={{ display: "grid", gap: "12px" }}>
        {teams.map((team) => {
          const isSelected = selected.includes(team.id);
          return (
            <label
              key={team.id}
              style={{
                ...checkboxStyles,
                backgroundColor: isSelected ? "#f0f4ff" : "#ffffff",
                borderColor: isSelected ? "#3b82f6" : "#d1d9e6",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleTeam(team.id)}
                style={{ width: "18px", height: "18px" }}
              />
              <div>
                <div style={{ fontWeight: 600, color: "#1d3557" }}>{team.name}</div>
                <div style={{ color: "#5b6b7f", fontSize: "0.85rem" }}>
                  {team.league} · {team.country}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {error && (
        <p style={{ color: "#dc2626", marginTop: "12px", fontWeight: 500 }}>{error}</p>
      )}
      {confirmation && (
        <p style={{ color: "#047857", marginTop: "12px", fontWeight: 500 }}>{confirmation}</p>
      )}

      <button
        onClick={handleSave}
        style={{
          marginTop: "20px",
          background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "12px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Save favorites
      </button>
    </section>
  );
}
