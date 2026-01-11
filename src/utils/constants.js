export const SORT_OPTIONS = [
  { value: "first_release_date", label: "Release Date" },
  { value: "rating", label: "Score" },
  { value: "name", label: "Name" },
];

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
};

export const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 2000;
