import React from "react";
import { render } from "@testing-library/react-native";
import TripScreen from "./TripScreen";

describe("TripScreen", () => {
  it("renders without errors", () => {
    const route = {
      params: {
        city: "New York City",
        startDate: "2023-05-01",
        endDate: "2023-05-05",
        flightInfo: "Delta 1234",
        hotelInfo: "Marriott",
        itinerary: "Day 1: Visit Central Park\nDay 2: See the Statue of Liberty",
      },
    };
    const { toJSON } = render(<TripScreen route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
