import Sidebar from "@components/Sidebar"
import styles from "./Dashboard.module.css"

const Dashboard = () => {

  // Sample data for recent items
  
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <div className={styles.dashboardTitle}>
            <h1>Dashboard</h1>
            <div className={styles.dashboardSubtitle}>Welcome back, John Doe</div>
          </div>
          <div className={styles.headerActions}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              View Item
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Logs
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save
            </button>
          </div>
        </header>

        <section className={styles.dashboardStats}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <h3>In Warehouse</h3>
            </div>
            <p>241</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <h3>Committed</h3>
            </div>
            <p>68 in 60 Orders</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <h3>Expected</h3>
            </div>
            <p>500 in 1 Order</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <h3>Avg Sales</h3>
            </div>
            <p>25.5 / Day</p>
          </div>
        </section>

        <section className={styles.dashboardMap}>
          <h2>Item Locations</h2>
          <div className={styles.mapContainer}>
            <p>Map Placeholder</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
