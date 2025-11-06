export interface TeamPerformance {
  wins: number;
  draws: number;
  losses: number;
}

export interface Team {
  id: number;
  name: string;
  league: string;
  country: string;
  performance: TeamPerformance;
}

const teams: Team[] = [
  {
    id: 1,
    name: "Barcelona",
    league: "La Liga",
    country: "Spain",
    performance: { wins: 8, draws: 2, losses: 1 },
  },
  {
    id: 2,
    name: "PSG",
    league: "Ligue 1",
    country: "France",
    performance: { wins: 7, draws: 3, losses: 1 },
  },
  {
    id: 3,
    name: "Liverpool",
    league: "Premier League",
    country: "England",
    performance: { wins: 9, draws: 1, losses: 2 },
  },
  {
    id: 4,
    name: "Everton",
    league: "Premier League",
    country: "England",
    performance: { wins: 5, draws: 4, losses: 4 },
  },
  {
    id: 5,
    name: "Lyon",
    league: "Ligue 1",
    country: "France",
    performance: { wins: 4, draws: 5, losses: 4 },
  },
  {
    id: 6,
    name: "Nice",
    league: "Ligue 1",
    country: "France",
    performance: { wins: 6, draws: 4, losses: 3 },
  },
];

export const getTeams = () => teams.slice();

export const getTeamById = (id: number) => teams.find((team) => team.id === id) ?? null;
