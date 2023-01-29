import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"
// import { getFirestore } from 'firebase/firestore'
// import { getDatabase } from 'firebase/database';

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: config.apikey,
        authDomain: config.authDomain,
        // databaseURL: "https://dashboard-lfw-default-rtdb.europe-west1.firebasedatabase.app/",
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
      };

    const app = initializeApp(firebaseConfig);
    console.log(firebaseConfig)
    console.log(app)
    console.log(config)
    const auth = getAuth(app);
    // const firestore = getFirestore(app);
    // const database = getDatabase(app);

    // nuxtApp.provide('database', database);
    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);

})