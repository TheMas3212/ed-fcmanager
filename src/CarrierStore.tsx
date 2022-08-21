import React from 'react';

export enum CarrierStoreActionTypes {
  AddCarrier = 'CarrierStoreActions/AddCarrier',
  DeleteCarrier = 'CarrierStoreActions/DeleteCarrier',
}

type AddCarrierAction = {
  type: CarrierStoreActionTypes.AddCarrier;
  carrier: Carrier;
}
type DeleteCarrierAction = {
  type: CarrierStoreActionTypes.DeleteCarrier;
  id: string;
}
type CarrierStoreActions = AddCarrierAction | DeleteCarrierAction;


export type Carrier = {
  id: string;
  name: string;
  location: string;
}

type CarrierStoreType = {
  [string: string]: Carrier;
}

type CarrierStoreContext = [
  store: CarrierStoreType,
  dispatch: React.Dispatch<CarrierStoreActions>
];

const CarrierStore = React.createContext<CarrierStoreContext>([{}, () => {}]);
CarrierStore.displayName = 'CarrierStore';

function reducer(state: CarrierStoreType, action: CarrierStoreActions) {
  switch (action.type) {
    case CarrierStoreActionTypes.AddCarrier: {
      return { ...state, [action.carrier.id] : action.carrier };
    }
    case CarrierStoreActionTypes.DeleteCarrier: {
      const newstate = { ...state };
      delete newstate[action.id];
      return newstate;
    }
    default: {
      let _: never = action;
      throw new Error(`Bad Action: ${action} on CarrierStore`);
    }
  }
}

export const useCarrierStore = () => React.useContext(CarrierStore);

export const CarrierStoreProvider = (props: { children: React.ReactNode, initialState: CarrierStoreType }) => {
  const [store, dispatch] = React.useReducer(reducer, props.initialState);

  return (
    <CarrierStore.Provider value={[store, dispatch]}>{props.children}</CarrierStore.Provider>
  );
};