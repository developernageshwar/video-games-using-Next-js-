import apiClient from "./apiClient";
import { API_TIMEOUT } from "../utils/constants";

export const fetchGames = async (params = {}) => {
  const { name, minScore, orderBy, sortDirection, page = 1 } = params;
  let url = "";

  const queryParams = [];

  queryParams.push(`pagination[page]=${page}`);

  queryParams.push(`pagination[pageSize]=10`);

  if (name) {
    queryParams.push(`filters[name][$containsi]=${encodeURIComponent(name)}`);
  }

  if (minScore) {
    queryParams.push(`filters[rating][$gte]=${minScore}`);
  }

  if (orderBy) {
    let sortField = orderBy;
    if (sortField === "first_release_date") sortField = "firstReleaseDate";

    const direction = sortDirection || "asc";
    queryParams.push(`sort=${sortField}:${direction}`);
  }

  if (queryParams.length > 0) {
    const separator = url.includes("?") ? "&" : "?";
    url += separator + queryParams.join("&");
  }

  await new Promise((resolve) => setTimeout(resolve, API_TIMEOUT));

  try {
    const response = await apiClient.get(url);
    const games = response.data.data.map((item) => ({
      id: item.id,
      name: item.attributes.name,
      rating: Number(item.attributes.rating),
      first_release_date: item.attributes.firstReleaseDate,
      summary: item.attributes.summary,
    }));

    return {
      games,
      meta: response.data.meta,
    };
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};
