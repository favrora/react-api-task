import React from "react";
import { useLocation } from "wouter";
import {
  Container,
  Icon,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Box,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ITableEntry } from "../models/interfaces";

import PersonageCard from "../components/PersonageCard";
import {
  setFilter,
  setItemsPerPage,
  setPage,
  setSearchText,
  toggleFavoritePersonage,
} from "../redux/slices/personageSlice";

const useStyles = makeStyles({
  root: {
    height: window.innerHeight - 128,
    padding: "0 2px",
    margin: "16px 0",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > div:not(:last-of-type)": {
      marginRight: "16px",
    },
  },
  loader: {
    height: "100vh",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});

const SEARCH_MODE_LENGTH = 2;

export default function PersonageList() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [, setLocation] = useLocation();
  const personages = useAppSelector((s) => s.personage.personages);
  const filter = useAppSelector((s) => s.personage.filter);
  const rowsPerPage = useAppSelector((p) => p.personage.itemsPerPage);
  const page = useAppSelector((p) => p.personage.page);
  const isFetchingList = useAppSelector((p) => p.personage.isFetchingList);
  const search = useAppSelector((s) => s.personage.search);
  const favorite = useAppSelector((s) => s.personage.favoritePersonages);

  let data =
    personages && search.length >= SEARCH_MODE_LENGTH
      ? personages.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      : personages;

  if (filter === "favorite") {
    data = data.filter((p) => favorite.includes(p.name));
  } else if (filter === "remaining") {
    data = data.filter((p) => !favorite.includes(p.name));
  }

  const onPageChange = (_: any, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const onRowsPerPageChange = (event: any) => {
    dispatch(setItemsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  if (isFetchingList) {
    return (
      <div className={classes.loader}>
        <Box>
          <CircularProgress size={100} variant="determinate" value={100} />
        </Box>
      </div>
    );
  }

  return (
    <Container className={classes.root} maxWidth={"xl"}>
      <div className={classes.toolbar}>
        <Tooltip title={"Please enter at least 2 characters to search"}>
          <TextField
            variant={"outlined"}
            placeholder={"Search Personage"}
            value={search}
            onChange={(v) => {
              dispatch(setSearchText(v.target.value));
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
        <Select
          value={filter}
          onChange={(v) => dispatch(setFilter(v.target.value))}
        >
          <MenuItem value={"all"}>Show all</MenuItem>
          <MenuItem value={"favorite"}>Show favorite only</MenuItem>
          <MenuItem value={"remaining"}>Show not favorite</MenuItem>
        </Select>
      </div>
      <PersonageCard
        searchMode={search.length >= SEARCH_MODE_LENGTH}
        data={data.map(
          (personage) =>
            ({
              name: personage.name,
              id: personage.id,
              image: personage.image,
              favorite: favorite.includes(personage.name),
            } as ITableEntry)
        )}
        onFavorite={(value) => dispatch(toggleFavoritePersonage(value))}
        onClick={(v) => {
          setLocation(`/${v}`);
        }}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Container>
  );
}
