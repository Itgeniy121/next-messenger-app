import { NextResponse, NextRequest } from "next/server";
export const config = {
    matcher: "/",
    };
export default function middleware(req: NextRequest){
    const url = req.url
    const verify = req.cookies.get('logged')
    const { pathname, origin } = req.nextUrl
    if(url.includes('/')){
        if(!verify && pathname !== "/login"){
            return NextResponse.redirect(new URL('/login', req.url))    

        }
    }
    if(url === "/"){
        if(verify){
            return NextResponse.redirect(new URL('/', req.url))

        }
    }


}