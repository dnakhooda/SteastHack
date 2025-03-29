import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (!router) {
      return;
    }
    router.push('/login');
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(`/`);
  };

  return (
    <header className="h-20 bg-gradient-to-r from-black via-black to-[#D41B2C] shadow-lg relative z-10">
      <div className="container mx-auto px-0 py-4">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center space-x-6"
            onClick={() => router.push("/")}
          >
            <div className="w-12 h-12 bg-[#D41B2C] flex items-center justify-center">
              <span
                className="text-white text-4xl font-serif font-light tracking-tighter leading-none"
                style={{ fontFamily: "Times New Roman" }}
              >
                N
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white">Stetson Social</h1>
          </button>
          <nav className="space-x-8">
            <a
              href="/"
              className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1"
            >
              Contact
            </a>
            {session ? (
              <>
                <span className="text-white text-lg font-medium">
                  Welcome, {session.user.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleClick}
                  className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
