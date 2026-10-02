import {NextResponse} from "next/server";
const PUBLIC=["/login","/api/auth/login"];
export function middleware(req){const p=req.nextUrl.pathname;if(PUBLIC.some(x=>p===x)||p.startsWith("/_next/")||p==="/favicon.ico"||p==="/manifest.webmanifest")return NextResponse.next();const token=req.cookies.get("ed_session")?.value;if(!token){const u=req.nextUrl.clone();u.pathname="/login";u.searchParams.set("next",p);return NextResponse.redirect(u)}return NextResponse.next()}
export const config={matcher:["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"]};