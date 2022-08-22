import React from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [state, setState] = React.useState<T>();
  if (state === undefined) {
    const loadedState = localStorage.getItem(key);
    if (loadedState !== null) {
      try {
        setState(JSON.parse(loadedState));
      } catch (err) {
        setState(defaultValue);
      }
    } else {
      setState(defaultValue);
    }
  }
  function setNewState(newState: T) {
    localStorage.setItem(key, JSON.stringify(newState));
    setState(newState);
  }
  return [state, setNewState];
}

export function useLocalStorageReducer<R extends React.Reducer<any, any>, I extends React.ReducerState<R>>(key: string, reducer: R, initialValue: I, initializer?: (arg: I) => I): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>] {
  const [state, dispatch] = React.useReducer<R, I>(reducer, initialValue, init);

  function init(initialState: I): React.ReducerState<R> {
    const loadedString = localStorage.getItem(key);
    let loadedState;
    if (loadedString !== null) {
      try {
        loadedState = JSON.parse(loadedString);
      } catch (err) {
        loadedState = initialState;
      }
    } else {
      loadedState = initialState;
    }
    if (initializer) {
      return initializer(loadedState);
    }
    return loadedState;
  }

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}