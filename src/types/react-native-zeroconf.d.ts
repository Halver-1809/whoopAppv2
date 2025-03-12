declare module 'react-native-zeroconf' {
  export type ZeroconfService = {
    name: string;
    type: string;
    protocol: string;
    domain: string;
    host: string;
    addresses: string[];
    port: number;
  };

  export default class Zeroconf {
    constructor();
    scan(type?: string, protocol?: string, domain?: string): void;
    stop(): void;
    removeListeners(): void;
    on(
      event:
        | 'start'
        | 'stop'
        | 'update'
        | 'found'
        | 'remove'
        | 'resolved'
        | 'error',
      callback: (service: ZeroconfService) => void
    ): void;
  }
}
