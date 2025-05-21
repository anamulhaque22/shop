import Product from "../Product/Product";
import SectionHeading from "../Typography/SectionHeading";

const Limelight = () => {
  return (
    <div className="container section-space">
      <SectionHeading text="In The Limelight" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4  sm:gap-9 mt-8 sm:mt-12">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Limelight;
