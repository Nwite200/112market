import Hero from "../components/home/Hero"
import CategoryGrid from "../components/home/CategoryGrid"
import FeaturedProducts from "../components/home/FeaturedProducts"
import LatestArrivals from "../components/home/LatestArrivals"
import Promotions from "../components/home/Promotions"
import WhyShop from "../components/home/WhyShop"
import ProcessSteps from "../components/home/ProcessSteps"
import SupportFaq from "../components/home/SupportFaq"

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <LatestArrivals />
      <Promotions />
      <WhyShop />
      <ProcessSteps />
      <SupportFaq />
    </>
  )
}
