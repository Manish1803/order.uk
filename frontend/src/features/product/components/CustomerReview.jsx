import { useState } from "react";
import styles from "./CustomerReview.module.css";

import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    location: "South London",
    date: "24th May, 2023",
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
    image: "https://i.pravatar.cc/54?23121",
  },
  {
    id: 2,
    name: "John Doe",
    location: "South London",
    date: "24th May, 2023",
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
    image: "https://i.pravatar.cc/54?23451",
  },
  {
    id: 3,
    name: "John Doe",
    location: "South London",
    date: "24th May, 2023",
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
    image: "https://i.pravatar.cc/54?34511",
  },

  {
    id: 4,
    name: "John Doe",
    location: "South London",
    date: "24th May, 2023",
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
    image: "https://i.pravatar.cc/54?u=56",
  },
];

function CustomerReview({ isMobile }) {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className={styles.section}>
      <article className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Customer Reviews</h2>
          <div className={styles.button}>
            <IoIosArrowDropleftCircle
              size="4rem"
              color="#FC8A06"
              onClick={handlePrev}
            />
            <IoIosArrowDroprightCircle
              size="4rem"
              color="#FC8A06"
              onClick={handleNext}
            />
          </div>
        </div>

        <div className={styles.reviewList}>
          {currentReviews.map((review) => (
            <div className={styles.review} key={review.id}>
              <div className={styles.reviewHeader}>
                <img
                  src={review.image}
                  alt={review.name}
                  className={styles.cimage}
                />
                <div className={styles.cdetails}>
                  <h3 className={styles.name}>{review.name}</h3>
                  <p className={styles.location}>{review.location}</p>
                </div>
                <div className={styles.rating}>
                  <img src="./icons/stars.png" alt="rating" />
                  <p>{review.date}</p>
                </div>
              </div>

              <p className={styles.reviewText}>{review.review}</p>
            </div>
          ))}
        </div>
      </article>
      <img
        src="./appRating.png"
        alt="App Rating"
        className={styles.appRating}
      />
    </section>
  );
}

export default CustomerReview;
