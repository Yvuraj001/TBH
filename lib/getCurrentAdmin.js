import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getCurrentAdmin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admtok")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
};
