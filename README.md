# Faraway test task

Tech Stack: `Typescript, React, Redux, Material UI, Jest, ESLint`

Optimization:

- debounce with 600ms when entering text into the search bar or changing a filter, cancels the call if you quickly enter letters into the search bar
- 1 request for 80 cards and local pagination
- Jest tests and Linter

Functionality: `Cards, pagination, search, filtering, card page, adding to wishlist`

##Preview

<img src="./preview.jpg" width="100%">

> Implemented using open source [API The Rick and Morty](https://rickandmortyapi.com/)

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
