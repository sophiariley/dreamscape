import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native'; 
import CreatePost2 from './CreatePost2';
import {create} from 'react-test-renderer';

// basic rendering test
test('renders correctly across screens', () => {
  const tree = create(<CreatePost2 />);
  expect(tree).toMatchSnapshot();
});


// Testing "choose image" button
describe('Testing choose image button', () => {
    it('should find the button via testId', () => {
    const testIdName = 'chooseImageButton';
    const {getByTestId} = render(<CreatePost2 />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });

    it('button should say choose image', () => {
        const text = 'Choose image';
        const notFoundText = 'error :(';
        const {toJSON, getByText, queryByText} = render(<CreatePost2 />);
        const foundTextElement = getByText(text);
        const notFoundTextElement = queryByText(notFoundText);
        expect(foundTextElement.props.children).toEqual(text);
        expect(notFoundTextElement).toBeNull();
        expect(toJSON()).toMatchSnapshot();
      });

      it('choose image button is pressable', () => {
        const page = render(<CreatePost2/>);
        const chooseImageButton = page.getByTestId('chooseImageButton');
        fireEvent.press(chooseImageButton);
      })
});

// Testing caption box

const CAPTION_TEXT = 'caption';

describe('Testing caption input', () => {
  it('should find the input box via testId', () => {
  const testIdName = 'captionBox';
  const {getByTestId} = render(<CreatePost2 />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
  });

    it('Input box is pressable', () => {
      const page = render(<CreatePost2/>);
      const captionBox = page.getByTestId('captionBox');
      fireEvent.press(captionBox);
    });

    test('Input box should allow for input', () => {
      render(<CreatePost2/>);
      fireEvent.changeText(screen.getByPlaceholderText('Write caption...'), CAPTION_TEXT)
    })
});

// Testing location box

const LOCATION_TEXT = 'location';

describe('Testing location input', () => {
  it('should find the location box via testId', () => {
  const testIdName = 'locationBox';
  const {getByTestId} = render(<CreatePost2 />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
  });

    it('Location box is pressable', () => {
      const page = render(<CreatePost2/>);
      const locationBox = page.getByTestId('locationBox');
      fireEvent.press(locationBox);
    });

    test('Location box should allow for input', () => {
      render(<CreatePost2/>);
      fireEvent.changeText(screen.getByPlaceholderText('Add Location'), LOCATION_TEXT)
    })
});

// Testing "post" button
describe('Testing post button', () => {
    it('should find the button via testId', () => {
    const testIdName = 'postButton';
    const {getByTestId} = render(<CreatePost2 />);
    const foundButton = getByTestId(testIdName);
    expect(foundButton).toBeTruthy();
    });

    it('button should say post', () => {
        const text = 'Post';
        const notFoundText = 'error :(';
        const {toJSON, getByText, queryByText} = render(<CreatePost2 />);
        const foundTextElement = getByText(text);
        const notFoundTextElement = queryByText(notFoundText);
        expect(foundTextElement.props.children).toEqual(text);
        expect(notFoundTextElement).toBeNull();
        expect(toJSON()).toMatchSnapshot();
      });

      it('post button is pressable', () => {
        const navigation = {navigate: () =>{}}
        const page = render(<CreatePost2 navigation={navigation}/>);
        const postButton = page.getByTestId('postButton');
        fireEvent.press(postButton);
      })
      it('Post button navigates to home screen', () => {
            const navigation = {navigate: () =>{}}
            const page = render(<CreatePost2 navigation={navigation}/>);
            jest.spyOn(navigation, 'navigate')
            const postButton = page.getByTestId('postButton');
            fireEvent.press(postButton);
            expect(navigation.navigate).toHaveBeenCalledWith("Home")
          });
});