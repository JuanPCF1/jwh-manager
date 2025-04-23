"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.sidebarLogo}>
        <div className={styles.logoIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4169E1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
        </div>
        <div className={styles.logoText}>JWH Manager</div>
      </div>

      <nav className={styles.sidebarNav}>
        <Link
          href="/dashboard"
          className={`${styles.sidebarNavItem} ${pathname === "/dashboard" ? styles.sidebarNavItemActive : ""}`}
        >
          <span>Dashboard</span>
        </Link>

        <Link
          href="/manage"
          className={`${styles.sidebarNavItem} ${pathname === "/manage" ? styles.sidebarNavItemActive : ""}`}
        >
          <span>Manage</span>
        </Link>

        <Link
          href="/Content"
          className={`${styles.sidebarNavItem} ${pathname === "/Contents" ? styles.sidebarNavItemActive : ""}`}
        >
          <span>Contents</span>
        </Link>

        <Link
          href="/Warehouse"
          className={`${styles.sidebarNavItem} ${pathname === "/Warehouse" ? styles.sidebarNavItemActive : ""}`}
        >
          <span>Warehouse</span>
        </Link>

        <div className={styles.sidebarSectionTitle}>SHORTCUTS</div>

        <Link
          href="/settings"
          className={`${styles.sidebarNavItem} ${pathname === "/settings" ? styles.sidebarNavItemActive : ""}`}
        >
          <span>Settings</span>
        </Link>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>JD</div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>John Doe</div>
            <div className={styles.userRole}>Administrator</div>
          </div>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className={styles.toggleButton} onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;
