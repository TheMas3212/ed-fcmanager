import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

type GameClockProps = {
  full?: boolean
}

type MONTH_STATE = 'JAN' | 'FEB' | 'MAR' | 'APR' | 'MAY' | 'JUN' | 'JUL' | 'AUG' | 'SEP' | 'OCT' | 'NOV' | 'DEC';

const MONTHS: MONTH_STATE[] = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

function GameClock(props: GameClockProps) {
  const theme = useTheme();
  const [hour,   setHour  ] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [day,    setDay   ] = useState(0);
  const [month,  setMonth ] = useState<MONTH_STATE>('JAN');
  const [year,   setYear  ] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHour(now.getUTCHours());
      setMinute(now.getUTCMinutes());
      setSecond(now.getUTCSeconds());
      setDay(now.getUTCDate());
      setMonth(MONTHS[now.getUTCMonth()]);
      setYear(now.getUTCFullYear() + 1286);
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (<Box display='flex'>
    {props.full ? <>
      <Typography color={theme.palette.primary.main}>{day.toString().padStart(2, '0')}</Typography>
      <Typography color={theme.palette.primary.main}>-</Typography>
      <Typography color={theme.palette.primary.main}>{month}</Typography>
      <Typography color={theme.palette.primary.main}>-</Typography>
      <Typography color={theme.palette.primary.main}>{year.toString().padStart(4, '0')}</Typography>
      <Typography sx={{ width: 5 }} />
    </>: <></>}
    <Typography color={theme.palette.primary.main}>{hour.toString().padStart(2, '0')}</Typography>
    <Typography color={theme.palette.primary.main}>:</Typography>
    <Typography color={theme.palette.primary.main}>{minute.toString().padStart(2, '0')}</Typography>
    <Typography color={theme.palette.primary.main}>:</Typography>
    <Typography color={theme.palette.primary.main}>{second.toString().padStart(2, '0')}</Typography>
  </Box>);
}

export default GameClock;