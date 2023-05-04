import {
  initialState,
  personageSlice,
  setFilter,
  setItemsPerPage,
  setPage,
  setSearchText,
  toggleFavoritePersonage,
} from "./personageSlice";

describe("Given i want to test the personage slice", function () {
  test("should return the initial state", () => {
    expect(personageSlice.reducer(undefined, { type: "" })).toEqual({
      favoritePersonages: [],
      filter: "all",
      isFetchingList: true,
      isFetchingPersonage: true,
      itemsPerPage: 10,
      page: 0,
      personage: {},
      personages: [],
      search: "",
    });
  });

  test("should add personage to favorite personages", () => {
    const state = personageSlice.reducer(
      undefined,
      toggleFavoritePersonage("bulbasaur")
    );

    expect(state.favoritePersonages).toEqual(["bulbasaur"]);
  });

  test("should remove personage to favorite personages", () => {
    const state = personageSlice.reducer(
      {
        ...initialState,
        favoritePersonages: ["bulbasaur"],
      },
      toggleFavoritePersonage("bulbasaur")
    );

    expect(state.favoritePersonages).toEqual([]);
  });

  test("should set the search text", () => {
    const state = personageSlice.reducer(undefined, setSearchText("bulbasaur"));

    expect(state.search).toEqual("bulbasaur");
  });

  test.each([
    ["all", "all"],
    ["favorite", "favorite"],
    ["remaining", "remaining"],
    ["unknown", "all"],
  ])('should set the correct filter "%s" -> "%s"', (filter, expected) => {
    const state = personageSlice.reducer(undefined, setFilter(filter));

    expect(state.filter).toEqual(expected);
  });

  test("should set the page", () => {
    const state = personageSlice.reducer(undefined, setPage(1));

    expect(state.page).toEqual(1);
  });

  test("should set the items per page", () => {
    const state = personageSlice.reducer(undefined, setItemsPerPage(10));

    expect(state.itemsPerPage).toEqual(10);
  });
});
