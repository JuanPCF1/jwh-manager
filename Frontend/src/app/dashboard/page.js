import Sidebar from "@components/Sidebar"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
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
              <h3>Users</h3>
            </div>
            <p>3</p>
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
