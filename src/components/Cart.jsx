import { Box, Typography, Grid, styled, Stack, Button } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import {
  removeProduct,
  addProduct,
  subtractProduct,
  clearCart,
} from "../features/cartSlice";

const Item = styled(Typography)(() => ({
  fontFamily: "Nunito",
  textAlign: "left",
  paddingLeft: "10px",
}));

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: "40px" }}>
      <Typography
        variant="h4"
        sx={{ fontFamily: "Nunito", paddingBottom: "20px" }}
      >
        Shopping Cart
      </Typography>
      {cart.productsInCart.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item variant="h6">Product</Item>
          </Grid>
          <Grid item xs={2}>
            <Item variant="h6" sx={{ textAlign: "center" }}>
              Price
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item variant="h6" sx={{ textAlign: "center" }}>
              Quantity
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item variant="h6" sx={{ textAlign: "center" }}>
              Total
            </Item>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Typography variant="body1" sx={{ color: "grey" }}>
            No items in cart
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            sx={{ marginTop: "20px", color: "grey" }}
            onClick={() => navigate("/")}
          >
            Go back and shop
          </Button>
        </Box>
      )}

      {cart.productsInCart.map((product) => (
        <Grid
          container
          spacing={2}
          sx={{
            marginY: "20px",

            borderTop: "1px solid black",
          }}
          key={product.id}
        >
          <Grid item xs={6}>
            <Stack direction="row" gap={1}>
              <img
                src={product.image}
                alt={product.name}
                style={{ height: "150px", width: "150px" }}
              />
              <Stack alignItems="flex-start">
                <Item variant="h6">{product.name}</Item>
                <Item variant="body2">{product.desc}</Item>
                <Button
                  size="small"
                  sx={{ color: "grey", textTransform: "none" }}
                  onClick={() => dispatch(removeProduct(product))}
                >
                  Remove
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={2} alignSelf="center">
            <Item sx={{ textAlign: "center" }} variant="body1">
              ₹{product.price}
            </Item>
          </Grid>
          <Grid item xs={2} alignSelf="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(addProduct(product))}
              >
                +
              </Button>

              <Item
                sx={{ textAlign: "center", paddingX: "20px" }}
                variant="body1"
              >
                {product.quantity}
              </Item>
              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(subtractProduct(product))}
              >
                -
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={2} alignSelf="center">
            <Item sx={{ textAlign: "center" }} variant="body1">
              {product.price * product.quantity}
            </Item>
          </Grid>
        </Grid>
      ))}
      {cart.productsInCart.length > 0 ? (
        <Stack
          direction="row"
          sx={{ paddingX: "40px" }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Button
            variant="outlined"
            sx={{ color: "grey" }}
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>

          <Stack gap={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Subtotal</Typography>
              <Typography variant="h6">₹{cart.totalCost}</Typography>
            </Stack>

            <Typography
              variant="body1"
              sx={{ color: "grey", fontSize: "0.7rem" }}
            >
              Taxes and shipping calculated at checkout
            </Typography>

            <Button variant="contained">Check out</Button>
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{ color: "grey" }}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </Stack>
        </Stack>
      ) : null}
    </Box>
  );
}

export default Cart;
