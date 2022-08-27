import { Box, Button, Card, CardActions, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";
import { useCarrier } from "../contexts/CarrierStore";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


function CarrierInfo(props: { carrierID: string }) {
  const [carrier,] = useCarrier(props.carrierID);
  const [activeArrow, setActiveArrow] = React.useState(0);

  const arrowCount = 7;

  const elements = React.useMemo(function arrows() {
    const elements = [];
    for (let i = 0; i <= arrowCount; i++) {
      elements.push(<Typography sx={{  }} component="span" key={i} color={i === activeArrow ? "secondary" : "#444"}><DoubleArrowIcon /></Typography>);
    }
    elements.pop();
    return elements;
  }, [activeArrow, arrowCount]);

  React.useEffect(() => {
    if (carrier?.jumpTime !== -1) {
      const interval = setInterval(() => {
        setActiveArrow(state => (state+1) % arrowCount);
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [carrier?.jumpTime]);


  if (carrier === undefined) {
    return <Card variant="outlined">
      <CardContent>
        <Typography color="primary" variant="h5">Invalid Carrier ID</Typography>
      </CardContent>
    </Card>;
  }
  const currentLocation = <Typography component="span" color="secondary">{carrier.location.toUpperCase()}</Typography>;
  return (
    <Card variant="outlined">
      <CardContent>
        <>
          <Typography color="text.secondary">
            {carrier.id.toUpperCase()}
          </Typography>
          <Typography color="primary">
            {carrier.name.toUpperCase()}
          </Typography>
          {carrier.jumpTime === -1 ? <Box marginX="25px">{currentLocation}</Box> : (
            <Box sx={{ alignContent: "stretch", alignItems: "stretch", justifyContent: "space-between" }} display="flex" marginX="25px">
              {currentLocation}
              {elements}
              <Typography component="span" color="secondary">{carrier.jumpTarget.toUpperCase()}</Typography>
            </Box>
          )}
        </>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default CarrierInfo;