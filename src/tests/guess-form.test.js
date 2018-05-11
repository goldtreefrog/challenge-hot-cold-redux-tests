import React from "react";
import { shallow } from "enzyme";
import { GuessForm } from "../components/guess-form";

describe("<GuessForm />", () => {
  it("Renders without crashing", () => {
    shallow(<GuessForm />);
  });
  it("Renders HTML and text correctly", () => {
    const wrapper = shallow(<GuessForm />);
    expect(wrapper.text()).toEqual("Guess");
    expect(wrapper.html()).toContain("<form>");
    expect(wrapper.html()).toContain("<input ");
    expect(wrapper.html()).toContain("<button ");
  });
});
