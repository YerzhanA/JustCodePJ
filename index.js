// - Все CRUD операции
// - Использовать как минимум 2 метода обхода массива
// - Валидация для пустого поля
// - Добавление в избранное

const input = document.querySelector('.input__main__header')
const imgPlus = document.querySelector('.img__plus')
const listItem = document.querySelector('.list__item')
const select = document.querySelector('.main__header__select')


//При загрузке страницы загружаем данные
document.addEventListener("DOMContentLoaded", () => {
  const listItem = document.querySelector('.list__item')
  for (let i = 0; i < localStorage.length; i++) {

    const data = localStorage.key(i);
    const itemValue = localStorage.getItem(data)
    const parsedData = JSON.parse(itemValue);

    //Создаем элемент и заполняем его
    const item = document.createElement('div')
    item.innerHTML = parsedData.elementHtml;
    item.className = data
    item.style.display = "flex"
    item.style.flexDirection = "row"
    item.style.justifyContent = "center"
    item.style.alignItems = "center"
    item.style.position = "relative"
    item.style.paddingBottom = "5px"

    //Проходимся по циклу добавляя события
    for (let i = 0; i < item.children.length; i++) {
      let childNode = item.children[i];

      if (childNode.className == "item_text" || childNode.className == "item_text active") {
        childNode.addEventListener('click', handleItemTextClick)
      }

      if (childNode.className == "item_favorite" || childNode.className == "item_favorite important") {
        childNode.addEventListener('click', handleItemFavotiteClick)
      }
      if (childNode.className == "item_delete") {
        childNode.addEventListener('click', handleDeleteElement)
      }
    }
    //Присоединяем к родителю
    listItem.append(item)
  }

  checkEmptyList()
});



function checkEmptyList() {
  const listItem = document.querySelector('.list__item')
  const counter = listItem.childElementCount;
  console.log(listItem)
  if (counter == 0) {
    let empty = document.createElement('div')
    empty.className = "empty";
    let h2 = document.createElement('h2')
    h2.innerText = "Список пуст"
    let img = document.createElement('img')
    img.className = "empty__img"
    img.src = "./image/otchet3.jpg"
    empty.append(h2);
    empty.append(img);

    listItem.append(empty);


  } else {
    let empty = document.querySelector('.empty')
    if (empty) {
      console.log(empty)
      console.log(listItem)
      listItem.removeChild(empty);
    }


  }

}
//Сортироовка
select.addEventListener('change', () => {
  let childrens = listItem.children;
  //Обновляем страницу
  getAllElements(childrens);

  if (select.value == "Done") {
    //все Выполненные задачи
    getDoneElement(childrens);

  } else if (select.value == "Favorite") {
    //Все избранные задачи
    getFavoriteElement(childrens);

  } else if (select.value == "Active") {
    //Все Активные задачи
    getActiveElement(childrens);

  }
  checkEmptyList()
})

function getDoneElement(childrens) {
  // Проходим по каждому элементу и добавляем дочерние элементы в массив
  for (let i = 0; i < childrens.length; i++) {
    let isActive = false;
    let nodeChildrens = childrens[i].children;

    for (let j = 0; j < nodeChildrens.length; j++) {
      if (nodeChildrens[j].className.includes('active')) {
        isActive = true;
        break;
      }
    }

    if (isActive) {
      isActive = false;
    } else {
      childrens[i].style.display = 'none'
    }
  }
  checkEmptyList()
}

function getFavoriteElement(childrens) {
  // Проходим по каждому элементу и добавляем дочерние элементы в массив
  for (let i = 0; i < childrens.length; i++) {

    let isActive = false;
    let nodeChildrens = childrens[i].children;

    for (let j = 0; j < nodeChildrens.length; j++) {
      if (nodeChildrens[j].className.includes('important')) {
        isActive = true;
        break;
      }
    }

    if (isActive) {
      isActive = false;
    } else {
      childrens[i].style.display = 'none'
    }
  }
  checkEmptyList()
}

function getActiveElement(childrens) {
  // Проходим по каждому элементу и добавляем дочерние элементы в массив
  for (let i = 0; i < childrens.length; i++) {
    let isActive = false;
    let nodeChildrens = childrens[i].children;

    for (let j = 0; j < nodeChildrens.length; j++) {

      if (nodeChildrens[j].className.includes('active')) {
        isActive = true;
        console.log(nodeChildrens[j].className)
        break;
      }
    }
    if (isActive) {
      childrens[i].style.display = 'none'
      isActive = false;
    }
  }
  checkEmptyList()
}

