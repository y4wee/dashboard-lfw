import { doc, collection, addDoc, query, getDocs, updateDoc  } from "firebase/firestore"; 

// ajout d'un nouveau doc à la collection
export const addToCollection = async (candidacy: object) => {
    const { $firestore, $auth } = useNuxtApp();

    try {
        const docRef = await addDoc(collection($firestore, `${$auth.currentUser.uid}`), candidacy);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
}

// modification d'un doc
export const updateDocument = async (id: string, candidacy: object) => {
  const { $firestore, $auth } = useNuxtApp();
  const docRef = doc($firestore, `${$auth.currentUser.uid}`, id);

  try {
    await updateDoc(docRef, candidacy);
    console.log("Document updated");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

// obtention des doc de la collection
export const getAllDocs = async () => {
  const { $firestore, $auth } = useNuxtApp();
  const dataCandidacy = useDataCandidacy();

  try {
      const querySnapshot = await getDocs(query(collection($firestore, `${$auth.currentUser.uid}`)));
      querySnapshot.forEach((doc) => {
        dataCandidacy.value.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
}