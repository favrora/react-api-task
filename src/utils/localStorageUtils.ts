const favoritePersonageKey = "personageFavorite";

export const getFavoritePersonage = () => {
  const result = localStorage.getItem(favoritePersonageKey);
  if (result) return JSON.parse(result);

  return [];
};

export const setFavoritePersonage = (values: string[]) => {
  localStorage.setItem(favoritePersonageKey, JSON.stringify(values));
};
