
const dataUrl = 'http://api.kf.mattstyles.me/catalog'
// const dataUrl = 'http://localhost:3000/catalog'

const createNode = node => {
  return {
    text: node.name,
    type: node.children ? 'category' : 'product'
  }
}

const walker = ({key, data}) => {
  // If no key supplied then provide the tree root
  if (!key) {
    return data.children.map(createNode)
  }

  // Use reducer to depth-first search the tree for the
  // corresponding key path
  let path = key.split('.')
  let roots = path.reduce((root, segment) => {
    return root.children.find(child => child.name === segment)
  }, data)

  // Return just the names for now
  return roots.children.map(createNode)
}

class CatalogStore {
  constructor () {
    this.data = null
  }

  fetch () {
    return fetch(dataUrl)
      .then(res => res.json())
      .then(res => {
        this.data = res[0]
        return this.data
      })
      .catch(err => {
        console.log('fetch error')
        console.error(err)
      })
  }

  get (key) {
    if (!this.data) {
      return this.fetch()
        .then(data => walker({
          key: key,
          data: data
        }))
    }

    // Cage zalgo
    return Promise.resolve(walker({
      key: key,
      data: this.data
    }))
  }
}

export default new CatalogStore()
