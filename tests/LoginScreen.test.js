import React from "react";
import { render } from "@testing-library/react-native";
import LoginScreen from "../screens/LoginScreen";

// does the login screen render its default elements?
it ("renders default elements", () => {
    const {getAllByText} = render(<LoginScreen/>);
    expect(getAllByText('Login').length).toBe(1);
});