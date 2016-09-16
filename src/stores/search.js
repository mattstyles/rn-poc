
const dataUrl = 'http://api.kf.mattstyles.me/search'

// Stateless fetch helper
class SearchStore {
  constructor () {
    this.data = null
  }

  getCategory (query) {
    return fetch(`${dataUrl}?category=${query}`)
      .then(res => res.json())
      .then(res => {
        return res
      })
      .catch(err => {
        console.log('category search fetch error')
        console.error(err)
      })
  }

  getQuery (query) {
    return fetch(`${dataUrl}?q=${query}&per_page=100`)
      .then(res => res.json())
      .then(res => {
        return res
      })
      .catch(err => {
        console.log('search fetch error')
        console.error(err)
      })
  }
}

export default new SearchStore()
