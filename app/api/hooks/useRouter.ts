"use client";
import { useRouter } from "next/navigation";

const Router = (path:string) => {
  const route = useRouter();
  console.log(path);
  route.push('/'+path);
};

export default Router;
