import { doc, setDoc, collection, addDoc,deleteDoc, enableIndexedDbPersistence } from "firebase/firestore"; 
import { db } from "../firebase-config";

/*const CreateAccount2 = require('./createUser');
jest.mock('./createUser');
const mockMethod = jest.fn();
CreateAccount2.mockImplementation(() => {
    return {
        createUser: mockMethod,
    };
});


const account = new CreateAccount2();
account.method('a','b','c','d','e');

console.log('Calls to method: ', mockMethod.mock.calls);*/




/*const createUser = require('./createUser');

test('testing createUser function', () => {
    //const outer = function() {};
    //outer.call = jest.fn();
    const firstName = 'Bob';
    const lastName = 'Tester';
    const email = 'testing.com';
    const username = 'bobtest';
    const password = 'secret';
    //const user = createUser(firstName,lastName,email,username,password);
    const userMethod = jest.fn();
    //const user = jest.replaceProperty()
    create(firstName,lastName,email,username,password);
    //expect(createUser(firstName,lastName,email,username,password)).toHaveBeenCalledWith(firstName,lastName,email,username,password);
    expect(userMethod.mock.calls.length).toBe(1);
});*/

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
    //expect(createUser(firstName,lastName,email,username,password)).toBe('ran');
    //expect(createUser(firstName,lastName,email,username,password)).toHaveBeenCalledTimes(1);
})

/*const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  //const sumCall = jest.fn();
  //sum(1,2);
  //expect(sumCall.mock.calls.length).toBe(1);
  expect(sum(1, 2)).toBe(3);
});*/