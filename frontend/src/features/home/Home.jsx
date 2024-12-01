import { useApp } from "./../../contexts/AppContext";

import {
  CartModelButton,
  MobileProfile,
  StickyBar,
  MainNavBar,
  Main,
  Spinner,
  ExclusiveDealList,
  RestaurantList,
  Footer,
} from "./../../components";

import {
  HomeBanner,
  CategoryList,
  DownloadBanner,
  JoinUsBanner,
  About,
  AppStats,
} from "./components";

function Home() {
  const { websiteData: data, isMobile } = useApp();

  if (!data) return <Spinner />;

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
        <RestaurantList title={"Popular"} data={data.popularRestaurants} />
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
