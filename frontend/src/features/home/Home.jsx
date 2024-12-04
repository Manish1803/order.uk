import { useApp } from "./../../contexts/AppContext";

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
  HomeBanner,
  ExclusiveDealList,
  CategoryList,
  DownloadBanner,
  JoinUsBanner,
  About,
  AppStats,
} from "./components";
import { useNavigate } from "react-router-dom";

function Home() {
  const { websiteData: data, isMobile, foodItems } = useApp();
  const navigate = useNavigate();

  if (!data || !foodItems) return <Spinner />;

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
        <HomeBanner data={data.homeBanner} />
        <ExclusiveDealList data={data.exclusiveDeals} isMobile={isMobile} />
        <CategoryList data={data.popularCategories} />
        <RestaurantList
          onClick={() => navigate("/product")}
          title={"Popular"}
          data={data.popularRestaurants}
        />
        <DownloadBanner data={data} />
        <JoinUsBanner data={data.joinUsBanners} />
        <About />
        <AppStats />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
