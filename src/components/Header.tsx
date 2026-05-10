import { Building2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

interface Props {
  fromHome: boolean;
}

function Header({ fromHome }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link to={"/"}>
          <div className="rounded-lg bg-violet-100 p-2">
            <Building2 className="h-5 w-5 text-violet-600" />
          </div>
        </Link>

        <div className="flex items-center gap-4">

          {/* Desktop nav only on home */}
          {fromHome && (
            <div className="hidden md:flex gap-10 items-center">
              <Link
                to={"/#features"}
                className="rounded-xl border px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-accent"
              >
                Features
              </Link>

              <Link
                to={"/#review"}
                className="rounded-xl border px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-accent"
              >
                Reviews
              </Link>
            </div>
          )}

          {/* Login button hidden on login page */}
          {!isLoginPage && (
            <Button
              variant={"blue"}
              onClick={() => navigate("/login")}
              className="rounded-xl px-6 text-sm font-medium text-white"
            >
              Login
            </Button>
          )}

        </div>
      </div>
    </header>
  );
}

export default Header;