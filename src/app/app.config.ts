import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideAnimations } from '@angular/platform-browser/animations';
import { firebaseConfig } from './firebase.config';
import { Overlay } from "@angular/cdk/overlay";
import { MAT_DIALOG_SCROLL_STRATEGY } from "@angular/material/dialog";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideAnimations(),

    {
      provide: MAT_DIALOG_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.noop(), // Hier wird die Scrollstrategie konfiguriert
      deps: [Overlay]
    }
  ],
};