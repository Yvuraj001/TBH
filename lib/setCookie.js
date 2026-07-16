import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const setCookie = async ( userId ) => {

    try {
         const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "28d"
         });
 

          const cookieStore = await cookies() 

         cookieStore.set("lttob", token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "strict",
           maxAge: 60 * 60 * 24 * 28,
         });
         return token;
    } catch (error) {
        console.log("error in setting cookie", error.message)
       return new Error("error occured", error) 
    }
 
};
