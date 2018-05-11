import { createStore } from "redux";

import reducer from "./reducer";

// The part after && makes Redux dev tools work in Chrome
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export default createStore(reducer);

export default store;
