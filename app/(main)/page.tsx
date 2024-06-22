import { redirect } from "next/navigation";

// Dashboard is out of scope, redirect to questing for now
export default async function Dashboard() {
  redirect("/questing");
}
