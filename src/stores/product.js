
const dataUrl = 'http://api.kf.mattstyles.me/product'

// Stateless fetch helper
class ProductStore {
  getProduct (id) {
    return fetch(`${dataUrl}/${id}`)
      .then(res => res.json())
      .then(res => {
        return res
      })
      .catch(err => {
        console.log('product fetch error')
        console.error(err)
      })
  }
}

export default new ProductStore()
