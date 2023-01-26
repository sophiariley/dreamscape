import React from 'react';
import {create} from 'react-test-renderer';
import LoginScreen from './LoginScreen';


test('renders correctly across screens', () => {
  const tree = create(<LoginScreen />);
  expect(tree).toMatchSnapshot();
});