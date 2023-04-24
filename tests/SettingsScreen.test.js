import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native'; 
import SettingsScreen from './SettingsScreen';
import {create} from 'react-test-renderer';

// basic rendering test
test('renders correctly across screens', () => {
  const tree = create(<SettingsScreen />);
  expect(tree).toMatchSnapshot();
});


// Testing login button
describe('Testing logout button', () => {
    it('should find the button via testId', () => {
    const testIdName = 'logoutButton';
    const {getByTestId} = render(<SettingsScreen />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });

    it('button should say logout', () => {
        const logoutText = 'Logout'; // spaces around Login! because that's how it appears in code
        const notFoundText = 'error :(';
        const {toJSON, getByText, queryByText} = render(<SettingsScreen />);
        const foundTextElement = getByText(logoutText);
        const notFoundTextElement = queryByText(notFoundText);
        expect(foundTextElement.props.children).toEqual(logoutText);
        expect(notFoundTextElement).toBeNull();
        expect(toJSON()).toMatchSnapshot();
      });

      it('logout button is pressable', () => {
        const page = render(<SettingsScreen/>);
        const logoutButton = page.getByTestId('logoutButton');
        fireEvent.press(logoutButton);
      })
});