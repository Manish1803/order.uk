import styles from "./CategoryList.module.css";

function CategoryList({ data: categories }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Order.uk Popular Categories 🤩</h2>
      </div>

      <div className={styles.container}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  return (
    <div className={styles.categoryCard}>
      <img src={category.image} alt={category.name} />
      <div className={styles.details}>
        <h3 className={styles.categoryName}>{category.categoryName}</h3>
        <p className={styles.number}>{category.noOfRestaurants} Restaurants</p>
      </div>
    </div>
  );
}

export default CategoryList;
