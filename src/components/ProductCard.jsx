import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { name, brand, image, price } = product;
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));

    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  return (
    <Card
      sx={{
        width: "300px",
        height: "450px",
      }}
    >
      <CardContent sx={{ padding: "10px" }}>
        <Typography
          gutterBottom
          variant="h4"
          sx={{ marginBottom: 0, fontFamily: "Nunito" }}
        >
          {name}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt={name}
        width="100%"
        height="60%"
        image={image}
        sx={{ objectFit: "contain" }}
      />

      <CardActions sx={{ justifyContent: "center", marginTop: "10px" }}>
        <Button
          size="medium"
          variant="contained"
          onClick={() => handleAddProduct(product)}
        >
          Add to cart
        </Button>
      </CardActions>
      <CardContent
        sx={{ display: "flex", justifyContent: "space-around", color: "grey" }}
      >
        <Typography sx={{ fontFamily: "Nunito" }}>₹{price}</Typography>
        <Typography sx={{ fontFamily: "Nunito" }}> {brand}</Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
