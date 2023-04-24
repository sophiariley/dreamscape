import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native'; 
import SettingsScreen from './SettingsScreen';
import {create} from 'react-test-renderer';

// basic rendering test
test('renders correctly across screens', () => {
  const tree = create(<SettingsScreen />);
  expect(tree).toMatchSnapshot();
});


// // Testing login button
// describe('Testing login button', () => {
//     it('should find the button via testId', () => {
//     const testIdName = 'loginButton';
//     const {getByTestId} = render(<LoginScreen />);
//     const foundButton = getByTestId(testIdName);
//     expect(foundButton).toBeTruthy();
//     });

//     it('button should say login', () => {
//         const loginText = ' Login! '; // spaces around Login! because that's how it appears in code
//         const notFoundText = 'error :(';
//         const {toJSON, getByText, queryByText} = render(<LoginScreen />);
//         const foundLoginTextElement = getByText(loginText);
//         const notFoundTextElement = queryByText(notFoundText);
//         expect(foundLoginTextElement.props.children).toEqual(loginText);
//         expect(notFoundTextElement).toBeNull();
//         expect(toJSON()).toMatchSnapshot();
//       });

//       it('login button is pressable', () => {
//         const page = render(<LoginScreen/>);
//         const loginButton = page.getByTestId('loginButton');
//         fireEvent.press(loginButton);
//       })
// });

// // Testing user input boxes

// const USERNAME_TEXT = 'username';

// describe('Testing username input', () => {
//   it('should find the input box via testId', () => {
//   const testIdName = 'usernameInput';
//   const {getByTestId} = render(<LoginScreen />);
//   const foundButton = getByTestId(testIdName);
//   expect(foundButton).toBeTruthy();
//   });

//     it('Input box is pressable', () => {
//       // const navigation = {navigate: jest.fn()};
//       // jest.spyOn(navigation, 'navigate');
//       const page = render(<LoginScreen/>);
//       const usernameInput = page.getByTestId('usernameInput');
//       fireEvent.press(usernameInput);
//       // expect(navigation.navigate).toHaveBeenCalledTo("Home");
//     });

//     test('Input box should allow for input', () => {
//       render(<LoginScreen/>);
//       fireEvent.changeText(screen.getByPlaceholderText('Username'), USERNAME_TEXT)
//     })
// });

// // Testing user input boxes

// const PASSWORD_TXT = 'password';

// describe('Testing password input', () => {
//   it('should find the password box via testId', () => {
//   const testIdName = 'passwordInput';
//   const {getByTestId} = render(<LoginScreen />);
//   const foundButton = getByTestId(testIdName);
//   expect(foundButton).toBeTruthy();
//   });

//     it('Password box is pressable', () => {
//       // const navigation = {navigate: jest.fn()};
//       // jest.spyOn(navigation, 'navigate');
//       const page = render(<LoginScreen/>);
//       const usernameInput = page.getByTestId('passwordInput');
//       fireEvent.press(usernameInput);
//       // expect(navigation.navigate).toHaveBeenCalledTo("Home");
//     });

//     test('Password box should allow for input', () => {
//       render(<LoginScreen/>);
//       fireEvent.changeText(screen.getByPlaceholderText('Password'), PASSWORD_TXT)
//     })
// });


// // Testing forgot password pressable

// describe('Testing forgot password', () => {
//   it('should find forgot password via testId', () => {
//   const testIdName = 'forgotPassword';
//   const {getByTestId} = render(<LoginScreen />);
//   const foundButton = getByTestId(testIdName);
//   expect(foundButton).toBeTruthy();
//   });

//   it('Forgot password is pressable', () => {
//     const navigation = {navigate: () =>{}}
//     const page = render(<LoginScreen navigation={navigation}/>);
//     const forgotPassword = page.getByTestId('forgotPassword');
//     fireEvent.press(forgotPassword);
//   });
  
//   it('Forgot password navigates to reset password screen', () => {
//     const navigation = {navigate: () =>{}}
//     const page = render(<LoginScreen navigation={navigation}/>);
//     jest.spyOn(navigation, 'navigate')
//     const forgotPassword = page.getByTestId('forgotPassword');
//     fireEvent.press(forgotPassword);
//     expect(navigation.navigate).toHaveBeenCalledWith("Reset Password")
//   });
// })


// // Testing create account pressable

// describe('Testing create account', () => {
//   it('should find create account via testId', () => {
//   const testIdName = 'createAccount';
//   const {getByTestId} = render(<LoginScreen />);
//   const foundButton = getByTestId(testIdName);
//   expect(foundButton).toBeTruthy();
//   });

//   it('Create account is pressable', () => {
//     const navigation = {navigate: () =>{}}
//     const page = render(<LoginScreen navigation={navigation}/>);
//     const createAccount = page.getByTestId('createAccount');
//     fireEvent.press(createAccount);
//   });
  
//   it('Create account navigates to create account screen', () => {
//     const navigation = {navigate: () =>{}}
//     const page = render(<LoginScreen navigation={navigation}/>);
//     jest.spyOn(navigation, 'navigate')
//     const createAccount = page.getByTestId('createAccount');
//     fireEvent.press(createAccount);
//     expect(navigation.navigate).toHaveBeenCalledWith("Create Account 1")
//   });
// })
