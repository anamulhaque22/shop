import MainNav from "@/components/Navbar/MainNav";
import Footer from "@/components/Shared/Footer";

export const metadata = {
  title: "Layout with Header and Footer",
  description: "A layout with a header and footer",
};

export default function LayoutWithHeaderFooter({ children }) {
  return (
    <>
      <MainNav />
      {children}
      <Footer />
    </>
  );
}
