import styles from "./AppStats.module.css";

const stats = [
  {
    title: "Registered Riders",
    value: "546+",
  },
  {
    title: "Orders Delivered",
    value: "789,900+",
  },
  {
    title: "Restaurants Partners",
    value: "690+",
  },
  {
    title: "Food Items",
    value: "17,457+",
  },
];

function AppStats() {
  return (
    <section className={styles.section}>
      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <div className={styles.stat} key={index}>
            <h2 className={styles.statValue}>{stat.value}</h2>
            <p className={styles.statTitle}>{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AppStats;
