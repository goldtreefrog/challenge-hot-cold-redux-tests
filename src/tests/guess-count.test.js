import React from "react";
import { shallow } from "enzyme";
import { GuessCount } from "../components/guess-count";
describe("<GuessCount />", () => {
  it("Renders without crashing", () => {
    shallow(<GuessCount />);
  });

  it("Renders the correct guess count description", () => {
    const guessCount = 4;
    const wrapper = shallow(<GuessCount guessCount={guessCount} />);
    expect(wrapper.text()).toEqual(`You've made ${guessCount} guesses!`);
  });
});
