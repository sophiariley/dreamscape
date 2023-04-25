import React from "react";
import { render } from "@testing-library/react-native";
import PostScreen from "./PostScreen";

describe("PostScreen", () => {
  it("renders without errors", () => {
    const navigation = { goBack: jest.fn() };
    const route = {
      params: {
        postID: "123",
        posterID: "456",
        userID: "789",
        username: "johndoe",
        posterPic: "https://picsum.photos/200",
      },
    };
    const { toJSON } = render(<PostScreen navigation={navigation} route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
