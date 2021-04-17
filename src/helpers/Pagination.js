export const Paginate = (infos) => {
  const itemsPerPage = 3
  const numberOfPages = Math.ceil(infos.length / itemsPerPage)
  const newinfos = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage
    return infos.slice(start, start + itemsPerPage)
  })
  return newinfos
}

export const NextPage = (setPage, rawPagination) => {
  setPage((oldPage) => {
    let nextPage = oldPage + 1
    if (nextPage > rawPagination.length - 1) {
      nextPage = 0
    }
    return nextPage
  })
}

export const PrevPage = (setPage, rawPagination) => {
  setPage((oldPage) => {
    let prevPage = oldPage - 1
    if (prevPage < 0) {
      prevPage = rawPagination.length - 1
    }
    return prevPage
  })
}

