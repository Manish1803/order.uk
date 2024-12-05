function Overlay({ children, onClick }) {
  return (
    <section
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0004",
        zIndex: 999,
        outline: "none",
        padding: "6rem 2rem",
        overflow: "scroll",
      }}
      onClick={onClick}
    >
      {children}
    </section>
  );
}

export default Overlay;
