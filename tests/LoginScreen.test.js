import React from 'react';
import {create} from 'react-test-renderer';
import LoginScreen from './LoginScreen';

// basic rendering test
test('renders correctly across screens', () => {
  const tree = create(<LoginScreen />);
  expect(tree).toMatchSnapshot();
});