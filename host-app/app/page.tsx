'use client';

import { loadRemoteComponent } from '@/utils/loadRemoteComponent';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [RemoteButton, setRemoteButton] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    loadRemoteComponent("http://localhost:3005/remoteEntry.js", 'mfeWidgets', './button')
    .then((module) => setRemoteButton(() => module.default))
    .catch((error) => console.error("Failed to load remote module:", error))
  }, []);

  return (
    <div>
      <p className='font-bold text-2xl'>Host App (Next.js + Turbopack)</p>
      {RemoteButton ? <RemoteButton /> : <p>Loading remote button...</p>}
    </div>
  );
}
