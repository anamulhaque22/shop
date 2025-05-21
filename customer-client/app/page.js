import EverydayFashion from "@/components/Home/EverydayFashion";
import Hero from "@/components/Home/Hero";
import NewArrival from "@/components/Home/NewArrival";
import MainNav from "@/components/Navbar/MainNav";
import Footer from "@/components/Shared/Footer";

export function generateMetadata() {
  return {
    title: "Home",
  };
}

export default function Home() {
  return (
    <main className="">
      <MainNav />

      <Hero />
      {/* <SpecialDiscount /> */}
      <NewArrival />
      {/* <BigSavingZone /> */}
      <EverydayFashion />
      {/* <Cagegories cagegoryFor={"Cagegory For Man"} /> */}
      {/* <TopBrands /> */}
      {/* <Limelight /> */}
      {/* <UserFeedbacks /> */}
      <Footer />
    </main>
  );
}
