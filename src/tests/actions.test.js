import { GENERATE_AURAL_UPDATE, generateAuralUpdate, RESTART_GAME, restartGame, MAKE_GUESS, makeGuess } from "./../actions.js";

describe("generateAuralUpdate", () => {
  it("Should return the action generateAuralUpdate", () => {
    const action = generateAuralUpdate();
    expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
  });
});

describe("restartGame", () => {
  it("Should return the action restartGame with property correctionAnswer", () => {
    const correctAnswer = 51;
    const action = restartGame(correctAnswer);
    expect(action.type).toEqual(RESTART_GAME);
    expect(action.correctAnswer).toEqual(correctAnswer);
  });
});

describe("makeGuess", () => {
  it("Shoud return the action makeGuess with property guess", () => {
    const guess = 40;
    const action = makeGuess(guess);
    expect(action.type).toEqual(MAKE_GUESS);
    expect(action.guess).toEqual(guess);
  });
});
