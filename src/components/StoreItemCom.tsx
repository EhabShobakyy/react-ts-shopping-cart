import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../components/redux/Store"; // Import your store
import { decrement, increment } from "../components/redux/counter/CounterSlice";

type StoreItemProps = {
  id: number;
  name: string;
  src: string;
  price: number;
};

function StoreItemCom({ id, name, src, price }: StoreItemProps) {
  const quantity = useSelector(
    (state: RootState) => state.counter.items[id]?.quantity || 0
  ); // Get specific item's quantity from the store

  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Display item name and price in the CardHeader */}
      <CardHeader
        action={
          <IconButton aria-label="add to cart">
            <AddShoppingCart />
          </IconButton>
        }
        title={name}
        subheader={`$${price.toFixed(2)}`}
      />
      {/* Display item image */}
      <CardMedia component="img" height="194" image={src} alt={name} />
      {/* Display description */}
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`This is a great product, ${name}. Don't miss out on this amazing deal for only $${price.toFixed(
            2
          )}!`}
        </Typography>
        <Box sx={{ mx: "auto", mt: 2 }}>
          {quantity === 0 ? (
            <Button
              sx={{ width: 1, background: "#1976d240" }}
              onClick={() =>
                dispatch(
                  increment({ id, name, price, src }) // Dispatch increment with item details
                )
              }
            >
              Add to Cart
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                <Button
                  onClick={() => dispatch(decrement(id))} // Decrement specific item
                  sx={{ background: "#1976d240", mr: 2 }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <span>
                  {quantity} Item{quantity > 1 ? "s" : ""} in Cart
                </span>
                <Button
                  onClick={() =>
                    dispatch(
                      increment({ id, name, price, src }) // Increment specific item
                    )
                  }
                  sx={{ background: "#1976d240", ml: 2 }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </div>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default StoreItemCom;
