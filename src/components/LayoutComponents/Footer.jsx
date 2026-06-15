import { FaTwitter, FaYoutube, FaFacebookF, FaGamepad } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer mt-5 sm:footer-horizontal bg-[#1a1c20] text-gray-400 border-t border-[#2d3139] p-10 font-roboto">
      {/* SEZIONE BRAND */}
      <aside className="gap-2">
        <div className="text-white text-4xl mb-2 animate-pulse">
          <FaGamepad />
        </div>
        <p className="text-sm">
          <span className="font-electro text-xl tracking-wider text-white block mb-1">
            Reaktor
          </span>
          Connecting gamers with the ultimate rawg database.
          <br />
          <span className="text-xs text-gray-500">
            © {new Date().getFullYear()} - All rights reserved
          </span>
        </p>
      </aside>

      {/* SEZIONE SOCIAL */}
      <nav>
        <h6 className="footer-title text-white font-electro tracking-widest text-xs opacity-80">
          Social
        </h6>
        <div className="grid grid-flow-col gap-5 text-xl">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <FaYoutube />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            <FaFacebookF />
          </a>
        </div>
      </nav>
    </footer>
  );
}
