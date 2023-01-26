import { doc, setDoc, collection, addDoc,deleteDoc } from "firebase/firestore"; 
import { db } from "../firebase-config";

function createUser(firstName, lastName, email, username, password, add) {
  //console.log('Ran method');
  //return 'ran';
    const runit = () => add(collection(db, "users"), {
   firstName: firstName,
   lastName: lastName,
   email: email,
   username: username,
   password: password
 });
 runit();
 return 'ran';
 //deleteDoc(doc(db,"users",""))
}
module.exports = createUser;