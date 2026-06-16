import { Outlet, useLoaderData } from "react-router";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";
import Sidebar from "../LayoutComponents/Sidebar";

export default function Layout() {
  const genres = useLoaderData();

  return (
    <>
      <Navbar />
      <section className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)] gap-4">
        <div className="min-w-0">
          <Sidebar genres={genres} />
        </div>
        <div className="min-w-0">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
