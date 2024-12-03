import styles from "./RestaurantList.module.css";

function RestaurantList({ data: restaurants, title, onClick }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{title} Restaurants</h2>
      </div>

      <div
        className={`${
          title === "Popular" ? styles.container : styles.gridContainer
        }`}
      >
        {restaurants.map((restaurant) => (
          <ResCard
            key={restaurant.id}
            restaurant={restaurant}
            title={title}
            onClick={onClick}
          />
        ))}
      </div>
    </section>
  );
}

function ResCard({ restaurant, title, onClick }) {
  return (
    <div
      className={`${title === "Popular" ? styles.resCard : styles.gridCard}`}
      onClick={onClick}
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className={styles.resImage}
      />
      <div className={styles.resDetail}>
        <h3 className={styles.resName}>{restaurant.restaurantName}</h3>
      </div>
    </div>
  );
}

export default RestaurantList;
