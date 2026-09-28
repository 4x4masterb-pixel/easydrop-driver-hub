import "./globals.css";
export const metadata={title:"EasyDrop Driver Hub",description:"Driver training and operational guidance",manifest:"/manifest.webmanifest"};
export const viewport={themeColor:"#0b0d0e",width:"device-width",initialScale:1};
export default function RootLayout({children}){return <html lang="en"><body>{children}</body></html>}