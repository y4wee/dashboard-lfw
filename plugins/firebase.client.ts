import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth"
// import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database';

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: config.API_KEY,
        authDomain: config.AUTH_DOMAIN,
        databaseURL: config.public.DATABASE,
        projectId: config.PROJECT_ID,
        storageBucket: config.STORAGE_BUCKET,
        messagingSenderId: config.MESSAGING_SENDER_ID,
        appId: config.APP_ID,
      };

    const app = initializeApp(firebaseConfig);
    // console.log(firebaseConfig)
    // console.log(app)
    // console.log(config)
    // const auth = getAuth();
    // const firestore = getFirestore(app);
    const database = getDatabase(app);

    nuxtApp.provide('database', database);
    // nuxtApp.vueApp.provide('auth', auth);
    // nuxtApp.provide('auth', auth);

})