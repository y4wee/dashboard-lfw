import { doc, collection, addDoc, query, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore"; 

// ajout d'un nouveau doc à la collection
export const addToCollection = async (candidacy: object) => {
    const { $firestore, $auth } = useNuxtApp();

    try {
        const docRef = await addDoc(collection($firestore, `${$auth.currentUser.uid}`), candidacy);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
};

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
};

// suppression d'un doc
export const deleteDocument = async (id: string) => {
  const { $firestore, $auth } = useNuxtApp();
  const docRef = doc($firestore, `${$auth.currentUser.uid}`, id);

  try {
    await deleteDoc(docRef);
    console.log("Document deleted");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

// lecture des doc de la collection en temps réel
export const readAllDocs = () => {
  const { $firestore, $auth } = useNuxtApp();
  const dataCandidacy = useDataCandidacy();

  const q = query(collection($firestore, `${$auth.currentUser.uid}`));
  const unsub = onSnapshot(q, (querySnapshot) => {
    let docArray: any = [];
    querySnapshot.forEach((doc) => {
      docArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    docArray.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    })
    dataCandidacy.value = docArray;
  });
};