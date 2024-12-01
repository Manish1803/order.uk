function Main({ children }) {
  return (
    <main
      style={{
        maxWidth: "130rem",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        padding: "2rem 0",
      }}
    >
      {children}
    </main>
  );
}

export default Main;
