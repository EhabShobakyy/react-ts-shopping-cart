import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { decrement } from "../redux/counter/CounterSlice";
import { useDispatch } from "react-redux";

type ModalCards = {
  id: number;
  name: string;
  src: string;
  price: number;
  quantity: number;
};

export default function ModalsCards({
  id,
  name,
  src,
  price,
  quantity,
}: ModalCards) {
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        padding: "16px 0px",
        background: "#e0e0e0",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <CardMedia
            sx={{
              height: 140,
              width: 200,
              borderRadius: "16px",
              marginLeft: "12px",
            }}
            image={src}
            title={name}
          />
        </Grid>
        <Grid item xs={6}>
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Typography gutterBottom variant="h5">
              {name}
            </Typography>
          </CardContent>
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Typography
              sx={{ fontSize: 12, pt: 0, color: "text.secondary" }}
              gutterBottom
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
              accusantium!
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid item xs={12}>
              <Typography variant="h6">Quantity : {quantity}</Typography>
            </Grid>
          </CardContent>
          <CardContent sx={{ display: "flex", pt: 0, pb: 0 }}>
            <Typography sx={{ mr: 2 }} variant="h6">
              Cart Total :
            </Typography>
            <Typography variant="h6">{`${price * quantity} $`}</Typography>
            <Button sx={{ ml: "auto", alignItems: "baseline", p: 0 }}>
              <DeleteIcon
                onClick={() => dispatch(decrement(id))}
                sx={{ color: "red" }}
              />
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
