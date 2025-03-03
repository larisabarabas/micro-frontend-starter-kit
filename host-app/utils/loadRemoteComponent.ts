// TODO: defined ALLOWED_DOMAINS and check inside loadRemoteComponent if the remoteURL is a trusted source
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
    try {
        if (!(window as any)[scope]) {
          const script = document.createElement('script');
          script.src = remoteUrl;
          script.async = true;
          
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load style from ${remoteUrl}`));
            document.body.appendChild(script);
          });
        }
        
        const factory = await (window as any)[scope].get(module);
        const mod = factory();
        
        return mod as T;
      } catch (error) {
        console.error(`Failed to load remote component style from ${remoteUrl}:`, error);
        throw error;
      }
  }
  