import { MovieCard, type CinemaItem } from "./movie-card"

export function MovieShelf({ items }: { items: CinemaItem[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-cinema-text text-xl font-bold">Em cartaz</h2>
        <span className="text-cinema-primary text-xs font-bold">Ver todos</span>
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="border-cinema-border text-cinema-text-secondary rounded-xl border border-dashed p-8 text-center text-sm">
          Nenhum evento encontrado.
        </p>
      )}
    </section>
  )
}
