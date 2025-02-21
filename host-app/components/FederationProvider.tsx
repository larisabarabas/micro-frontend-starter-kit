"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { init, getRemoteInfo } from "@module-federation/runtime";

const FederationContext = createContext({ isReady: false });

export function FederationProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initializeFederation() {
      try {
        console.log("Initializing Module Federation...");
  
        await init({
          name: "hostApp",
          remotes: [
            {
              name: "widgets",
              entry: "http://mfe-widgets.localhost:5001/remoteEntry.js", // Ensure this is accessible
            },
          ],
        });
        console.log("Module Federation Initialized Successfully");
        console.log("Registered remotes:", getRemoteInfo)
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize federation:", error);
      }
    }
  
    initializeFederation();
  }, []);
  

  if (!isReady) return <div>Loading micro-frontends...</div>;

  return (
    <FederationContext.Provider value={{ isReady }}>
      {children}
    </FederationContext.Provider>
  );
}

export function useFederation() {
  return useContext(FederationContext);
}
