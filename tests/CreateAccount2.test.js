import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native'; 
import {create} from 'react-test-renderer';
import CreateAccount2 from './CreateAccount2';


// basic rendering test

test('renders correctly across screens', () => {
  const tree = create(<CreateAccount2 />);
  expect(tree).toMatchSnapshot();
});


// Testing username box

const USERNAME_TEXT = 'username';

describe('Testing username input', () => {
    it('should find the input box via testId', () => {
        const testIdName = 'username';
        const {getByTestId} = render(<CreateAccount2 />);
        const foundButton = getByTestId(testIdName);
        expect(foundButton).toBeTruthy();
    });

    it('Input box is pressable', () => {
        const page = render(<CreateAccount2/>);
        const usernameInput = page.getByTestId('username');
        fireEvent.press(usernameInput);
    });

    test('Input box should allow for input', () => {
      render(<CreateAccount2/>);
      fireEvent.changeText(screen.getByTestId('username'), USERNAME_TEXT)
    })
});

// Testing password box

const PASSWORD_TEXT = 'password';

describe('Testing password input', () => {
    it('should find the input box via testId', () => {
        const testIdName = 'password';
        const {getByTestId} = render(<CreateAccount2 />);
        const foundButton = getByTestId(testIdName);
        expect(foundButton).toBeTruthy();
    });

    it('Input box is pressable', () => {
        const page = render(<CreateAccount2/>);
        const passwordInput = page.getByTestId('password');
        fireEvent.press(passwordInput);
    });

    test('Input box should allow for input', () => {
      render(<CreateAccount2/>);
      fireEvent.changeText(screen.getByTestId('password'), PASSWORD_TEXT)
    })
});

// Testing password box

const REPPASSWORD_TEXT = 'password';

describe('Testing password input', () => {
    it('should find the input box via testId', () => {
        const testIdName = 'repPassword';
        const {getByTestId} = render(<CreateAccount2 />);
        const foundButton = getByTestId(testIdName);
        expect(foundButton).toBeTruthy();
    });

    it('Input box is pressable', () => {
        const page = render(<CreateAccount2/>);
        const passwordInput = page.getByTestId('repPassword');
        fireEvent.press(passwordInput);
    });

    test('Input box should allow for input', () => {
      render(<CreateAccount2/>);
      fireEvent.changeText(screen.getByTestId('repPassword'), REPPASSWORD_TEXT)
    })
});


// Testing next button

describe('Testing next button', () => {
    it('should find next button via testId', () => {
    const testIdName = 'nextButton';
    const {getByTestId} = render(<CreateAccount2 />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });
  
    it('Next button is pressable', () => {
      const navigation = {navigate: () =>{}}
      const page = render(<CreateAccount2 navigation={navigation}/>);
      const nextButton = page.getByTestId('nextButton');
      fireEvent.press(nextButton);
    });
  })


// Testing back button

describe('Testing back button', () => {
    it('should find back button via testId', () => {
    const testIdName = 'backButton';
    const {getByTestId} = render(<CreateAccount2 />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });
  
    it('Back button is pressable', () => {
      const navigation = {navigate: () =>{}}
      const page = render(<CreateAccount2 navigation={navigation}/>);
      const backButton = page.getByTestId('backButton');
      fireEvent.press(backButton);
    });

    it('Back button navigates to login screen', () => {
        const navigation = {navigate: () =>{}}
        const page = render(<CreateAccount2 navigation={navigation}/>);
        jest.spyOn(navigation, 'navigate')
        const backButton = page.getByTestId('backButton');
        fireEvent.press(backButton);
        expect(navigation.navigate).toHaveBeenCalledWith("Create Account 1")
    });
})
// Testing last name box

// const LASTNAME_TEXT = 'last name';

// describe('Testing username input', () => {
//     it('should find the input box via testId', () => {
//         const testIdName = 'lastName';
//         const {getByTestId} = render(<CreateAccount1 />);
//         const foundButton = getByTestId(testIdName);
//         expect(foundButton).toBeTruthy();
//     });

//     it('Input box is pressable', () => {
//         const page = render(<CreateAccount1/>);
//         const usernameInput = page.getByTestId('lastName');
//         fireEvent.press(usernameInput);
//     });

//     test('Input box should allow for input', () => {
//       render(<CreateAccount1/>);
//       fireEvent.changeText(screen.getByTestId('lastName'), LASTNAME_TEXT)
//     })
// });


// // Testing email box

// const EMAIL_TEXT = 'email';

// describe('Testing username input', () => {
//     it('should find the input box via testId', () => {
//         const testIdName = 'email';
//         const {getByTestId} = render(<CreateAccount1 />);
//         const foundButton = getByTestId(testIdName);
//         expect(foundButton).toBeTruthy();
//     });

//     it('Input box is pressable', () => {
//         const page = render(<CreateAccount1/>);
//         const usernameInput = page.getByTestId('email');
//         fireEvent.press(usernameInput);
//     });

//     test('Input box should allow for input', () => {
//       render(<CreateAccount1/>);
//       fireEvent.changeText(screen.getByTestId('email'), EMAIL_TEXT)
//     })
// });


// // Testing confirm email box

// const CONFIRMEMAIL_TEXT = 'email';

// describe('Testing username input', () => {
//     it('should find the input box via testId', () => {
//         const testIdName = 'confirmEmail';
//         const {getByTestId} = render(<CreateAccount1 />);
//         const foundButton = getByTestId(testIdName);
//         expect(foundButton).toBeTruthy();
//     });

//     it('Input box is pressable', () => {
//         const page = render(<CreateAccount1/>);
//         const usernameInput = page.getByTestId('confirmEmail');
//         fireEvent.press(usernameInput);
//     });

//     test('Input box should allow for input', () => {
//       render(<CreateAccount1/>);
//       fireEvent.changeText(screen.getByTestId('confirmEmail'), CONFIRMEMAIL_TEXT)
//     })
// });


// // Testing next button

// describe('Testing next button', () => {
//     it('should find next button via testId', () => {
//     const testIdName = 'nextButton';
//     const {getByTestId} = render(<CreateAccount1 />);
//     const foundButton = getByTestId(testIdName);
//     expect(foundButton).toBeTruthy();
//     });
  
//     it('Next button is pressable', () => {
//       const navigation = {navigate: () =>{}}
//       const page = render(<CreateAccount1 navigation={navigation}/>);
//       const nextButton = page.getByTestId('nextButton');
//       fireEvent.press(nextButton);
//     });
//   })


//   // Testing back button

// describe('Testing back button', () => {
//     it('should find back button via testId', () => {
//     const testIdName = 'backButton';
//     const {getByTestId} = render(<CreateAccount1 />);
//     const foundButton = getByTestId(testIdName);
//     expect(foundButton).toBeTruthy();
//     });
  
//     it('Back button is pressable', () => {
//       const navigation = {navigate: () =>{}}
//       const page = render(<CreateAccount1 navigation={navigation}/>);
//       const nextButton = page.getByTestId('backButton');
//       fireEvent.press(nextButton);
//     });

//     it('Back button navigates to login screen', () => {
//         const navigation = {navigate: () =>{}}
//         const page = render(<CreateAccount1 navigation={navigation}/>);
//         jest.spyOn(navigation, 'navigate')
//         const createAccount = page.getByTestId('backButton');
//         fireEvent.press(createAccount);
//         expect(navigation.navigate).toHaveBeenCalledWith("Login")
//     });
// })