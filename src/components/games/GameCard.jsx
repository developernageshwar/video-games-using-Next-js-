import styles from "./GameCard.module.css";
import { formatDate, getScore } from "../../utils/helpers";

const GameCard = ({ game }) => {
  return (
    <div className={styles.card}>
      <div className={styles.blackBox}></div>

      <div className={styles.content}>
        <h2 className={styles.title}>{game.name}</h2>
        <p className={styles.releaseDate}>
          Release Date: {formatDate(game.first_release_date)}
        </p>
        <p className={styles.summary}>
          {game.summary
            ? game.summary.length > 200
              ? game.summary.substring(0, 200) + "..."
              : game.summary
            : "No summary available."}
        </p>
      </div>

      <div
        className={styles.score}
        title={game.rating ? `Rating: ${game.rating}` : "No Rating"}
      >
        {getScore(game.rating ? game.rating : 0)}
      </div>
    </div>
  );
};

export default GameCard;
