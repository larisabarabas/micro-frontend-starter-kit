'use client';
import React from 'react';
import { loadRemoteComponent } from '@/utils/loadRemoteComponent';
import { useEffect, useState } from 'react';


interface RemoteButtonProps {
  title: string;
  onClick?: () => void;
}


export default function HomePage() {
  const [RemoteButton, setRemoteButton] = useState<React.ComponentType<RemoteButtonProps> | null>(null);
  const remoteUrl = process.env.NEXT_PUBLIC_REMOTE_MFE_WIDGETS ?? "http://localhost:3005/remoteEntry.js";
  useEffect(() => {
    loadRemoteComponent(remoteUrl, 'mfeWidgets', './button')
    .then((module) => setRemoteButton(() => module.default))
    .catch((error) => console.error("Failed to load remote module:", error))
  }, [remoteUrl]);

  return (
    <div className='p-4'>
      <p className='font-bold text-2xl'>Host App (Next.js + Turbopack)</p>
      {RemoteButton ? <RemoteButton title="Loaded from Host" onClick={() => console.log("Clicked this button")} /> : <p>Loading remote button...</p>}
    </div>
  );
}
