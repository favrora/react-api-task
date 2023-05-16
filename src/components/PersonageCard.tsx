import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TablePagination,
  Typography,
  CardMedia,
  Grid,
  Box,
  Icon,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

import { makeStyles } from "@mui/styles";
import { ITableEntry } from "../models/interfaces";
import FavoriteIcon from "./FavoriteIcon";

interface IProps {
  data: ITableEntry[];
  rowsPerPage: number;
  page: number;
  searchMode: boolean;
  onFavorite: (name: string) => void;
  onClick: (v: string) => void;
  onPageChange: (_: any, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
  box: {
    position: "relative",
    transition: "box-shadow 0.2s ease",
    boxShadow: "0 0 30px rgba(1, 41, 112, 0.1019607843)",
    transitionDuration: "350ms",
    cursor: "pointer",
    borderRadius: "6px",
    overflow: "hidden",
    "&:hover": {
      boxShadow: "0 0 30px rgb(1 41 112 / 22%)",
      "& > .card-title": {
        color: "#0077FF",
      },
    },
  },
  nodata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    height: "100%",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 10px 10px",
    transitionDuration: "350ms",
  },
});

export default function PersonageCard(props: IProps) {
  const classes = useStyles();
  const { data, rowsPerPage, page, onPageChange, onRowsPerPageChange } = props;

  if (data.length === 0)
    return (
      <div className={classes.nodata}>
        <Icon sx={{ fontSize: 60 }}>data_array</Icon>
        <Typography>No data found</Typography>
      </div>
    );

  return (
    <Grid container item spacing={2} mt={3} pb={6}>
      {(!props.searchMode && rowsPerPage > 0
        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : data
      ).map((card) => (
        <Grid
          item
          xs={6}
          md={4}
          lg={3}
          key={card.name}
          onClick={() => props.onClick(card.id)}
        >
          <div className={classes.box}>
            <Box mb={2}>
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  minHeight: "150px",
                  filter: "brightness(0.8)",
                }}
                image={card.image}
              />
            </Box>
            <div className={`${classes.cardTitle} card-title`}>{card.name}</div>

            <FavoriteIcon
              favorite={card.favorite}
              onToggle={() => props.onFavorite(card.name)}
            />
          </div>
        </Grid>
      ))}

      {!props.searchMode && data.length > rowsPerPage && (
        <Grid item xs={12}>
          <Table>
            <TableBody>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 20, 30]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={props.searchMode ? -1 : rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowsPerPageChange}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      )}
    </Grid>
  );
}
