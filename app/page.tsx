import { redirect } from "next/navigation";

export default function Home() {
  // Автоматически перенаправляем всех с главной страницы на страницу регистрации
  redirect("/register");
}