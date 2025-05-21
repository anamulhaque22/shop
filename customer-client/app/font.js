import localFont from "next/font/local";

const caustenFontLight = localFont({
  src: "../public/Fonts/Causten_font/Causten-Light.ttf",
  weight: "300",
  variable: "--font-causten-light",
});
const caustenFontReguler = localFont({
  src: "../public/Fonts/Causten_font/Causten-Regular.ttf",
  weight: "400",
  variable: "--font-causten-regular",
});
const caustenFontMedium = localFont({
  src: "../public/Fonts/Causten_font/Causten-Medium.ttf",
  weight: "500",
  variable: "--font-causten-medium",
});
const caustenFontSemiBold = localFont({
  src: "../public/Fonts/Causten_font/Causten-Semi-Bold.ttf",
  weight: "600",
  variable: "--font-causten-semi-bold",
});
const caustenFontBold = localFont({
  src: "../public/Fonts/Causten_font/Causten-Bold.ttf",
  weight: "700",
  variable: "--font-causten-bold",
});
const coreSansFontReguler = localFont({
  src: "../public/Fonts/Core_Sans_fonts/CoreSansC-45Regular.ttf",
  weight: "400",
  variable: "--core-sans-bold",
});
const coreSansFontMedium = localFont({
  src: "../public/Fonts/Core_Sans_fonts/CoreSansC-55Medium.ttf",
  weight: "500",
  variable: "--core-sans-medium",
});
const coreSansFontBold = localFont({
  src: "../public/Fonts/Core_Sans_fonts/CoreSansC-65Bold.ttf",
  weight: "700",
  variable: "--core-sans-bold",
});
const coreSansFontExtraBold = localFont({
  src: "../public/Fonts/Core_Sans_fonts/CoreSansC-75ExtraBold.ttf",
  weight: "900",
  variable: "--core-sans-extra-bold",
});
const font = {
  caustenFontLight,
  caustenFontBold,
  caustenFontReguler,
  caustenFontMedium,
  caustenFontSemiBold,
  coreSansFontReguler,
  coreSansFontMedium,
  coreSansFontBold,
  coreSansFontExtraBold,
};
export default font;
