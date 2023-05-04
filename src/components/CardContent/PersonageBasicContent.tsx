import React from "react";
import { Typography } from "@mui/material";

interface IProps {
  location?: string;
  gender?: string;
  species?: string;
  status?: string;
}

export default function PersonageBasicContent(props: IProps) {
  const { location, gender, species, status } = props;

  return (
    <>
      <Typography variant="body2" color="text.secondary" marginBottom={1}>
        Location: {location || "-"}
      </Typography>
      <Typography variant="body2" color="text.secondary" marginBottom={1}>
        Gender: {gender || "-"}
      </Typography>
      <Typography variant="body2" color="text.secondary" marginBottom={1}>
        Species: {species || "-"}
      </Typography>
      <Typography variant="body2" color="text.secondary" marginBottom={1}>
        Status: {status || "-"}
      </Typography>
    </>
  );
}
