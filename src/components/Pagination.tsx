import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPage: number
  onPageChange: (page: number) => void
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "ellipsis")[] = [1]

  if (current > 3) pages.push("ellipsis")

  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i)
  }

  if (current < total - 2) pages.push("ellipsis")

  pages.push(total)
  return pages
}

function Pagination({ currentPage, totalPage, onPageChange }: PaginationProps) {
  if (totalPage <= 1) return null

  const pages = getPageNumbers(currentPage, totalPage)

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 px-3 h-9 text-sm text-muted-foreground border-border/60 hover:bg-muted/60 disabled:opacity-35"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </Button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex items-center justify-center w-9 h-9 text-muted-foreground/50 text-sm select-none"
          >
            ···
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 text-sm font-normal border-border/60
              ${currentPage === page
                ? "bg-foreground text-background hover:bg-foreground/90 font-medium border-foreground"
                : "hover:bg-muted/60"
              }`}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 px-3 h-9 text-sm text-muted-foreground border-border/60 hover:bg-muted/60 disabled:opacity-35"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default Pagination