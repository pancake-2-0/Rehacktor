import { Outlet, useLoaderData } from "react-router";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";
import Sidebar from "../LayoutComponents/Sidebar";

export default function Layout() {
  const genres = useLoaderData();

  return (
    <>
      <Navbar />
      <section className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="min-w-0">
          <Sidebar genres={genres} />
        </div>
        <div className="min-w-0 md:col-span-6">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
