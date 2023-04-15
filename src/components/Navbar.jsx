import { Badge, Typography, Stack, IconButton } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const quantity = useSelector((state) => state.cart.totalProducts);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: "10px 20px",
        backgroundColor: "#0b090a",
        color: "white",
        position: "sticky",
        top: 0,
      }}
      className="navbar"
    >
      <Link to="/">
        <Typography variant="h5" sx={{ fontFamily: "Nunito" }}>
          OnlineShopping
        </Typography>
      </Link>

      <Link to="/cart">
        <IconButton color="inherit">
          <Badge badgeContent={quantity} color="primary">
            <ShoppingCartIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Link>
    </Stack>
  );
}

export default Navbar;
