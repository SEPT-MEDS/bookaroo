const API_ADDRESS = 'https://openlibrary.org'

// Used to request book details from the OpenLibrary API
export const getOLBookDetails = async isbn => {
  const response = await window.fetch(`${API_ADDRESS}/isbn/${isbn}.json?jscmd=data`)
  const details = await response.json()
  if (details?.authors?.length) {
    const response = await window.fetch(`${API_ADDRESS}${details.authors[0].key}.json`)
    const author = await response.json()
    return {...details, author}
  }
  return details
}
