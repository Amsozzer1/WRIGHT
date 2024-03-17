import { collection, getDoc,doc,getDocs,addDoc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './config';
import { useState } from "react";

export async function postComment(comment, img, author
    ,course,lessonid,chapter
    ) {
    try {
        const docRef = await addDoc(collection(db, `/courses/${course}/SubCourse/${lessonid}/${chapter}/${chapter}/Comments`), comment
        ,img,author);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
export async function getComments(course,lessonid,chapterid) {
    try {
        let docs = [];
        const querySnapshot = await getDocs(collection(db, `/courses/${course}/SubCourse/${lessonid}/${chapterid}/${chapterid}/Comments`));
        querySnapshot.forEach((doc) => {
            docs.push([doc.id, doc.data()]);
        }
        );
        return docs;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return []; // Return an empty array if there's an error
    }
}
///courses/Physics/SubCourse/9H2XWhuuBlmpGlpbvboR/Vectors/Vectors/Comments/YPFeozo7DLwqCWLqSToo/replies
export async function getReplies(course,lessonid,chapterid,commentID){
    
    try {
        let docs = [];
        const querySnapshot = await getDocs(collection(db, `/courses/${course}/SubCourse/${lessonid}/${chapterid}/${chapterid}/Comments/${commentID}/replies`));
        querySnapshot.forEach((doc) => {
            docs.push([doc.id, doc.data()]);
        }
        );
        console.log('replies',docs);
        return docs;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return []; // Return an empty array if there's an error
    }

}
export async function postReply(comment
    ,course,lessonid,chapterid,commentID
    ) {
        // let text = comment.text;
        // let img = comment.img;
        // let author = comment.author;
    try {
        const docRef = addDoc(collection(db, `/courses/${course}/SubCourse/${lessonid}/${chapterid}/${chapterid}/Comments/${commentID}/replies`), comment);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
export async function getDocsFromCollection() {
    try {
        let docs = [];
        const querySnapshot = await getDocs(collection(db, "courses"));
        querySnapshot.forEach((doc) => {
            docs.push([doc.id, doc.data()]);
        });
        return docs;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return []; // Return an empty array if there's an error
    }
}

export async function getSubDocsFromCollection(course) {
    try {
        let docs = [];
        const querySnapshot = await getDocs(collection(db, "courses/"+course+"/SubCourse"));
        querySnapshot.forEach((doc) => {
            docs.push([doc.id, doc.data()]);
        });
        return docs;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return []; // Return an empty array if there's an error
    }
}

export async function getLessonFromSubCourse(course,lessonid) {
    try {
        let docs = [];
        const querySnapshot = await getDocs(collection(db, `/courses/${course}/SubCourse/${lessonid}/Chapters`));
        querySnapshot.forEach((doc) => {
            docs.push([doc.id, doc.data()]);
        });
        docs.sort((a, b) => a[1].number - b[1].number);

        
        return docs;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return []; // Return an empty array if there's an error
    }
}

///courses/Physics/SubCourse/9H2XWhuuBlmpGlpbvboR/Force
export async function getChapterFromLesson(course,lessonid,chapterid) {
    try {
        let docs = [];
        //let docRef = doc(db, `/courses/Physics/SubCourse/9H2XWhuuBlmpGlpbvboR/Force`);
        const querySnapshot = await getDocs(collection(db, `/courses/${course}/SubCourse/${lessonid}/${chapterid}`));
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            docs.push([doc.id, doc.data()]);
        });
        return docs;
    } catch (error) {
        console.error("Error fetching document: ", error);
        return {}; 
    }
}
const auth = getAuth();
export function authStateChange(callback) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        callback(user); // Pass the user to the callback
      } else {
        console.log('No user');
        callback(null);
      }
    });
  }
  