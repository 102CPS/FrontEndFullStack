export interface Team {
  id: number;
  name: string;
  league: string;
}

export const getTeams = (): Team[] => [
  { id: 1, name: "Barcelona", league: "La Liga" },
  { id: 2, name: "Liverpool", league: "Premier League" },
  { id: 3, name: "Bayern Munich", league: "Bundesliga" },
  { id: 4, name: "Real Madrid", league: "La Liga" },
];
