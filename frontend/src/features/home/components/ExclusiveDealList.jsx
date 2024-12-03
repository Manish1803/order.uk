import styles from "./ExclusiveDealList.module.css";

import { FaCircleChevronDown } from "react-icons/fa6";

function ExclusiveDealList({ data, isMobile }) {
  const deals = data;

  return (
    <section className={styles.section}>
      <div className={styles.dealsHeader}>
        <h2 className={styles.heading}>
          {isMobile
            ? "Up to -40% Discount Offers 🎊"
            : "Up to -40% 🎊 Order.uk exclusive deals"}
        </h2>
        <nav>
          <ul className={styles.dealsList}>
            <li>Vegan</li>
            <li>Sushi</li>
            <li className={styles.active}>
              {isMobile ? <FaCircleChevronDown /> : ""}&nbsp;Pizza & Fast Food
            </li>
            <li>Others</li>
          </ul>
        </nav>
      </div>

      <div className={styles.dealsContainer}>
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}

function DealCard({ deal }) {
  return (
    <div className={styles.dealCard}>
      <div
        style={{
          backgroundImage: `linear-gradient(to top right, #03081Fd1, #03081F1a, #fff0), url(${deal.image})`,
        }}
        className={styles.dealImage}
      />
      <span className={styles.dealBadge}>{deal.dealOffer}</span>
      <div className={styles.dealDetails}>
        <p className={styles.subHeading}>{deal.type}</p>
        <h3 className={styles.dealHeading}>{deal.name}</h3>
      </div>
    </div>
  );
}

export default ExclusiveDealList;
