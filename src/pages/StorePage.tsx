import StoreItems from "../data/storeItems.json";
import StoreItemCom from "../components/StoreItemCom";
import { Grid } from "@mui/material";
function Store() {
  return (
    <>
      <h1>Store</h1>
      <Grid container spacing={3}>
        {StoreItems.map((item) => (
          <Grid
            item
            key={item.id}
            xs={12} // 1 item on extra-small (xs) screens
            sm={6} // 2 items on small (sm) screens
            md={4} // 3 items on medium (md) screens
          >
            <StoreItemCom {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Store;
