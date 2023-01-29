import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

export const createUser = async (email: string, password: string): Promise<any> => {
    const { $auth } = useNuxtApp()
    try {
    const userCreds = await createUserWithEmailAndPassword($auth, email, password)
        if (userCreds) {
            return userCreds
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error
        }
    }
}

