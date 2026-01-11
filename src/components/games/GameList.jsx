import React from "react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GameList = ({ games, loading }) => {
  if (loading) {
    return (
      <div className="game-list">
        {[...Array(10)].map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div
        style={{
          color: "white",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          fontSize: "1.2rem",
        }}
      >
        No games found.
      </div>
    );
  }

  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
