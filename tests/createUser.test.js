import { doc, setDoc, collection, addDoc,deleteDoc, enableIndexedDbPersistence } from "firebase/firestore"; 
import { db } from "../firebase-config";

const createUser = require('./createUser');

test('AddDoc runs only once', () => {
    const firstName = 'Bob';
    const lastName = 'Tester';
    const email = 'testing.com';
    const username = 'bobtest';
    const password = 'secret';
    const add = jest.fn();
    createUser(firstName,lastName,email,username,password, add);
    expect(add).toHaveBeenCalledTimes(1);
})
