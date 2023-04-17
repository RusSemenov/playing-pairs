document.addEventListener('DOMContentLoaded', () => {
  let array = [];
//Функция создания и перемешивания массива
  function createNumbersArray(count, fn) {
    let i = 1;
    for ( i; i <= count; i++ ) {
      array.push(i);
      array.push(i);
    }
    array = fn(array)
  }
//CallBack функция, которая перемешивает массив
  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr
  }

  createNumbersArray(8, shuffle)

//Функция, которая создает карточки и добавляет их в div
  function createCard(container, arr) {
    for (let i = 0; i < arr.length; i++) {
      const card = document.createElement('div')
      card.classList.add('card')
      card.textContent = arr[i];
      container.append(card)
    }
  }

  createCard(document.getElementById('game'), array);

//Функция, которая выполняется по клику
  let firstCard = null;
  let secondCard = null;
  function flipCard (e) {

    let currentName = e.target

    if (currentName === firstCard) return

    currentName.classList.add('open')

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.textContent !== secondCard.textContent) {
        firstCard.classList.remove('open')
        secondCard.classList.remove('open')
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = currentName
    } else {
      if (secondCard == null) {
        secondCard = currentName
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.textContent === secondCard.textContent) {
        firstCard.classList.add('success')
        secondCard.classList.add('success')
        firstCard = null;
        secondCard = null;
        currentName = null
      }
    }

    if (document.querySelectorAll('.card.success').length == array.length) {
      let btn = document.createElement('button');
      btn.classList.add('button')
      btn.textContent = 'Сыграть еще раз'
      document.getElementById('game').append(btn)
      btn.addEventListener('click', () => {
        restartGame()
      })
    }
  }
//Функция, перезапускающая игру
  function restartGame () {
    document.getElementById('game').innerHTML = ''
    array = []
    createNumbersArray(8, shuffle)
    createCard(document.getElementById('game'), array)
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', flipCard)
    })
  }

//Метод forEach, который проходит по каждой карточке и присваивает ей событие: 'click'
  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', flipCard)
  })
})




