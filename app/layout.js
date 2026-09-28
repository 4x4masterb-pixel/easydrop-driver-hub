import "./globals.css";
import "./home-v2.css";
export const metadata={title:"EasyDrop Driver Hub",description:"Driver training, route support and operational guidance",manifest:"/manifest.webmanifest"};
export const viewport={themeColor:"#ffffff",width:"device-width",initialScale:1};
export default function RootLayout({children}){return <html lang="en"><body>{children}<footer className="edFooter"><div><strong>EasyDrop Couriers</strong><div>Driver Hub · Training and operational support</div></div><div><a href="/contacts">Depot contacts</a> · <a href="mailto:centraloffice@easydropcouriers.com">Central Office</a> · <a href="/privacy">Privacy</a></div><div>© {new Date().getFullYear()} EasyDrop Couriers</div></footer></body></html>}