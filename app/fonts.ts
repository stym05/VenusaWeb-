// app/fonts.ts
import localFont from "next/font/local"

export const lexendZetta = localFont({
  variable: "--font-lexend-zetta",
  display: "swap",
  src: [
    { path: "../public/fonts/lexend-zetta/LexendZetta-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/lexend-zetta/LexendZetta-Bold.ttf",    weight: "700", style: "normal" },
  ],
})

export const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../public/fonts/poppins/Poppins-Light.ttf",     weight: "300", style: "normal" },
    { path: "../public/fonts/poppins/Poppins-Regular.ttf",   weight: "400", style: "normal" },
    { path: "../public/fonts/poppins/Poppins-Medium.ttf",    weight: "500", style: "normal" },
    { path: "../public/fonts/poppins/Poppins-SemiBold.ttf",  weight: "600", style: "normal" },
    { path: "../public/fonts/poppins/Poppins-Bold.ttf",      weight: "700", style: "normal" },
  ],
})
