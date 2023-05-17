# Faraway test task

Стэк: `Typescript, React, Redux, Material UI, Jest, ESLint`

Оптимизация:

- debounce с 600ms при вводе текста в строку поиска или смены фильтра, отменяет вызов если быстро вводить буквы в строку поиска
- 1 запрос для 80 карточек и локальная пагинация
- Jest тесты и Linter

Функционал: `Карточки, пагинация, поиск, фильтрация, страница карточки, добавление в wishlist`

## Preview

<img src="./preview.jpg" width="100%">

> Реализовал используя открытое [API The Rick and Morty](https://rickandmortyapi.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/favrora/react-api-task.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Build and run app:
   ```sh
   npm run start
   ```
4. App will run here => [http://localhost:3000](http://localhost:3000)
