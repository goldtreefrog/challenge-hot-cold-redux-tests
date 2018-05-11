import reducer from "../reducer";
import { restartGame, makeGuess, generateAuralUpdate } from "../actions";

describe("Reducer processing", () => {
  it("Should set up default values", () => {
    const state = reducer(undefined, { type: "__UNKNOWN" });
    // '@@init' also works, at least if store.js passes to store: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual("Make your guess!");
    expect(state.auralStatus).toEqual("");
    expect(state.correctAnswer).toBeGreaterThan(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
  });

  describe("makeGuess", () => {
    it("Should add guess to guesses in state", () => {
      let currentState = { correctAnswer: "5", guesses: [] };
      let state = reducer(currentState, { type: "MAKE_GUESS", guess: "3" });
      expect(state.guesses).toEqual([3]);
      currentState = Object.assign({}, state);
      state = reducer(currentState, { type: "MAKE_GUESS", guess: "5" });
      expect(state.guesses).toEqual([3, 5]);
      currentState = Object.assign({}, state);
      state = reducer(currentState, { type: "MAKE_GUESS", guess: "99" });
      expect(state.guesses).toEqual([3, 5, 99]);
      currentState = Object.assign({}, state);
      state = reducer(currentState, { type: "MAKE_GUESS", guess: "102" });
      // 102 is OK here because it won't be allowed by the max:100 property on the input.
      expect(state.guesses).toEqual([3, 5, 99, 102]);
    });

    it("Should change feedback based upon how close the guess is to the correct answer", () => {
      const correctAnswer = 1;
      const currentState = { correctAnswer, guesses: [] };
      const expectedFeedback = (guess, correctAnswer) => {
        let diff = Math.abs(guess - correctAnswer);
        // console.log("diff: ", diff);
        if (diff === 0) {
          return "You got it!";
        } else if (diff < 10) {
          return "You're Hot!";
        } else if (diff < 30) {
          return "You're Warm.";
        } else if (diff < 50) {
          return "You're Cold...";
        } else {
          return "You're Ice Cold...";
        }
      };

      function testFeedback(guess) {
        let state = reducer(currentState, makeGuess(guess));
        // console.log(state.feedback);
        expect(state.feedback).toEqual(expectedFeedback(guess, correctAnswer));
      }

      // Run the actual test using various guesses
      testFeedback(1);
      testFeedback(10);
      testFeedback(11);
      testFeedback(30);
      testFeedback(31);
      testFeedback(50);
      testFeedback(51);
    });
  });

  describe("restartGame", () => {
    it("Should reset state to default values", () => {
      const prevState = {
        correctAnswer: 5,
        guesses: [1, 3, 9, 18, 36, 45, 54, 72],
        auralStatus: "You are listening to the Hot or Cold game",
        feedback: "You are ice cold!"
      };
      const newCorrectAnswer = 10;
      let state = reducer(prevState, restartGame(newCorrectAnswer));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual("Make your guess!");
      expect(state.auralStatus).toEqual("");
      expect(state.correctAnswer).toEqual(newCorrectAnswer);
      // (See my note in reducer.js about where the new correct answer is calculated. Because it is done in the dispatch from top-nav.js, we can test it this way here rather than merely verifying it falls between 1 and 100, inclusive.)
    });
  });

  describe("auralUpdate", () => {
    const initialState = { correctAnswer: "5", guesses: [70, 10, 30, 21], auralStatus: "", feedback: "You're Warm." };
    let state = reducer(initialState, generateAuralUpdate(initialState));
    expect(state.auralStatus).toEqual(
      "Here's the status of the game right now: You're Warm. You've made 4 guesses. In order of most- to least-recent, they are: 21, 30, 10, 70"
    );
  });
});
