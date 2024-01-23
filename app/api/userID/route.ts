"use client";

import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

export async function POST(req: Request) {
  const router = useRouter();
//   if (req.method == "GET") {
//     console.log('GET');
//   }

  try {
    const body = await req.json();
    console.log(body);

    const decryptedUserID = atob(await body);
    console.log(decryptedUserID);

    router.push("/data");
    return NextResponse.json(decryptedUserID);
  } catch (error) {
    console.log(error);
  }
}
