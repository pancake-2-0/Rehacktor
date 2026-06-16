import { Link, useParams } from "react-router";

export default function Sidebar({ genres }) {
  const { genreSlug } = useParams();

  return (
    <>
      <nav className="w-full max-w-full bg-[#1a1c20] text-white border-b md:border-b-0 md:border-r border-[#2d3139] p-3 sm:p-4 h-auto md:h-[calc(100vh-75px)] md:sticky md:top-[75px] overflow-hidden md:overflow-y-auto font-roboto transition-all duration-300 z-10">
        <h2 className="text-sm font-bold font-electro tracking-widest mb-4 text-gray-400 uppercase px-2 hidden md:block leading-6">
          Filtra per Genere
        </h2>

        <ul className="flex flex-row md:flex-col gap-1 sm:gap-1.5 max-w-full overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 px-1 md:px-2 overscroll-x-contain [scrollbar-width:thin] [scrollbar-color:#3f444e_#1a1c20] md:[scrollbar-width:auto] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#1a1c20] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#3f444e] md:[&::-webkit-scrollbar]:h-auto">
          {genres?.map((genre) => {
            const isActive = genreSlug === genre.slug;

            return (
              <li className="shrink-0 md:shrink md:w-full" key={genre.id}>
                <Link
                  to={`/genre/${genre.slug}`}
                  className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-xl font-medium transition-all duration-200 whitespace-nowrap md:whitespace-normal text-sm md:text-xs lg:text-sm leading-5 text-left

                    ${
                      isActive
                        ? "bg-white text-[#111317] font-bold shadow-lg scale-[1.02]"
                        : "hover:bg-[#2d3139] text-gray-400 hover:text-white active:bg-[#3f444e]"
                    }`}
                >
                  <span className="min-w-0">{genre.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
