import styles from "./FoodDisplay.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

import { Spinner, Overlay } from "./../../../components";

import { useApp } from "../../../contexts/AppContext";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OfferDealList from "./OfferDealList";

function FoodDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname === "/product/cart";

  const {
    foodItems: foodData,
    isDataLoading,
    isMobile,
    websiteData: data,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showOffer, setShowOffer] = useState(true);

  useEffect(() => {
    const filterData = () => {
      let data = foodData;

      if (selectedCategory !== "All") {
        data = data.filter((item) => item.category === selectedCategory);
      }

      if (search) {
        data = data.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});

      setFilteredData(groupedData);
    };

    if (foodData) filterData();
  }, [foodData, selectedCategory, search]);

  const categories = ["All", ...new Set(foodData.map((item) => item.category))];

  if (isDataLoading || !foodData || !data) {
    return <Spinner />;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          All Offers from McDonald&apos;s East London
        </h2>

        <div className={styles.searchContainer}>
          <FiSearch size="2rem" color="#666" />
          <input
            type="text"
            placeholder="Search for food"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.categoryContainer}>
        <div className={styles.categories}>
          <button
            className={`${styles.cbtn} ${showOffer && styles.active}`}
            onClick={() => setShowOffer((is) => !is)}
          >
            Offers
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.cbtn} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.main}>
        {showOffer && <OfferDealList data={data.offersDeals} />}
        <div className={styles.mainContainer}>
          <div className={styles.foodItems}>
            {Object.entries(filteredData).map(([category, items]) => (
              <div key={category} className={styles.categoryCard}>
                <h2 className={styles.categoryName}>{category}</h2>
                <div className={styles.itemsContainer}>
                  {items.map((item) => (
                    <FoodCard key={item._id} food={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {!isMobile ? (
            <Outlet />
          ) : (
            path && (
              <Overlay onClick={() => navigate(-1)}>
                <Outlet />
              </Overlay>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function FoodCard({ food }) {
  const { addToCart, currency } = useApp();

  return (
    <div className={styles.foodCard}>
      <div className={styles.cardDetails}>
        <h3 className={styles.cardName}>{food.name}</h3>
        <p className={styles.cardDesc}>{food.description}</p>
        <p className={styles.cardPrice}>
          {currency} {food.price}
        </p>
      </div>
      <img src={food.image} alt={food.name} className={styles.cardImage} />
      <div className={styles.overlay}>
        <IoIosAddCircle
          size="4rem"
          onClick={() => addToCart(food._id)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default FoodDisplay;
