import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';

export const createUser = async (email: string, password: string): Promise<any> => {
    const { $auth } = useNuxtApp();
    try {
    const userCreds = await createUserWithEmailAndPassword($auth, email, password)
        if (userCreds) {
            addAvatar();
            return userCreds;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error;
        }
    }
};

export const signInUser = async (email: string, password: string): Promise<any> => {
    const { $auth } = useNuxtApp();
    try {
    const userCreds = await signInWithEmailAndPassword($auth, email, password)
        if (userCreds) {
            return userCreds;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error;
        }
    }
};

export const initUser = () => {
    const { $auth } = useNuxtApp()
    const currentUser = useCurrentUser();
    const dataCandidacy = useDataCandidacy();
    const router = useRouter();
    const route = useRoute();
    
    onAuthStateChanged($auth, (user) => {
      if (user) {
        // User is signed in
        router.push({ path: route.path === "/log" ? "/" : `${route.path}` })
        currentUser.value = {
            name: $auth.currentUser.displayName,
            email: $auth.currentUser.email,
            photoUrl: $auth.currentUser.photoURL,
        };
        readAllDocs();
        readAllUserInfo();
      } else {
        //if signed out
        router.push({ path: "/log" })

        currentUser.value = {};
        dataCandidacy.value = [];
      }
    });
};
  
// update User
export const updateUser = async (userParams: object): Promise<any> => {
    const { $auth } = useNuxtApp();
    const currentUser = useCurrentUser();

    try {
        await updateProfile($auth.currentUser, userParams);
        currentUser.value = {
            name: $auth.currentUser.displayName,
            email: $auth.currentUser.email,
            photoUrl: $auth.currentUser.photoURL,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error;
        }
    }
};

// logout user
export const signOutUser = async () => {
    const { $auth } = useNuxtApp();
    const result = await $auth.signOut();
    return result;
};

