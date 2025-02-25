export async function loadRemoteComponent(remoteUrl: string, scope: string, module: string) {
    return new Promise<any>((resolve, reject) => {
      if (!(window as any)[scope]) {
        // Load the remote script dynamically
        const script = document.createElement('script');
        script.src = remoteUrl;
        script.async = true;
        script.onload = async () => {
          try {
            const factory = await (window as any)[scope].get(module);
            resolve(factory());
          } catch (error) {
            reject(error);
          }
        };
        script.onerror = () => reject(new Error(`Failed to load ${remoteUrl}`));
        document.body.appendChild(script);
      } else {
        // If already loaded, fetch the module directly
        (window as any)[scope].get(module).then((factory: any) => resolve(factory()));
      }
    });
  }

export async function loadRemoteComponentStyle<T = any>(
    remoteUrl: string,
    scope: string,
    module: string
  ): Promise<T> {
    if (!window[scope]) {
      const script = document.createElement('script');
      script.src = remoteUrl;
      script.async = true;
      document.body.appendChild(script);
  
      await new Promise((resolve) => {
        script.onload = resolve;
      });
    }
  
    const factory = await window[scope].get(module);
    const mod = factory();
  
    return mod as T;
  }
  