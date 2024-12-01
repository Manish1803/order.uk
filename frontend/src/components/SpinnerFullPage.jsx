import Spinner from "./Spinner";

function SpinnerFullPage() {
  return (
    <div
      style={{
        margin: "2.5rem",
        height: `calc(100vh - 5rem)`,
        backgroundColor: "var(--color-light)",
      }}
    >
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
