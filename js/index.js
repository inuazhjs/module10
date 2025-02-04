// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  fruitsList.innerHTML = '';
  // чтобы заполнить актуальными данными из fruits

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let fruitData = document.createElement('li');
    let fruitColor = '';
    switch (fruits[i]['color']) {
      case 'фиолетовый':
        fruitColor = 'fruit_violet';
        break;
      case 'зеленый':
        fruitColor = 'fruit_green';
        break;
      case 'розово-красный':
        fruitColor = 'fruit_carmazin';
        break;
      case 'желтый':
        fruitColor = 'fruit_yellow';
        break;
      case 'светло-коричневый':
        fruitColor = 'fruit_lightbrown';
        break;
      default:
    }
    fruitData.className = `fruit__item ${fruitColor}`;

    fruitData.innerHTML = `<div class="fruit__info">
                                <div>index: ${i}</div>
                                <div>color: ${fruits[i]['color']}</div>
                                <div>weight: ${fruits[i]['weight']}</div>
                                <div>fruit: ${fruits[i]['kind']}</div>
                            </div>`;
    fruitsList.appendChild(fruitData);
  }
};


// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива

    let refresh = getRandomInt(0, fruits.length - 1);
    result.push(fruits[refresh]);
    fruits.splice(refresh, 1);

    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let min = parseInt(document.querySelector(".minweight__input").value);
  let max = parseInt(document.querySelector(".maxweight__input").value);
  if (!isNaN(min) && !isNaN(min) && min <= max) {
    fruits = JSON.parse(fruitsJSON);
    fruits = fruits.filter((fruit) => {
      if (fruit.weight >= min && fruit.weight <= max) {
        return fruit;
      }
    });
  } else {
    divError('minimum weight/maximum weight');
  }
  return fruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return a.color.length >= b.color.length ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    left = comparation.a;
    right = comparation.b;

    quickFruitSort(arr, left, right);


  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  }
};;


// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if ((kindInput.value === '') || (weightInput.value === '') || (colorInput.value === '')) {
    alert('Не заполнено одно из полей')
  } else {
    fruits.push({
      "kind": kindInput.value,
      "color": colorInput.value,
      "weight": weightInput.value
    })
    display();
  }
});
