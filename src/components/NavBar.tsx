import React from "react";
import { AppBar, Toolbar, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "wouter";

const useStyles = makeStyles({
  root: {
    boxShadow: "0 0 9px #0000006e !important",
    background: "#0e1c2b !important",
  },
  logoText: {
    display: "none",
  },
});

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Link data-testid={"appbar-linkto-root"} to={"/"}>
          <CardMedia
            component="img"
            sx={{
              maxWidth: "150px",
              maxHeight: "70px",
            }}
            image={"./logo-text.svg"}
          />
          <span className={classes.logoText}>Faraway</span>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
