import { CalendarDays, Film, MapPin } from "lucide-react"
import Link from "next/link"

export type CinemaItem = {
  id: string
  title: string
  description: string
  dateTime: string
  location: string
  bannerUrl?: string | null
  price?: number | null
}

type MovieCardProps = {
  item: CinemaItem
}

export function MovieCard({ item }: MovieCardProps) {
  const date = new Date(item.dateTime)

  const formattedDate = Number.isNaN(date.getTime())
    ? "Sessao em breve"
    : date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })

  return (
    <Link href={`/events/${item.id}`} className="group block min-w-0">
      <article className="border-cinema-border-subtle bg-cinema-surface group-hover:border-cinema-primary/40 overflow-hidden rounded-xl border transition-transform duration-300 group-hover:-translate-y-1">
        <div
          className="bg-cinema-surface-muted relative aspect-3/4 overflow-hidden bg-cover bg-center"
          style={
            item.bannerUrl
              ? { backgroundImage: `url(${item.bannerUrl})` }
              : undefined
          }
        >
          {!item.bannerUrl && (
            <Film className="text-cinema-text-muted absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2" />
          )}
          <div className="from-cinema-surface absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
        </div>
        <div className="space-y-2 p-4">
          <h3 className="text-cinema-text truncate text-sm font-bold sm:text-base">
            {item.title}
          </h3>
          <div className="text-cinema-text-secondary space-y-1 text-[11px]">
            <p className="flex items-center gap-1.5">
              <CalendarDays className="text-cinema-primary size-3.5" />
              {formattedDate}
            </p>
            <p className="flex items-center gap-1.5 truncate">
              <MapPin className="text-cinema-primary size-3.5 shrink-0" />
              {item.location}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
