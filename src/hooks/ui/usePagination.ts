import { useMemo, useState } from "react"

interface UsePaginationProps<T> {
  data: T[]
  itemsPerPage?: number
}

const usePagination = <T>({
  data,
  itemsPerPage = 3,
}: UsePaginationProps<T>) => {

  const [currentPage, setCurrentPage] =
    useState<number>(1)


  const totalPages = Math.max(
    1,
    Math.ceil(data.length / itemsPerPage)
  )


  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  )


  const paginatedData = useMemo(() => {

    const startIndex =
      (safeCurrentPage - 1) * itemsPerPage

    const endIndex =
      startIndex + itemsPerPage

    return data.slice(startIndex, endIndex)

  }, [data, safeCurrentPage, itemsPerPage])

  return {
    currentPage: safeCurrentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  }
}

export default usePagination