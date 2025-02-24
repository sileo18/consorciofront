import { cookies } from "next/headers";

export async function CookiesFunc(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name);
}
