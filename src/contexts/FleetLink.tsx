import React from 'react';
import { useSettings } from './Settings';
import { io, Socket } from "socket.io-client";

type SettingsContext = {
  link: Socket | null;
  error: any | null;
};

const FleetLink = React.createContext<SettingsContext>({
  link: null,
  error: null
});
FleetLink.displayName = 'FleetLink';

export const useFleetLink = () => React.useContext(FleetLink);

export const FleetLinkProvider = (props: { children: React.ReactNode }) => {
  const [Settings,] = useSettings();
  const [link, setLink] = React.useState<Socket|null>(null);
  const [error, setError] = React.useState<any|null>(null);
  React.useEffect(() => {
    let dead = false;
    let socket: Socket | null = null;
    function connect() {
      try {
        socket = io(Settings.backendURI, {
          auth: { token: Settings.backendKey }
        });
      } catch (err) {
        setError(err);
        return;
      }
      setError(null);
      setLink(socket);
      socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
          setTimeout(() => {
            if (dead) return;
            if (socket === null) {
              connect();
            } else {
              socket.connect();
            }
          }, 1000);
        }
      });
      socket.on('connect_error', (err) => {
        setError(err);
      });
    }
    if (Settings.backendURI === '') {
      setLink(null);
    } else {
      connect();
      return () => {
        dead = true;
        if (socket !== null) {
          socket.removeAllListeners();
          socket.disconnect();
        }
        setLink(null);
      };
    }
  }, [Settings.backendURI, Settings.backendKey]);
  return (
    <FleetLink.Provider value={{link, error}}>{props.children}</FleetLink.Provider>
  );
};

export default FleetLinkProvider;