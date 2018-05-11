import React from "react";
import { shallow } from "enzyme";
import { AuralStatus } from "../components/aural-status";

describe("<AuralStatus />", () => {
  it("Renders without crashing", () => {
    shallow(<AuralStatus />);
  });
  it("Renders an update to aural status", () => {
    let TEST_AURAL_STATUS = "You are playing Hot or Cold";
    let wrapper = shallow(<AuralStatus auralStatus={TEST_AURAL_STATUS} />);
    expect(wrapper.contains(TEST_AURAL_STATUS)).toEqual(true);
  });
});
