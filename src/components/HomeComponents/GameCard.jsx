export default function GameCard({ game }) {
  return (
    <>
      <div className="group h-48 md:h-56 relative rounded-xl overflow-hidden cursor-pointer shadow-lg border border-[#2d3139] hover:border-white/30 transition-all duration-300">
        <img
          src={`${game.background_image}`}
          className="w-full h-full object-cover brightness-50 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500 ease-out"
          alt={game.name}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
          <p className="text-center text-white font-bold text-base md:text-lg tracking-wide group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
            {game.name}
          </p>
        </div>
      </div>
    </>
  );
}
