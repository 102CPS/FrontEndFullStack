"use client";
import { useState } from "react";
import { getTeams, Team } from "../services/teamService";

interface TeamSelectorProps {
  onSave: (selected: string[]) => void;
}

export default function TeamSelector({ onSave }: TeamSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const teams: Team[] = getTeams();

  const toggleTeam = (teamName: string) => {
    setSelected((prev) =>
      prev.includes(teamName)
        ? prev.filter((t) => t !== teamName)
        : [...prev, teamName]
    );
  };

  const handleSave = () => {
    if (selected.length === 0) {
      setError("Please select at least one team.");
      return;
    }
    setError("");
    onSave(selected);
    alert("Favorite teams saved!");
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "10px" }}>
      <h2>Select Favorite Teams</h2>
      {teams.map((team) => (
        <label key={team.id} style={{ display: "block", marginBottom: "5px" }}>
          <input
            type="checkbox"
            checked={selected.includes(team.name)}
            onChange={() => toggleTeam(team.name)}
          />
          <span style={{ marginLeft: "5px" }}>
            {team.name} ({team.league})
          </span>
        </label>
      ))}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={handleSave}
        style={{
          marginTop: "10px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
}
