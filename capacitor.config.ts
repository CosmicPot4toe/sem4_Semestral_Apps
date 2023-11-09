import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'RegistrAPP',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
,
    android: {
       buildOptions: {
          keystorePath: 'c:\\Users\\CETECOM\\Documents\\GitHub\\sem4_Semestral_Apps\\RegistrAPP.keystore.jks',
          keystoreAlias: 'RegistrAPP',
       }
    }
  };

export default config;
