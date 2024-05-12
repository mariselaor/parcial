import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.proyecto.nuevastendencias',
  appName: 'Productos',
  bundledWebRuntime: false,
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
