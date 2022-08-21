import { Button, Card, CardActions, CardContent, Typography, useTheme } from "@mui/material";
import { useCarrierStore } from "../CarrierStore";

function CarrierInfoBrief(props: { carrierID: string }) {
  const [carriers, dispatchCarriers] = useCarrierStore();
  const carrier = carriers[props.carrierID];
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="text.secondary" variant="subtitle1">
          {carrier.id.toUpperCase()}
        </Typography>
        <Typography color="primary" variant="h5">
          {carrier.name.toUpperCase()}
        </Typography>
        <Typography color="secondary" variant="subtitle1">
          {carrier.location.toUpperCase()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default CarrierInfoBrief;