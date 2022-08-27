import React from 'react';

type TimerContext = {
  display: {
    startTime: number | null;
    endTime: number | null;
  };
  controls: {
    start: () => void;
    stop: () => void;
    resume: () => void;
    reset: () => void;
  };
};

type Timer = {
  context: React.Context<TimerContext>;
  value: TimerContext;
}

export function createTimer() {
  const context = React.createContext<TimerContext>({ display: { startTime: null, endTime: null }, controls: { start: ()=>{}, stop: ()=>{}, resume: ()=>{}, reset: ()=>{} }});
  const useContext = () => React.useContext(context);

  return { context, useContext };
}
export function Timer({ context, value, children }: { context: React.Context<TimerContext>, value: TimerContext, children: React.ReactNode }) {
  return <context.Provider value={value}>{children}</context.Provider>;
}

