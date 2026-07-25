import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const setAdminCookie = async (adminId) => {
  try {
    const token = jwt.sign({ adminId, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const cookieStore = await cookies();

    cookieStore.set("admtok", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return token;
  } catch (error) {
    console.log("error in setting admin cookie", error.message);
    return new Error("error occured", error);
  }
};
