"use client"

import { useEffect, useState } from "react"
import Header from "../header"
import { Hero } from "./hero"
import type { CinemaItem } from "./movie-card"
import { MovieShelf } from "./movie-shelf"

const apiUrl = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333"
).replace(/\/$/, "")

export default function HomePage() {
  const [items, setItems] = useState<CinemaItem[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${apiUrl}/events`)
      .then((response) => {
        if (!response.ok) throw new Error("Falha ao carregar eventos")
        return response.json() as Promise<CinemaItem[]>
      })
      .then(setItems)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="bg-cinema-background min-h-screen">
      <Header onSearch={setQuery} />
      <main className="mx-auto max-w-360 space-y-10 px-5 py-7 sm:px-10 lg:px-16 lg:py-9">
        {loading ? (
          <div className="bg-cinema-surface-raised h-64 animate-pulse rounded-2xl" />
        ) : (
          <Hero item={filteredItems[0] ?? items[0]} />
        )}
        {error && (
          <p className="text-cinema-warning text-sm">
            Nao foi possivel conectar ao servidor. Verifique se a API esta
            rodando.
          </p>
        )}
        <MovieShelf items={filteredItems} />
      </main>
    </div>
  )
}
