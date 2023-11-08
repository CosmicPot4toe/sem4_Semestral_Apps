# sem4_Semestral_Apps

la clave del keystore es: 123gallitoingles

install firebase and @angular/fire 
```cmd
npm i firebase
ng add @angular/fire
```
if `ng add` doesn't work do
```cmd
npm i @angular/fire
```


shit added by `ng add` on app.module.ts

```ts
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
...
    @NgModule({
        ...
        imports:[
            ...
            provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
            provideAuth(() => getAuth()),
            provideFirestore(() => getFirestore())]
    })
```