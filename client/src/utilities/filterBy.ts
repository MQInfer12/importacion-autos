export const filterBy = (string: string, filter: string ) => {
  return string.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
}