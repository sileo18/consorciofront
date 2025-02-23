import CookiesFunc from "@/app/cookies";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {  

  
  // Define the state to accept either an array or null
  const [cookies, setCookies] = useState<RequestCookie[] | null>(null);

  useEffect(() => {
    const fetchCookies = async () => {
      // Fetch cookie data
      const cookieData: RequestCookie[] = await CookiesFunc();
      // Update the cookies state
      setCookies(cookieData);
    };

    fetchCookies();
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <span>{JSON.stringify(cookies)}</span>
    </main>
  );
}