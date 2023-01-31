import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';

export const createUser = async (email: string, password: string): Promise<any> => {
    const { $auth } = useNuxtApp();
    try {
    const userCreds = await createUserWithEmailAndPassword($auth, email, password)
        if (userCreds) {
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
    // const router = useRouter();
  
    onAuthStateChanged($auth, (user) => {
      if (user) {
        // User is signed in
        // router.push("/home");
        currentUser.value = $auth.currentUser;
        getAllDocs();
      } else {
        //if signed out
        // router.push("/");
        currentUser.value = null;
        dataCandidacy.value = [];
      }
    });
};
  
  export const signOutUser = async () => {
    const { $auth } = useNuxtApp();
    const result = await $auth.signOut();
    return result;
  };

