const imagesArray = [
    {
      name: 'train',
      image: 'images/train.jpg',
    },
    {
      name: 'train2',
      image: 'images/train2.jpg',
    },
    {
      name: 'train3',
      image: 'images/train3.jpg',
    },
    {
      name: 'train4',
      image: 'images/train4.jpg',
    },
    {
      name: 'train5',
      image: 'images/train5.jpg',
    },
    {
      name: 'train6',
      image: 'images/train6.jpg',
    }
  ]
  const puzzleDesk = imagesArray
  .concat(imagesArray)
  .sort(() => 0.5 - Math.random());

let firstClick = '';
let secondClick = '';
let clicksCounter = 0;
let previousClick = null;
let delay = 1000;

const puzzle = document.getElementById('puzzle');
const desk = document.createElement('section');
desk.setAttribute('class', 'desk');
puzzle.appendChild(desk);

puzzleDesk.forEach(item => {
  const { name, image } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${image})`;

  desk.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const matched = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
       card.classList.add('matched');
  });
};

const resetClicks = () => {
  firstClick = '';
  secondClick = '';
  clicksCounter = 0;
  previousClick = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

desk.addEventListener('click', event => {
  const clicked = event.target;
  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousClick ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('matched')
  )
  { 
    return;
  }

  if (clicksCounter < 2) {
    clicksCounter++;
    if (clicksCounter === 1) {
      firstClick= clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondClick = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    if (firstClick && secondClick) {
      if (firstClick === secondClick) {
        setTimeout(matched, delay);
      }
      setTimeout(resetClicks, delay);
    }
    previousClick = clicked;
  }
});