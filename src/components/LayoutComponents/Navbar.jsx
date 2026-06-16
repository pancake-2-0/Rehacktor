import { FaGamepad, FaSearch, FaBell } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import routes from "../../router/routes";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
  const [slug, setSlug] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setSlug(e.target.value);
  };

  const navigate = useNavigate();

  const { user, signOut } = useContext(UserContext);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };
  return (
    <div className="navbar bg-[#1a1c20] text-white border-b border-[#2d3139] shadow-md px-4 font-roboto mb-5 relative z-50">
      {/* NAVBAR START: Menu Dropdown classico per mobile/desktop */}
      <div className="navbar-start">
        <div className="dropdown z-[50]">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost h-10 min-h-10 px-2 sm:px-3 gap-2 hover:bg-[#2d3139]"
          >
            {/* Icona menu ad hamburger nativa */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-[#1a1c20] text-white border border-[#2d3139] rounded-box z-[100] mt-3 w-52 p-2 shadow-2xl"
          >
            <li>
              <Link to={routes.home} className="hover:bg-[#2d3139]">
                Homepage
              </Link>
            </li>
            {(!user && (
              <>
                <li>
                  <Link to={routes.register} className="hover:bg-[#2d3139]">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to={routes.login} className="hover:bg-[#2d3139]">
                    Login
                  </Link>
                </li>
              </>
            )) || (
              <li>
                <button onClick={handleLogout} className="hover:bg-[#2d3139]">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* NAVBAR CENTER: Brand "Reaktor" con icona Gamepad (si nasconde su mobile se la ricerca è aperta) */}
      <div className={`navbar-center ${isOpen ? "hidden sm:flex" : "flex"}`}>
        <Link
          to={routes.home}
          className="btn btn-ghost text-2xl font-electro tracking-wider text-white normal-case hover:bg-transparent flex items-center gap-2"
        >
          <span className="text-xl text-white">
            <FaGamepad />
          </span>
          Reaktor
        </Link>
      </div>

      {/* NAVBAR END: Barra di ricerca interattiva e Notifiche */}
      <div className="navbar-end gap-1 sm:gap-2">
        <div
          className={`${
            isOpen ? "absolute right-14 left-14 z-50 flex" : "hidden md:flex"
          } items-center`}
        >
          <input
            type="text"
            placeholder="Cerca un gioco..."
            className="input input-bordered bg-[#2d3139] border-[#3f444e] text-white focus:border-white w-full md:w-40 lg:w-60 h-10 pr-10"
            onChange={handleChange}
            autoFocus={isOpen}
          />

          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 text-gray-400 hover:text-white text-sm md:hidden"
            >
              ✕
            </button>
          )}
        </div>

        {isOpen ? (
          <Link
            className="btn btn-ghost btn-circle hover:bg-[#2d3139] text-lg flex items-center justify-center z-50"
            to={`/search/${slug}`}
            onClick={() => setIsOpen(false)}
          >
            <FaSearch />
          </Link>
        ) : (
          <button
            className="btn btn-ghost btn-circle hover:bg-[#2d3139] text-lg flex items-center justify-center md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <FaSearch />
          </button>
        )}

        <Link
          className="btn btn-ghost btn-circle hover:bg-[#2d3139] text-lg hidden md:flex items-center justify-center"
          to={`/search/${slug}`}
        >
          <FaSearch />
        </Link>

        <button
          className={`btn btn-ghost btn-circle hover:bg-[#2d3139] text-lg ${isOpen ? "hidden md:flex" : "flex"}`}
        >
          <div className="indicator">
            <FaBell />
            <span className="badge badge-xs badge-error indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}
