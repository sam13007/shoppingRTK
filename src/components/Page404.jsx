import { Stack, Typography } from "@mui/material";
import React from "react";

function Page404() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "90vh", color: "#495057" }}
    >
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">Page not found</Typography>
    </Stack>
  );
}

export default Page404;
