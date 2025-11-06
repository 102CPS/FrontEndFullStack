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
      <li key={match.id} className="match-list__item">
        <Link href={`/matches/${match.id}`} className="match-list__link">
          <div className="match-list__teams">
            <span>{homeTeam?.name}</span>
            <span className="match-list__score">{formatScore(match)}</span>
            <span>{awayTeam?.name}</span>
          </div>
          <div className="match-list__date">{formatDate(match.date)}</div>
        </Link>
      </li>
    );
  };

  return (
    <section className="match-list">
      <header className="match-list__header">
        <h2 className="match-list__title">My matches</h2>
        <p className="match-list__subtitle">
          Only fixtures for your saved favorites are shown. Click a match to see detailed
          statistics.
        </p>
      </header>

      {matches.length === 0 ? (
        <p className="match-list__empty">No matches available.</p>
      ) : (
        <div className="match-list__sections">
          <div>
            <h3 className="match-list__section-title match-list__section-title--upcoming">
              Upcoming
            </h3>
            {upcomingMatches.length === 0 ? (
              <p className="match-list__empty">No upcoming matches.</p>
            ) : (
              <ul className="match-list__group">
                {upcomingMatches.map(renderRow)}
              </ul>
            )}
          </div>

          <div>
            <h3 className="match-list__section-title match-list__section-title--results">
              Results
            </h3>
            {pastMatches.length === 0 ? (
              <p className="match-list__empty">No results to show yet.</p>
            ) : (
              <ul className="match-list__group">
                {pastMatches.map(renderRow)}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
