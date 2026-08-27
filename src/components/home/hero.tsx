import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import type { CinemaItem } from "./movie-card"

export function Hero({ item }: { item?: CinemaItem }) {
  return (
    <section className="border-cinema-hero bg-cinema-hero relative isolate overflow-hidden rounded-2xl border px-6 py-12 sm:px-10 lg:min-h-64 lg:px-12">
      {item?.bannerUrl && (
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${item.bannerUrl})` }}
        />
      )}
      <div className="from-cinema-hero via-cinema-hero/90 absolute inset-0 -z-10 bg-linear-to-r to-transparent" />
      <div className="relative max-w-xl space-y-5">
        <p className="text-cinema-primary text-[11px] font-bold tracking-[0.18em] uppercase">
          Em destaque
        </p>
        <h1 className="text-cinema-text text-3xl font-black tracking-tight sm:text-4xl">
          {item?.title ?? "Encontre seu proximo evento"}
        </h1>
        <p className="text-cinema-text-secondary line-clamp-2 text-sm leading-6">
          {item?.description ||
            "As melhores historias e experiencias estao esperando por voce."}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-cinema-surface-raised text-cinema-text rounded-full px-4 py-2 text-xs font-medium">
            Experiencias ao vivo
          </span>
          {item && (
            <Button
              render={<Link href={`/events/${item.id}`} />}
              className="bg-cinema-primary text-cinema-background hover:bg-cinema-primary-hover h-10 rounded-lg px-5 text-xs font-bold"
            >
              Garantir ingresso <ArrowRight className="ml-2 size-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
