import React from "react";
import { Icon } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  starIcon: {
    color: "#ec0000",
    position: "absolute",
    zIndex: "10",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    background: "#ffffff",
    borderRadius: "50%",
    boxShadow: "0 0 6px 0 #00000026",
    padding: "3px",
    transitionDuration: "250ms",
    "&:hover": {
      boxShadow: "0 0 10px 0 #00000040",
    },
  },
});

interface IProps {
  onToggle: () => void;
  favorite: boolean;
}

export default function FavoriteIcon(props: IProps) {
  const classes = useStyles();
  const { favorite } = props;

  return (
    <Icon
      className={classes.starIcon}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onToggle();
      }}
    >
      {favorite ? "favorite" : "favorite_border"}
    </Icon>
  );
}
