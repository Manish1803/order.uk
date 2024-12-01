import styles from "./RestaurantList.module.css";

function RestaurantList({ data: restaurants, title }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{title} Restaurants</h2>
      </div>

      <div className={styles.container}>
        {restaurants.map((restaurant) => (
          <ResCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
}

function ResCard({ restaurant }) {
  return (
    <div className={styles.resCard}>
      <img src={restaurant.image} alt={restaurant.name} />
      <div className={styles.resDetail}>
        <h3 className={styles.resName}>{restaurant.restaurantName}</h3>
      </div>
    </div>
  );
}

export default RestaurantList;
