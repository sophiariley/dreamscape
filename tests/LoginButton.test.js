import React from 'react';
import { render} from '@testing-library/react-native';
 
import LoginScreen from './LoginScreen';

// basic button test
describe('LoginScreen', () => {
    it('should find the button via testId', () => {
    const testIdName = 'loginButton';
    const {getByTestId} = render(<LoginScreen />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });

    it('button should say login', () => {
        const loginText = ' Login! '; // spaces around Login! because that's how it appears in code
        const notFoundText = 'error :(';
        const {toJSON, getByText, queryByText} = render(<LoginScreen />);
        const foundLoginTextElement = getByText(loginText);
        const notFoundTextElement = queryByText(notFoundText);
        expect(foundLoginTextElement.props.children).toEqual(loginText);
        expect(notFoundTextElement).toBeNull();
        expect(toJSON()).toMatchSnapshot();
      });
});