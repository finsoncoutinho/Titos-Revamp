// getDataFromLocalStorage takes (key) as parameter
// It returns extracted data from the localStorage with that key
export const getDataFromLocalStorage = (key) => {
  const dataFromLocalStorage = localStorage.getItem(key)
  const extractedData = JSON.parse(dataFromLocalStorage)

  return extractedData
}

// formatDate takes (date) as parameter
// It returns formated date ie. 04-04-2022
export const formatDate = (date) => {
  const formatedDate = `${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getFullYear()}`

  return formatedDate
}
