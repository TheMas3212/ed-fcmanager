import { Card, CardContent, Typography, CardActions, Button, Box, FormControl, InputLabel, NativeSelect, Grid } from "@mui/material";
import React from "react";
import CarrierInfo from "../components/CarrierInfo";
import TimeDisplay from "../components/TimerDisplay";
import { useCarrier, useCarrierStore } from "../contexts/CarrierStore";

enum Stage {
  IDLE,
  GET_TIME,
  SET_TARGET
};

function JumpTimer() {
  const [carrierID, setCarrierID] = React.useState('');
  const [carriers,] = useCarrierStore();
  const [carrier,] = useCarrier(carrierID);
  const [stage, setStage] = React.useState(Stage.IDLE);
  const [startTime, setStartTime] = React.useState(0);
  const [jumpTime, setJumpTime] = React.useState(0);

  function jumpTimes() {
    const start = (Math.floor(startTime / 10000) * 10000) + (14*60000);
    const buttons: React.ReactElement[] = [];
    for (let offset = 0; offset < 120000; offset += 10000) {
      buttons.push(<Grid item xs={1} key={start+offset}>
        <Button variant="outlined" fullWidth onClick={() => {
          setStage(Stage.SET_TARGET);
          setJumpTime(start+offset);
        }}>
          <TimeDisplay enableHours={false} startTime={null} endTime={start+offset}/>
        </Button>
      </Grid>);
    }
    return buttons;
  }

  const IDLE = (
  <Box justifyContent="center" display="flex" margin="5px">
    <Button variant="contained" sx={{ width: "90%" }} disabled={carrier === undefined} onClick={() => {
      setStage(Stage.GET_TIME);
      setStartTime(Date.now());
      }}>Jump</Button>
  </Box>
  );
  const GET_TIME = <>
  <Box marginX="15px" >
    <Grid container spacing={2} columns={3} justifyContent="space-between" alignItems="center">
      {jumpTimes()}
    </Grid>
  </Box>
  </>;
  const SET_TARGET = <>
  <Box justifyContent="center" display="flex" margin="5px">
    <TimeDisplay enableHours={false} startTime={null} endTime={jumpTime}/>
  </Box>

  </>;
  const current = [IDLE, GET_TIME, SET_TARGET][stage];

  return (
    <>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="carrier-id" shrink>
          Carrier ID
        </InputLabel>
        <NativeSelect
          defaultValue={''}
          inputProps={{
            name: 'carrierid',
            id: 'carrier-id'
          }}
          onChange={(event) => {
            setCarrierID(event.target.value);
            setStage(Stage.IDLE);
          }}
        >
          <option value=''>None</option>
          {Object.keys(carriers).map((id) => <option value={id}>{id}</option> )}
        </NativeSelect>
      </FormControl>
      <CarrierInfo carrierID={carrierID}/>
      {current}
    </>
  );
}

export default JumpTimer;