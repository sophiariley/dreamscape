import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native'; 
import CreateAccount1 from './CreateAccount1';
import {create} from 'react-test-renderer';


// basic rendering test

test('renders correctly across screens', () => {
  const tree = create(<CreateAccount1 />);
  expect(tree).toMatchSnapshot();
});


// Testing first name box

const FIRSTNAME_TEXT = 'first name';

describe('Testing first name input', () => {
    it('should find the input box via testId', () => {
        const testIdName = 'firstName';
        const {getByTestId} = render(<CreateAccount1 />);
        const foundButton = getByTestId(testIdName);
        expect(foundButton).toBeTruthy();
    });

    it('Input box is pressable', () => {
        const page = render(<CreateAccount1/>);
        const fisrtNameInput = page.getByTestId('firstName');
        fireEvent.press(fisrtNameInput);
    });

    test('Input box should allow for input', () => {
      render(<CreateAccount1/>);
      fireEvent.changeText(screen.getByTestId('firstName'), FIRSTNAME_TEXT)
    })
});


// Testing last name box

const LASTNAME_TEXT = 'last name';

describe('Testing last name input', () => {
    it('should find the input box via testId', () => {
        const testIdName = 'lastName';
        const {getByTestId} = render(<CreateAccount1 />);
        const foundButton = getByTestId(testIdName);
        expect(foundButton).toBeTruthy();
    });

    it('Input box is pressable', () => {
        const page = render(<CreateAccount1/>);
        const lastNameInput = page.getByTestId('lastName');
        fireEvent.press(lastNameInput);
    });

    test('Input box should allow for input', () => {
      render(<CreateAccount1/>);
      fireEvent.changeText(screen.getByTestId('lastName'), LASTNAME_TEXT)
    })
});


// Testing email box

const EMAIL_TEXT = 'email';

describe('Testing email input', () => {
    it('should find the input box via testId', () => {
        const testIdName = 'email';
        const {getByTestId} = render(<CreateAccount1 />);
        const foundButton = getByTestId(testIdName);
        expect(foundButton).toBeTruthy();
    });

    it('Input box is pressable', () => {
        const page = render(<CreateAccount1/>);
        const emailInput = page.getByTestId('email');
        fireEvent.press(emailInput);
    });

    test('Input box should allow for input', () => {
      render(<CreateAccount1/>);
      fireEvent.changeText(screen.getByTestId('email'), EMAIL_TEXT)
    })
});


// Testing confirm email box

const CONFIRMEMAIL_TEXT = 'email';

describe('Testing confirm email input', () => {
    it('should find the input box via testId', () => {
        const testIdName = 'confirmEmail';
        const {getByTestId} = render(<CreateAccount1 />);
        const foundButton = getByTestId(testIdName);
        expect(foundButton).toBeTruthy();
    });

    it('Input box is pressable', () => {
        const page = render(<CreateAccount1/>);
        const confEmailInput = page.getByTestId('confirmEmail');
        fireEvent.press(confEmailInput);
    });

    test('Input box should allow for input', () => {
      render(<CreateAccount1/>);
      fireEvent.changeText(screen.getByTestId('confirmEmail'), CONFIRMEMAIL_TEXT)
    })
});


// Testing next button

describe('Testing next button', () => {
    it('should find next button via testId', () => {
    const testIdName = 'nextButton';
    const {getByTestId} = render(<CreateAccount1 />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });
  
    it('Next button is pressable', () => {
      const navigation = {navigate: () =>{}}
      const page = render(<CreateAccount1 navigation={navigation}/>);
      const nextButton = page.getByTestId('nextButton');
      fireEvent.press(nextButton);
    });
  })


// Testing back button

describe('Testing back button', () => {
    it('should find back button via testId', () => {
    const testIdName = 'backButton';
    const {getByTestId} = render(<CreateAccount1 />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });
  
    it('Back button is pressable', () => {
      const navigation = {navigate: () =>{}}
      const page = render(<CreateAccount1 navigation={navigation}/>);
      const backButton = page.getByTestId('backButton');
      fireEvent.press(backButton);
    });

    it('Back button navigates to login screen', () => {
        const navigation = {navigate: () =>{}}
        const page = render(<CreateAccount1 navigation={navigation}/>);
        jest.spyOn(navigation, 'navigate')
        const backButton = page.getByTestId('backButton');
        fireEvent.press(backButton);
        expect(navigation.navigate).toHaveBeenCalledWith("Login")
    });
})