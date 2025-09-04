import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            NoteForge
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            {isSignedIn ? (
              <>
                <span className="text-sm text-base-content/70">
                  Welcome, {user?.fullName}
                </span>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="btn btn-primary">Sign in with Google</button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
