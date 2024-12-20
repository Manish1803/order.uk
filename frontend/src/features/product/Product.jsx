import { useApp } from "./../../contexts/AppContext";
import { useAuth } from "../../contexts/UserContext";

import {
  CartModelButton,
  MobileProfile,
  StickyBar,
  MainNavBar,
  Main,
  Spinner,
  RestaurantList,
  Footer,
} from "./../../components";

import {
  McdBanner,
  FoodDisplay,
  CustomerReview,
  Map,
  InfoTab,
} from "./components";

function Product() {
  const { websiteData: data, isDataLoading, isMobile, foodItems } = useApp();
  const { isDataLoading: isAuth } = useAuth();

  if (isDataLoading || isAuth || !data) return <Spinner />;
  if (!foodItems) return <Spinner />;

  return (
    <>
      {!isMobile && (
        <StickyBar>
          <CartModelButton />
        </StickyBar>
      )}
      <MainNavBar />
      {isMobile && <MobileProfile />}
      <Main>
        <McdBanner data={data.mcdBanner} appRating={data.appRating} />
      </Main>
      <FoodDisplay />
      {!isMobile && (
        <Main>
          <InfoTab />
          <Map />
        </Main>
      )}
      <CustomerReview isMobile={isMobile} />
      <Main>
        <RestaurantList title={"Similar"} data={data.popularRestaurants} />
      </Main>
      <Footer />
    </>
  );
}

export default Product;
