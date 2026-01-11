import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoMain}>VIDEO GAMES </span>
          </Link>
        </div>
        <div className={styles.links}>
          <Link
            href="/contact"
            className={pathname === "/contact" ? styles.active : ""}
          >
            CONTACT
          </Link>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </nav>
    </div>
  );
};

export default Navbar;
