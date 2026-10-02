import "./globals.css";
import "./home-v2.css";
export const metadata={title:"Courier Hub",description:"Driver training, route support and operational guidance",manifest:"/manifest.webmanifest"};
export const viewport={themeColor:"#ffffff",width:"device-width",initialScale:1};
export default function RootLayout({children}){return <html lang="en"><body>{children}<footer className="edFooter"><div><strong>Courier Hub</strong><div>Professional courier training and operational support</div></div><div><a href="/contacts">Depot contacts</a> · <a href="/privacy">Privacy</a></div><div>© {new Date().getFullYear()} Courier Hub</div></footer></body></html>}