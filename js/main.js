document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('button')
  button.addEventListener('click', startGame)
})

const item = document.querySelectorAll('.item')
const itemGroup = document.querySelector('.item-group')
const title = document.querySelector('h1')
let count = 0

function startGame() {
  console.log('Game is starting...')
  count = 0
  item.forEach((item) => {
    item.style.backgroundColor = 'var(--color-primary)'
    item.style.backgroundImage = 'none'
  })
  itemGroup.style.boxShadow = '#0004 0 0 2rem'
  title.textContent = 'Color Matching Game'
  let colors = [
    'red',
    'red',
    'yellow',
    'yellow',
    'green',
    'green',
    'blue',
    'blue',
    'black'
  ]
  let randomColors = []
  while (randomColors.length <= 8) {
    var random = Math.floor(Math.random() * colors.length) // 0 - 8
    randomColors.push(colors[random])
    colors.splice(random, 1)
  }
  console.log(randomColors)
  for (let i = 0; i < item.length; i++) {
    item[i].setAttribute('data-color', randomColors[i])
    item[i].addEventListener('click', revealColor)
    console.log(item[i].getAttribute('data-color'))
  }
}

let firstColor = null
let firstItem = null

function revealColor() {
  const color = this.getAttribute('data-color')
  if (color === 'black') {
    console.log('Game over!')
    title.textContent = 'Game over!'
    count = 0
    firstColor = null
    this.style.backgroundImage = 'url("./images/bomb.png")'
    itemGroup.style.boxShadow = 'red 0 0 2rem'
    item.forEach((item) => {
      item.removeEventListener('click', revealColor)
    })
  } else if (firstColor === null) {
    firstColor = color
    firstItem = this
    this.style.backgroundColor = color
  } else if (color === firstColor && this !== firstItem) {
    console.log('Match!')
    title.textContent = 'Match!'
    firstColor = null
    this.style.backgroundColor = color
    itemGroup.style.boxShadow = 'green 0 0 2rem'
    count = count + 2
    console.log(count)
    setTimeout(() => {
      itemGroup.style.boxShadow = '#0004 0 0 2rem'
    }, 1000)
    this.removeEventListener('click', revealColor)
    if (count === 8) {
      console.log('You win!')
      title.textContent = 'You win!'
      item.forEach((item) => {
        item.removeEventListener('click', revealColor)
      })
    }
  } else if (color !== firstColor) {
    console.log('No match!')
    title.textContent = 'No match!'
    firstColor = null
    this.style.backgroundColor = color
    item.forEach((item) => item.removeEventListener('click', revealColor))
    setTimeout(() => {
      this.style.backgroundColor = 'var(--color-primary)'
      firstItem.style.backgroundColor = 'var(--color-primary)'
      item.forEach((item) => item.addEventListener('click', revealColor))
    }, 1000)
  }
}
