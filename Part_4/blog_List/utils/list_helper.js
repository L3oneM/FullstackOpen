const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1
}

const totalLikes = list => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return list.reduce(reducer, 0)
}

const favoriteBlog = list => {
  if (list.length === 0) {
    return 0
  } else if (list.length === 1) {
    return list[0]
  }
  return list.reduce((max, value) => {
    return max.likes > value.likes ? max : value
  })
}

const mostBlogs = list => {

  if (list.length === 0) {
    return 0
  }

  const counter = _.countBy(list, 'author')
  console.log(counter)

  const max = {
    author: '',
    blogs: 0
  }

  for (let author in counter) {
    if (max.blogs < counter[author]) {
      max.author = author
      max.blogs = counter[author]
    }
  }
  return max
}

const mostLikes = list => {
  if (list.length === 0) {
    return 0
  }

  const likesArray = _.groupBy(list, 'author')
  console.log(likesArray, 'likesArray')

  const mostLikesCounter = []

  _.forEach(likesArray, (value, key) => {
    const counter = {
      author: key
    }
    counter.likes = value.reduce((count,v) => {
      return count + v.likes
    }, 0)
    mostLikesCounter.push(counter)
  })
  return(_.maxBy(mostLikesCounter, 'likes'))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}