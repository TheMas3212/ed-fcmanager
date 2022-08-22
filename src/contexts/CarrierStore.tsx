import React from 'react';
import { Socket } from 'socket.io-client';
import { useLocalStorageReducer } from '../hooks/useLocalStorage';
import { useFleetLink } from './FleetLink';

const localStorageKey = 'ed-fcmanager/carriers';

export enum CarrierStoreActionTypes {
  AddCarrier = 'CarrierStoreActions/AddCarrier',
  DeleteCarrier = 'CarrierStoreActions/DeleteCarrier',
  UpdateCarrier = 'CarrierStoreActions/UpdateCarrier',
  UpdateCarriers = 'CarrierStoreActions/UpdateCarriers'
}

type AddCarrierAction = {
  type: CarrierStoreActionTypes.AddCarrier;
  carrier: Carrier;
  remote: boolean;
}
type DeleteCarrierAction = {
  type: CarrierStoreActionTypes.DeleteCarrier;
  id: string;
  remote: boolean;
}
type UpdateCarrierAction = {
  type: CarrierStoreActionTypes.UpdateCarrier;
  carrier: Carrier;
  remote: boolean;
}
type UpdateCarriersAction = {
  type: CarrierStoreActionTypes.UpdateCarriers;
  carriers: CarrierStoreType;
  remote: boolean;
}
type CarrierStoreActions = AddCarrierAction | DeleteCarrierAction | UpdateCarrierAction | UpdateCarriersAction;


export type Carrier = {
  id: string;
  name: string;
  location: string;
  lastUpdate: number;
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

function fleetLinkActive(fleetLink: Socket | null): fleetLink is Socket {
  return fleetLink !== null && fleetLink.connected;
}

export const useCarrierStore = () => React.useContext(CarrierStore);

export const CarrierStoreProvider = (props: { children: React.ReactNode }) => {
  const [store, dispatch] = useLocalStorageReducer(localStorageKey, reducer, {});
  const { link: fleetLink, error: fleetLinkError } = useFleetLink();

  function reducer(state: CarrierStoreType, action: CarrierStoreActions) {
    switch (action.type) {
      case CarrierStoreActionTypes.AddCarrier: {
        if (!action.remote && fleetLinkActive(fleetLink)) fleetLink.emit('fcmanager:carrier:add', action.carrier);
        return { ...state, [action.carrier.id] : action.carrier };
      }
      case CarrierStoreActionTypes.DeleteCarrier: {
        if (!action.remote && fleetLinkActive(fleetLink)) fleetLink.emit('fcmanager:carrier:delete', action.id);
        const newstate = { ...state };
        delete newstate[action.id];
        return newstate;
      }
      case CarrierStoreActionTypes.UpdateCarrier: {
        if (!action.remote && fleetLinkActive(fleetLink)) fleetLink.emit('fcmanager:carrier:update', action.carrier);
        return { ...state, [action.carrier.id]: action.carrier };
      }
      case CarrierStoreActionTypes.UpdateCarriers: {
        if (!action.remote && fleetLinkActive(fleetLink)) fleetLink.emit('fcmanager:carrier:updateMany', action.carriers);
        return { ...state, ...action.carriers };
      }
      default: {
        let _: never = action;
        throw new Error(`Bad Action: ${action} on CarrierStore`);
      }
    }
  }

  React.useEffect(() => {
    if (fleetLink === null) {
      return;
    }
    function eventAllCarriers(remoteStore: CarrierStoreType) {
      const localCarriers = Object.keys(store);
      const remoteCarriers = Object.keys(remoteStore);
      const remoteUpdate: CarrierStoreType = {};
      const localUpdate: CarrierStoreType = {};
      for (const id of localCarriers) {
        if (store[id].lastUpdate > remoteStore[id].lastUpdate) {
          remoteUpdate[id] = store[id];
        }
      }
      for (const id of remoteCarriers) {
        if (remoteStore[id].lastUpdate > store[id].lastUpdate) {
          localUpdate[id] = remoteStore[id];
        }
      }
      dispatch({ type: CarrierStoreActionTypes.UpdateCarriers, carriers: localUpdate, remote: true });
      if (fleetLinkActive(fleetLink)) fleetLink.emit('fcmanager:allcarriers', remoteUpdate);
    }
    function eventUpdateCarrier(carrier: Carrier) {
      if (carrier.lastUpdate > store[carrier.id].lastUpdate) {
        dispatch({ type: CarrierStoreActionTypes.UpdateCarrier, carrier, remote: true });
      }
    }
    fleetLink.on('fcmanager:allcarriers', eventAllCarriers);
    fleetLink.on('fcmanager:carrier', eventUpdateCarrier);
    fleetLink.emit('fcmanager:carriers:init');
    return () => {
      fleetLink.off('fcmanager:allcarriers', eventAllCarriers);
      fleetLink.off('fcmanager:carrier', eventUpdateCarrier);
    };
  }, [fleetLink, fleetLinkError]);
  return (
    <CarrierStore.Provider value={[store, dispatch]}>{props.children}</CarrierStore.Provider>
  );
};