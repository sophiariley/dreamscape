import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native'; 
import ResetPasswordScreen from './ResetPasswordScreen';
import {create} from 'react-test-renderer';

// basic rendering test
test('renders correctly across screens', () => {
  const tree = create(<ResetPasswordScreen />);
  expect(tree).toMatchSnapshot();
});


// Testing email input box

const EMAIL_TEXT = 'email';

describe('Testing email input', () => {
  it('should find the email box via testId', () => {
  const testIdName = 'emailBox';
  const {getByTestId} = render(<ResetPasswordScreen />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
  });

    it('Email box is pressable', () => {
      const page = render(<ResetPasswordScreen/>);
      const emailBox = page.getByTestId('emailBox');
      fireEvent.press(emailBox);
    });

    test('Email box should allow for input', () => {
      render(<ResetPasswordScreen/>);
      fireEvent.changeText(screen.getByPlaceholderText('Email'), EMAIL_TEXT)
    })
});


// Testing new password input boxe

const PASSWORD_TXT = 'password';

describe('Testing new password input', () => {
  it('should find the new password box via testId', () => {
  const testIdName = 'newPasswordBox';
  const {getByTestId} = render(<ResetPasswordScreen />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
  });

    it('New password box is pressable', () => {
      const page = render(<ResetPasswordScreen/>);
      const newPasswordBox = page.getByTestId('newPasswordBox');
      fireEvent.press(newPasswordBox);
    });

    test('New password box should allow for input', () => {
      render(<ResetPasswordScreen/>);
      fireEvent.changeText(screen.getByPlaceholderText('New password'), PASSWORD_TXT)
    })
});


// Testing reset password button
describe('Testing reset password button', () => {
    it('should find the button via testId', () => {
    const testIdName = 'resetPasswordButton';
    const {getByTestId} = render(<ResetPasswordScreen />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });

    it('button should say Reset Password', () => {
        const resetPasswordText = 'Reset Password'; // spaces around Login! because that's how it appears in code
        const notFoundText = 'error :(';
        const {toJSON, getByTestId, queryByText} = render(<ResetPasswordScreen />);
        const foundTextElement = getByTestId('resetPasswordButtonText');
        const notFoundTextElement = queryByText(notFoundText);
        expect(foundTextElement.props.children).toEqual(resetPasswordText);
        expect(notFoundTextElement).toBeNull();
        expect(toJSON()).toMatchSnapshot();
      });

      it('reset password button is pressable', () => {
        const navigation = {navigate: () =>{}}
        const page = render(<ResetPasswordScreen navigation={navigation}/>);
        const resetPasswordButton = page.getByTestId('resetPasswordButton');
        fireEvent.press(resetPasswordButton);
      })

      it('reset password navigates to login screen', () => {
            const navigation = {navigate: () =>{}}
            const page = render(<ResetPasswordScreen navigation={navigation}/>);
            jest.spyOn(navigation, 'navigate')
            const resetPasswordButton = page.getByTestId('resetPasswordButton');
            fireEvent.press(resetPasswordButton);
            expect(navigation.navigate).toHaveBeenCalledWith("Login")
          });
});

// Testing return to login button
describe('Testing return to login button', () => {
    it('should find the button via testId', () => {
    const testIdName = 'returnButton';
    const {getByTestId} = render(<ResetPasswordScreen />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });

    it('button should say return to login', () => {
        const returnText = 'Return to login'; // spaces around Login! because that's how it appears in code
        const notFoundText = 'error :(';
        const {toJSON, getByTestId, queryByText} = render(<ResetPasswordScreen />);
        const foundTextElement = getByTestId('returnText');
        const notFoundTextElement = queryByText(notFoundText);
        expect(foundTextElement.props.children).toEqual(returnText);
        expect(notFoundTextElement).toBeNull();
        expect(toJSON()).toMatchSnapshot();
      });

      it('return to login button is pressable', () => {
        const navigation = {navigate: () =>{}}
        const page = render(<ResetPasswordScreen navigation={navigation}/>);
        const returnButton = page.getByTestId('returnButton');
        fireEvent.press(returnButton);
      })

      it('return to login button navigates to login screen', () => {
            const navigation = {navigate: () =>{}}
            const page = render(<ResetPasswordScreen navigation={navigation}/>);
            jest.spyOn(navigation, 'navigate')
            const returnButton = page.getByTestId('returnButton');
            fireEvent.press(returnButton);
            expect(navigation.navigate).toHaveBeenCalledWith("Login")
          });
});

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
