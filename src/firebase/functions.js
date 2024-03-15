import { collection, getDoc,doc,getDocs } from "firebase/firestore"; 
import { db } from './config';
export async function getDocsFromCollection() {
    try {
        let docs = [];
        const querySnapshot = await getDocs(collection(db, "courses"));
        querySnapshot.forEach((doc) => {
            docs.push([doc.id, doc.data()]);
            // console.log(`${doc.id} => ${doc.data()}`);
        });
        return docs;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return []; // Return an empty array if there's an error
    }
}