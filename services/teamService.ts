export interface TeamRecord {
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface Team {
  id: number;
  name: string;
  league: string;
  country: string;
  stadium: string;
  coach: string;
  record: TeamRecord;
}

const teams: Team[] = [
  {
    id: 1,
    name: "Barcelona",
    league: "La Liga",
    country: "Spain",
    stadium: "Estadi Olímpic Lluís Companys",
    coach: "Xavi Hernández",
    record: {
      wins: 8,
      draws: 1,
      losses: 1,
      goalsFor: 24,
      goalsAgainst: 9,
    },
  },
  {
    id: 2,
    name: "PSG",
    league: "Ligue 1",
    country: "France",
    stadium: "Parc des Princes",
    coach: "Luis Enrique",
    record: {
      wins: 7,
      draws: 2,
      losses: 1,
      goalsFor: 26,
      goalsAgainst: 8,
    },
  },
  {
    id: 3,
    name: "Liverpool",
    league: "Premier League",
    country: "England",
    stadium: "Anfield",
    coach: "Jürgen Klopp",
    record: {
      wins: 7,
      draws: 3,
      losses: 0,
      goalsFor: 21,
      goalsAgainst: 6,
    },
  },
  {
    id: 4,
    name: "Fenerbahçe",
    league: "Süper Lig",
    country: "Türkiye",
    stadium: "Şükrü Saracoğlu Stadium",
    coach: "İsmail Kartal",
    record: {
      wins: 9,
      draws: 1,
      losses: 0,
      goalsFor: 27,
      goalsAgainst: 7,
    },
  },
];

export const getTeams = (): Team[] => teams;

export const getTeamById = (id: number): Team | undefined =>
  teams.find((team) => team.id === id);

export const getTeamMap = (): Map<number, Team> =>
  new Map(teams.map((team) => [team.id, team]));
