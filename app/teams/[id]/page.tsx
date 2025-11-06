import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { getMatchesByTeam } from "@services/matchService";
import { getTeamById, getTeamMap, Team } from "@services/teamService";

interface TeamPageProps {
  params: { id: string };
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const resolveOpponent = (teamMap: Map<number, Team>, opponentId?: number, fallback?: string) => {
  if (opponentId) {
    return teamMap.get(opponentId)?.name ?? fallback ?? "Unknown";
  }

  return fallback ?? "Unknown";
};

const TeamDetailPage = ({ params }: TeamPageProps) => {
  const teamId = Number(params.id);

  if (Number.isNaN(teamId)) {
    notFound();
  }

  const team = getTeamById(teamId);

  if (!team) {
    notFound();
  }

  const matches = getMatchesByTeam(teamId);
  const teamMap = getTeamMap();
  const upcoming = matches.filter((match) => match.score === null);
  const played = matches.filter((match) => match.score !== null);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <p className={styles.league}>{team.league} • {team.country}</p>
          <h1 className={styles.title}>{team.name}</h1>
          <p className={styles.meta}>Coach: {team.coach} • Stadium: {team.stadium}</p>
        </div>
        <div className={styles.record}>
          <span>W {team.record.wins}</span>
          <span>D {team.record.draws}</span>
          <span>L {team.record.losses}</span>
          <span>
            GF {team.record.goalsFor} / GA {team.record.goalsAgainst}
          </span>
        </div>
      </header>

      <Link className={styles.back} href="/">
        Back to dashboard
      </Link>

      <section className={styles.section}>
        <h2>Upcoming matches</h2>
        {upcoming.length === 0 ? (
          <p className={styles.empty}>No upcoming fixtures scheduled.</p>
        ) : (
          <ul>
            {upcoming.map((match) => {
              const isHome = match.homeTeamId === teamId;
              const opponent = isHome
                ? resolveOpponent(teamMap, match.away.teamId, match.away.name)
                : resolveOpponent(teamMap, match.homeTeamId, teamMap.get(match.homeTeamId)?.name);

              return (
                <li key={match.id}>
                  <div className={styles.matchRow}>
                    <span className={styles.matchDate}>{formatDate(match.date)}</span>
                    <span className={styles.matchOpponent}>
                      {isHome ? "vs" : "@"} {opponent}
                    </span>
                    <Link href={`/matches/${match.id}`} className={styles.matchLink}>
                      View match
                    </Link>
                  </div>
                  <span className={styles.matchMeta}>{match.competition} • {match.venue}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className={styles.section}>
        <h2>Recent results</h2>
        {played.length === 0 ? (
          <p className={styles.empty}>No matches played yet.</p>
        ) : (
          <ul>
            {played.map((match) => {
              const isHome = match.homeTeamId === teamId;
              const opponent = isHome
                ? resolveOpponent(teamMap, match.away.teamId, match.away.name)
                : resolveOpponent(teamMap, match.homeTeamId, teamMap.get(match.homeTeamId)?.name);

              const score = match.score
                ? `${match.score.home} - ${match.score.away}`
                : "TBD";

              return (
                <li key={match.id}>
                  <div className={styles.matchRow}>
                    <span className={styles.matchDate}>{formatDate(match.date)}</span>
                    <span className={styles.matchOpponent}>
                      {isHome ? "vs" : "@"} {opponent}
                    </span>
                    <span className={styles.matchScore}>{score}</span>
                  </div>
                  <span className={styles.matchMeta}>{match.competition} • {match.venue}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TeamDetailPage;
