import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-12 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
          <div>
            <h3 className="font-causten-bold text-[1.75rem] text-white mb-2 sm:mb-3">
              Need Help
            </h3>
            <ul className="font-causten-medium text-[1.125rem] text-white">
              <li>
                <Link href={"/contact"}>Contact Us</Link>
              </li>
              <li>
                <Link href={"/contact"}>Track Order</Link>
              </li>
              <li>
                <Link href={"/contact"}>Returns & Refunds</Link>
              </li>
              <li>
                <Link href={"/contact"}>FAQ&apos;s</Link>
              </li>
              <li>
                <Link href={"/contact"}>Career</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-causten-bold text-[1.75rem] text-white mb-2 sm:mb-3">
              Company
            </h3>
            <ul className="font-causten-medium text-[1.125rem] text-white">
              <li>
                <Link href={"/about-us"}>About Us</Link>
              </li>
              <li>
                <Link href={"/euphoria-blog"}>Euphoria Blog</Link>
              </li>
              <li>
                <Link href={"/euphoriastan"}>euphoriastan</Link>
              </li>
              <li>
                <Link href={"/contact"}>Media</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-causten-bold text-[1.75rem] text-white mb-2 sm:mb-3">
              More Info
            </h3>
            <ul className="font-causten-medium text-[1.125rem] text-white">
              <li>
                <Link href={"/contact"}>Term and Conditions</Link>
              </li>
              <li>
                <Link href={"/contact"}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={"/contact"}>Shipping Policy</Link>
              </li>
              <li>
                <Link href={"/contact"}>Sitemap</Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2">
            <h3 className="font-causten-bold text-[1.75rem] text-white mb-2 sm:mb-3">
              Location
            </h3>
            <ul className="font-causten-medium text-[1.125rem] text-white">
              <li>
                <Link href={"mailto:support@euphoria.in"}>
                  support@euphoria.in
                </Link>
              </li>
              <li>
                <Link href={"/contact"}>
                  Eklingpura Chouraha, Ahmedabad Main Road
                </Link>
              </li>
              <li>
                <Link href={"/contact"}>
                  (NH 8- Near Mahadev Hotel) Udaipur, India- 313002
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-[#BEBCBD] border-[1px] border-opacity-50" />
        <div className="text-center text-white mt-9">
          <p className="font-causten-semi-bold text-[1.125rem]">
            Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
