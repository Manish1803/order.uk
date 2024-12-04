import styles from "./OfferDealList.module.css";
import { IoIosAddCircle } from "react-icons/io";

function OfferDealList({ data: offersDeals }) {
  return (
    <div className={styles.dealsContainer}>
      {offersDeals.map((deal) => (
        <div className={styles.dealCard} key={deal.id}>
          <div
            style={{
              backgroundImage: `linear-gradient(to top right, #03081Ff1, #03081F4a, #fff0), url(${deal.image})`,
            }}
            className={styles.dealImage}
          ></div>
          <span className={styles.dealBadge}>{deal.dealOffer}</span>
          <div className={styles.dealDetails}>
            <p className={styles.subHeading}>{deal.subtitle}</p>
            <h3 className={styles.dealHeading}>{deal.name}</h3>
          </div>
          <div className={styles.overlay}>
            <IoIosAddCircle size="3rem" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default OfferDealList;
