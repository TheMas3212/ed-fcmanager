import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

type CounterProps = {
  enableHours: boolean;
  startTime: number | null;
  endTime: number | null;
};

function TimeDisplay({enableHours, startTime, endTime}: CounterProps) {
  const theme = useTheme();
  const [hour,   setHour  ] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const color = theme.palette.primary.main;

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime === null) {
        if (endTime === null) {
          setHour(0);
          setMinute(0);
          setSecond(0);
          clearInterval(interval);
          return;  
        } else {
          const sTime = Date.now();
          let time = new Date(endTime - sTime);
          if (endTime < sTime) {
            time = new Date(0);
          }
          setHour(time.getUTCHours());
          setMinute(time.getUTCMinutes());
          setSecond(time.getUTCSeconds());
          return;  
        }
      } else {
        if (endTime === null) {
          const eTime = Date.now();
          const time = new Date(startTime - eTime);
          setHour(time.getUTCHours());
          setMinute(time.getUTCMinutes());
          setSecond(time.getUTCSeconds());
          return;  
        } else {
          const time = new Date(endTime-startTime);
          setHour(time.getUTCHours());
          setMinute(time.getUTCMinutes());
          setSecond(time.getUTCSeconds());
          clearInterval(interval);
          return;
        }
      }
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, [startTime, endTime]);
  return (<Box display='flex'>
    {enableHours ? <><Typography color={color}>{hour.toString().padStart(2, '0')}</Typography><Typography color={color}>:</Typography></> : <></>}
    <Typography color={color}>{minute.toString().padStart(2, '0')}</Typography><Typography color={color}>:</Typography>
    <Typography color={color}>{second.toString().padStart(2, '0')}</Typography>
  </Box>);
}

export default TimeDisplay;