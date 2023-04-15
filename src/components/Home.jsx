import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncProduct } from "../features/productSlice";
import ProductCard from "./ProductCard";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(asyncProduct()); // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ marginTop: "40px" }}>
      {products.loading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-around"
          flexWrap="wrap"
          gap="20px"
        >
          {products.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default Home;
