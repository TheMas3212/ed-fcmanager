import React from 'react';
import { useLocalStorageReducer } from '../hooks/useLocalStorage';

const localStorageKey = 'ed-fcmanager/settings';
const defaultSettings: Settings = {
  backendURI: '',
  backendKey: ''
};

type Settings = {
  backendURI: string;
  backendKey: string;
}

type SettingsContext = [
  store: Settings,
  dispatch: React.Dispatch<SetSettings>
];

type SetSettings = Partial<Settings>

const Settings = React.createContext<SettingsContext>([defaultSettings, () => {}]);
Settings.displayName = 'Settings';

function reducer(state: Settings, action: SetSettings): Settings {
  return { ...state, ...action };
}

function init(loadedState: any) {
  for (const key in loadedState) {
    if (!(key in defaultSettings)) {
      delete loadedState[key];
    }
  }
  return { ...defaultSettings, ...loadedState };
}

export const useSettings = () => React.useContext(Settings);

export const SettingsProvider = (props: { children: React.ReactNode }) => {
  const [store, dispatch] = useLocalStorageReducer(localStorageKey, reducer, defaultSettings, init);
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(store));
  }, [store]);
  return (
    <Settings.Provider value={[store, dispatch]}>{props.children}</Settings.Provider>
  );
};

export default SettingsProvider;