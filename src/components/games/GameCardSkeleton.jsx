import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./GameCard.module.css";

const GameCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div
        className={styles.blackBox}
        style={{ backgroundColor: "transparent" }}
      >
        <Skeleton height="100%" baseColor="#182c47" highlightColor="#2a4568" />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          <Skeleton width="60%" baseColor="#182c47" highlightColor="#2a4568" />
        </h2>
        <p className={styles.releaseDate}>
          <Skeleton width="30%" baseColor="#182c47" highlightColor="#2a4568" />
        </p>
        <p className={styles.summary}>
          <Skeleton count={3} baseColor="#182c47" highlightColor="#2a4568" />
        </p>
      </div>

      <div
        className={styles.score}
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Skeleton
          circle
          width={40}
          height={40}
          baseColor="#182c47"
          highlightColor="#2a4568"
        />
      </div>
    </div>
  );
};

export default GameCardSkeleton;
