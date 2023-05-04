import React, { useEffect } from "react";
import { Link, useRoute } from "wouter";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Icon,
  Grid,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchPersonage,
  toggleFavoritePersonage,
} from "../redux/slices/personageSlice";

import PersonageBasicContent from "../components/CardContent/PersonageBasicContent";
import FavoriteIcon from "../components/FavoriteIcon";

const useStyles = makeStyles({
  root: {
    display: "grid !important",
    placeContent: "center",
    margin: "16px 0",
    alignItems: "start !important",
  },
  content: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    width: "-webkit-fill-available",
    padding: "32px !important",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  toolbar: {
    display: "flex",
    position: "relative",
    paddingBottom: "12px",
    marginBottom: "16px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    "& > span:first-of-type": {
      cursor: "pointer",
      transitionDuration: "350ms",
      padding: "3px",
      borderRadius: "50%",
      "&:hover": {
        background: "#00000014",
      },
    },
  },
  loader: {
    height: "100vh",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});

export default function PersonageDetail() {
  const [, params] = useRoute("/:id");
  const id = params?.id;
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const personage = useAppSelector((s) => s.personage.personage);
  const favoritePersonage = useAppSelector(
    (s) => s.personage.favoritePersonages
  );
  const isFetchingPersonage = useAppSelector(
    (p) => p.personage.isFetchingPersonage
  );
  const wasFavorite = favoritePersonage.includes(personage?.name);

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonage(id));
    }
  }, [id]);

  if (isFetchingPersonage) {
    return (
      <div className={classes.loader}>
        <Box>
          <CircularProgress size={100} variant="determinate" value={100} />
        </Box>
      </div>
    );
  }

  return (
    <Container className={classes.root}>
      {personage.id && (
        <Card
          sx={{
            display: "flex",
            alignItems: "start",
            boxShadow: "0 0 30px #0129701a",
          }}
        >
          <CardContent className={classes.content}>
            <Grid container item spacing={2} pb={2}>
              <Grid item xs={12} md={6}>
                <div className={classes.toolbar}>
                  <Link to={"/"}>
                    <Icon>arrow_back</Icon>
                  </Link>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    marginLeft={1}
                  >
                    {personage.name}
                  </Typography>
                </div>
                <PersonageBasicContent
                  location={personage.location.name}
                  gender={personage.gender}
                  status={personage.status}
                  species={personage.species}
                />
              </Grid>

              <Grid item xs={12} md={6} sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  sx={{
                    maxWidth: "400px",
                    boxSizing: "border-box",
                  }}
                  image={personage.image}
                />
                <FavoriteIcon
                  favorite={wasFavorite}
                  onToggle={() =>
                    dispatch(toggleFavoritePersonage(personage.name))
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
