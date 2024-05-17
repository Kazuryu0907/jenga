import {NextRequest,NextResponse} from "next/server";

export const config = {
    matcher: ["/admin"]
};

export default function middleware(req: NextRequest){
    const basicAuth = req.headers.get("authorization");
    if(basicAuth){
        const authValue = basicAuth.split(" ")[1];
        const [user,password] = atob(authValue).split(":");
        console.log(user,password);
        console.log(process.env.USERNAME,process.env.PASSWORD);
        if(user === process.env.LOGINUSERNAME && password === process.env.LOGINPASSWORD){
            return NextResponse.next();
        }
    }

    return new NextResponse("Unauthorized",{
        status:401,
        headers: {
            "WWW-Authenticate":"Basic realm=\"Access to admin area\""
        }
    })
}