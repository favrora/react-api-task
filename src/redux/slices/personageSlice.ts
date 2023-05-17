import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IListEntry } from "../../models/interfaces";
import { ApiBaseUrl, RequestedPersonages } from "../../models/constants";

import {
  getFavoritePersonage,
  setFavoritePersonage,
} from "../../utils/localStorageUtils";

type Personage = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "Unknown";
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "Unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

interface PersonageState {
  isFetchingList: boolean;
  isFetchingPersonage: boolean;
  personages: IListEntry[];
  search: string;
  favoritePersonages: string[];
  filter: "all" | "favorite" | "remaining";
  personage: Personage | Record<string, never>;
  page: number;
  itemsPerPage: number;
}

export const initialState: PersonageState = {
  isFetchingList: true,
  isFetchingPersonage: true,
  personages: [],
  favoritePersonages: getFavoritePersonage(),
  search: "",
  filter: "all",
  personage: {},
  page: 0,
  itemsPerPage: 10,
};

export const fetchAllPersonages = createAsyncThunk(
  "personage/fetchAll",
  async () => {
    console.log(RequestedPersonages);
    const response = await fetch(
      `${ApiBaseUrl}/character/${RequestedPersonages}`
    );

    const jsonResponse = await response.json();
    return jsonResponse;
  }
);

export const fetchPersonage = createAsyncThunk(
  "personage/fetch",
  async (personageId: string) => {
    const personageReq = await fetch(`${ApiBaseUrl}/character/${personageId}`);
    return await personageReq.json();
  }
);

export const personageSlice = createSlice({
  name: "personage",
  initialState,
  reducers: {
    toggleFavoritePersonage: (state, action: PayloadAction<string>) => {
      if (state.favoritePersonages.includes(action.payload)) {
        state.favoritePersonages.splice(
          state.favoritePersonages.indexOf(action.payload),
          1
        );
      } else {
        state.favoritePersonages.push(action.payload);
      }

      setFavoritePersonage(state.favoritePersonages);
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "all":
          state.filter = "all";
          break;
        case "favorite":
          state.filter = "favorite";
          break;
        case "remaining":
          state.filter = "remaining";
          break;
        default:
          state.filter = "all";
      }
      state.page = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllPersonages.fulfilled,
      (state, action: { payload: IListEntry[] }) => {
        state.isFetchingList = false;
        state.personages = action.payload;
      }
    );
    builder.addCase(fetchPersonage.pending, (state) => {
      state.personage = {};
    });
    builder.addCase(fetchPersonage.fulfilled, (state, action) => {
      state.isFetchingPersonage = false;
      state.personage = action.payload;
    });
  },
});

export const {
  toggleFavoritePersonage,
  setSearchText,
  setFilter,
  setPage,
  setItemsPerPage,
} = personageSlice.actions;
