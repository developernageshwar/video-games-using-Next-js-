import React, { useState, useEffect } from "react";
import { fetchGames } from "../services/api";
import Navbar from "../components/layout/Navbar";
import FilterPanel from "../components/games/FilterPanel";
import GameList from "../components/games/GameList";
import styles from "./Home.module.css";
import Button from "../components/common/Button";
import useDebounce from "../hooks/useDebounce";
import { FaFilter } from "react-icons/fa";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    minScore: "",
    orderBy: "first_release_date",
    sortDirection: "asc",
  });

  const debouncedName = useDebounce(filters.name, 500);
  const debouncedMinScore = useDebounce(filters.minScore, 500);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  useEffect(() => {
    setPage(1);
  }, [debouncedName, debouncedMinScore]);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const apiFilters = {
          ...filters,
          name: debouncedName,
          minScore: debouncedMinScore,
          page,
        };
        const { games: data, meta: metaData } = await fetchGames(apiFilters);
        setGames(data);
        setMeta(metaData);
      } catch (err) {
        console.error("Failed to fetch games");
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, [
    debouncedName,
    debouncedMinScore,
    filters.orderBy,
    filters.sortDirection,
    page,
  ]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    // Page reset is now handled by the effect on debounced values
  };

  const handleSortDirectionChange = () => {
    setFilters((prev) => ({
      ...prev,
      sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  const handleClear = () => {
    setFilters({
      name: "",
      minScore: "",
      orderBy: "first_release_date",
      sortDirection: "asc",
    });
    setPage(1);
  };

  const displayedGames = games;

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.mobileActions}>
          <Button className={styles.mobileFilterBtn} onClick={() => setShowFilter(true)}>
            <FaFilter />
          </Button>
        </div>
        <div className={`${styles.filters} ${showFilter ? styles.open : ""}`}>
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={handleClear}
            onSortDirectionChange={handleSortDirectionChange}
            onClose={() => setShowFilter(false)}
          />
        </div>
        <div className={styles.games}>
          <GameList games={displayedGames} loading={loading} />

          {!loading && meta && games.length > 0 && (
            <div className={styles.pagination}>
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                variant="primary"
              >
                Previous
              </Button>
              <span className={styles.pageInfo}>
                Page {page} of {meta.pagination.pageCount}
              </span>
              <Button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= meta.pagination.pageCount}
                variant="primary"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
