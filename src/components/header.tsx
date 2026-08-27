"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type HeaderProps = {
  onSearch: (value: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="border-cinema-border-subtle bg-cinema-background/95 border-b">
      <div className="mx-auto flex min-h-16 max-w-360 items-center gap-6 px-5 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="shrink-0"
          aria-label="TelonaPopTix, seu cinema do seu jeito"
        >
          <span className="text-cinema-primary block text-xl font-black tracking-[-0.04em] sm:text-2xl">
            TelonaPopTix
          </span>
          <span className="border-cinema-border-subtle text-cinema-text-secondary hidden border-l pl-3 text-[10px] font-medium tracking-[0.16em] uppercase sm:block">
            seu cinema, do seu jeito
          </span>
        </Link>

        <div className="relative mx-auto hidden w-full max-w-90 md:block">
          <Search className="text-cinema-text-muted absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input
            aria-label="Pesquisar filmes e gêneros"
            placeholder="Pesquisar filmes, gêneros..."
            className="bg-cinema-surface-raised text-cinema-text placeholder:text-cinema-text-muted focus-visible:ring-cinema-primary h-9 rounded-full border-0 pl-11 text-xs focus-visible:ring-1"
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>

        <Button
          render={<Link href="/login" />}
          className="bg-cinema-primary text-cinema-background hover:bg-cinema-primary-hover ml-auto h-9 rounded-lg px-5 text-xs font-bold"
        >
          Entrar
        </Button>
      </div>
    </header>
  )
}
