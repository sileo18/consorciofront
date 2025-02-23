import { cookies } from "next/headers";

export default async function CookiesFunc() {

    const cookieStore = await cookies();
    return cookieStore.getAll();

}