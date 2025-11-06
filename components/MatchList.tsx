"use client";

import Link from "next/link";
import { useMemo } from "react";
import styles from "./MatchList.module.css";
import { getMatches, Match } from "@services/matchService";
import { getTeamMap, Team } from "@services/teamService";

interface MatchListProps {
  favorites: number[];
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const MatchList = ({ favorites }: MatchListProps) => {
  const teamMap = useMemo<Map<number, Team>>(() => getTeamMap(), []);
  const matches = useMemo<Match[]>(() => getMatches(), []);

  if (favorites.length === 0) {
    return (
      <section className={styles.card}>
        <h2 className={styles.title}>My matches</h2>
        <p className={styles.empty}>Select favorite teams to view upcoming games.</p>
      </section>
    );
  }

  const visibleMatches = matches.filter(
    (match) =>
      favorites.includes(match.homeTeamId) ||
      (match.away.teamId !== undefined && favorites.includes(match.away.teamId))
  );

  if (visibleMatches.length === 0) {
    return (
      <section className={styles.card}>
        <h2 className={styles.title}>My matches</h2>
        <p className={styles.empty}>No matches available.</p>
      </section>
    );
  }

  const sortedMatches = [...visibleMatches].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>My matches</h2>
      <ul className={styles.list}>
        {sortedMatches.map((match) => {
          const homeTeam = teamMap.get(match.homeTeamId);
          const awayTeamName =
            match.away.teamId !== undefined
              ? teamMap.get(match.away.teamId)?.name ?? match.away.name
              : match.away.name;

          const score = match.score
            ? `${match.score.home} - ${match.score.away}`
            : "TBD";

          return (
            <li key={match.id} className={styles.item}>
              <div className={styles.row}>
                <span className={styles.date}>{formatDate(match.date)}</span>
                <span className={styles.competition}>{match.competition}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.teams}>
                  {homeTeam?.name ?? ""} vs {awayTeamName}
                </span>
                <span className={styles.score}>Result: {score}</span>
              </div>
              <Link className={styles.link} href={`/matches/${match.id}`}>
                View match details
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default MatchList;
