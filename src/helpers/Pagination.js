export const Paginate = (infos) => {
  const itemsPerPage = 3
  const numberOfPages = Math.ceil(infos.length / itemsPerPage)
  const newinfos = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage
    return infos.slice(start, start + itemsPerPage)
  })
  return newinfos
}