function getAllElements(childrens) {
  for (let i = 0; i < childrens.length; i++) {
    childrens[i].style.display = 'flex'
  }
  checkEmptyList()
}
function SaveLocalStorage(itemName, elementHtml) {
  // Создаем объект для хранения данных
  let data = {
    elementHtml: elementHtml.innerHTML
  };
  // Преобразуем объект в строку JSON
  let jsonData = JSON.stringify(data);
  // Сохраняем данные в localStorage
  console.log(itemName)
  localStorage.setItem(itemName, jsonData);

}


//Кнопка Добавления элемента в список
imgPlus.addEventListener('click', () => {


  if (input.value != '') {

    //Item
    const item = document.createElement('div')
    item.className = getRandomString(5) + " item" ////random number
    item.style.display = "flex"
    item.style.flexDirection = "row"
    item.style.justifyContent = "center"
    item.style.alignItems = "center"
    item.style.position = "relative"
    item.style.paddingBottom = "5px"
    //Text
    const itemText = document.createElement('div')
    itemText.className = "item_text"
    itemText.innerText = input.value;
    itemText.addEventListener('click', handleItemTextClick)
    //Delete
    const itemDelete = document.createElement('img')
    itemDelete.className = "item_delete"
    itemDelete.src = "./image/delete.png"
    itemDelete.addEventListener('click', handleDeleteElement)
    //Favorite
    const itemFavotite = document.createElement('img')
    itemFavotite.className = "item_favorite"
    itemFavotite.src = "./image/favotiteEmpty.png"
    itemFavotite.addEventListener('click', handleItemFavotiteClick)

    listItem.append(item)
    item.append(itemText)
    item.append(itemDelete)
    item.append(itemFavotite)
    console.log(item)
    SaveLocalStorage(item.className, item)
    input.value = ""
  }
  checkEmptyList()
})
function getRandomLetter() {
  var randomCharCode = Math.floor(Math.random() * 26) + 97; // Генерируем случайное число от 97 до 122 (коды символов для букв английского алфавита в нижнем регистре)
  var randomLetter = String.fromCharCode(randomCharCode); // Преобразуем код символа в соответствующую букву

  return randomLetter;
}

function getRandomString(length) {
  var randomString = '';

  for (var i = 0; i < length; i++) {
    var randomLetter = getRandomLetter(); // Генерируем случайную букву
    randomString += randomLetter; // Добавляем букву к строке
  }

  return randomString;
}

var randomLetter = getRandomLetter();
console.log(randomLetter); // Выводим случайную букву

function handleItemTextClick(event) {

  let itemTextImg = event.target;
  //меняем active добавляя или удаляя
  itemTextImg.classList.toggle('active');

  let data = {
    elementHtml: event.target.parentNode.innerHTML
  };
  // Преобразуем объект в строку JSON
  let jsonData = JSON.stringify(data);
  localStorage.setItem(event.target.parentNode.className, jsonData);
}

function handleItemFavotiteClick(event) {

  let itemFavotiteImg = event.target;

  if (itemFavotiteImg.src.match("./image/favorites_yellow.png")) {
    itemFavotiteImg.src = "./image/favotiteEmpty.png"
    itemFavotiteImg.classList.toggle('important');
  } else {
    itemFavotiteImg.src = "./image/favorites_yellow.png"
    itemFavotiteImg.classList.toggle('important');
  }

  let data = {
    elementHtml: event.target.parentNode.innerHTML
  };
  // Преобразуем объект в строку JSON
  let jsonData = JSON.stringify(data);
  localStorage.setItem(event.target.parentNode.className, jsonData);

}

function handleDeleteElement(event) {
  localStorage.removeItem(event.target.parentNode.className);
  event.target.parentNode.remove()
  checkEmptyList()
}










// установить значение
// localStorage.setItem('token', '123QWERTY');
// // установить значение
// const token = localStorage.getItem('token');
// console.log(token);
// const key = localStorage.key(0);
// console.log(key);
// localStorage.removeItem('token');
// localStorage.clear();

// setItem(key, value) – сохранить пару ключ/значение.
// getItem(key) – получить данные по ключу key.
// removeItem(key) – удалить данные с ключом key.
// clear() – удалить всё.
// key(index) – получить ключ на заданной позиции.
// length – количество элементов в хранилище.
