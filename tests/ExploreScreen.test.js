import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native'; 
import ExploreScreen from './ExploreScreen';
import {create} from 'react-test-renderer';

// basic rendering test
test('renders correctly across screens', () => {
  const tree = create(<ExploreScreen />);
  expect(tree).toMatchSnapshot();
});


// Testing search box

const SEARCH_TEXT = 'search';

describe('Testing search input', () => {
  it('should find the search bar via testId', () => {
  const testIdName = 'searchBar';
  const {getByTestId} = render(<ExploreScreen />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
  });

    it('Search bar is pressable', () => {
      const page = render(<ExploreScreen/>);
      const searchBar = page.getByTestId('searchBar');
      fireEvent.press(searchBar);
    });

    test('search bar should allow for input', () => {
      render(<ExploreScreen/>);
      fireEvent.changeText(screen.getByPlaceholderText('Search'), SEARCH_TEXT)
    })
});