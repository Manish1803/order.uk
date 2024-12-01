import styles from "./About.module.css";

const orderProcess = [
  {
    id: 1,
    title: "Place a Order!",
    image: "./steps/step1.png",
    desc: "Place order through our website or Mobile app",
  },
  {
    id: 2,
    title: "Track Process",
    image: "./steps/step2.png",
    desc: "Your can track your order status with delivery time",
  },
  {
    id: 3,
    title: "Get your Order!",
    image: "./steps/step3.png",
    desc: "Receive your order at a lighting fast speed!",
  },
];

function About() {
  return (
    <section className={styles.section}>
      <article className={styles.about}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Know more about us!</h2>
          <nav>
            <ul className={styles.aboutList}>
              <li className={styles.active}>Frequent Questions</li>
              <li>Who we are?</li>
              <li>Partner Program</li>
              <li>Help & Support</li>
            </ul>
          </nav>
        </div>

        <div className={styles.container}>
          <ul className={styles.faq}>
            <li>How does Order.UK work?</li>
            <li>What payment methods are accepted?</li>
            <li>Can I track my order in real-time?</li>
            <li>Are there any special discounts or promotions available?</li>
            <li>Is Order.UK available in my area?</li>
          </ul>

          <div className={styles.process}>
            <ul className={styles.processList}>
              {orderProcess.map((step) => (
                <OrderStep key={step.id} step={step} />
              ))}
            </ul>
            <p className={styles.info}>
              Order.UK simplifies the food ordering process. Browse through our
              diverse menu, select your favorite dishes, and proceed to
              checkout. Your delicious meal will be on its way to your doorstep
              in no time!
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function OrderStep({ step }) {
  return (
    <li className={styles.step}>
      <h3 className={styles.stepTitle}>{step.title}</h3>
      <img src={step.image} alt={step.title} className={styles.stepImage} />
      <p className={styles.stepDesc}>{step.desc}</p>
    </li>
  );
}

export default About;
