import Search from "@/app/nav/Search";
import Logo from "@/app/nav/Logo";
import LoginButton from "@/app/nav/LoginButton";
import { getCurrentUser } from "@/app/actions/AuthActions";
import UserActions from "@/app/nav/UserActions";

export default async function Navbar() {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-1 bg-white px-3 py-3 text-gray-800 shadow-md sm:flex-nowrap sm:gap-0 md:px-6 md:py-4">
      <Logo />
      <Search />
      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
}
