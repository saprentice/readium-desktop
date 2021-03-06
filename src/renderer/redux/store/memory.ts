import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { reduxSyncMiddleware } from "readium-desktop/renderer/redux/middleware/sync";
import { rootReducer } from "readium-desktop/renderer/redux/reducers";
import { rootSaga } from "readium-desktop/renderer/redux/sagas";
import { RootState } from "readium-desktop/renderer/redux/states";

export function initStore(): Store<RootState> {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(reduxSyncMiddleware, sagaMiddleware),
        ),
    );
    sagaMiddleware.run(rootSaga);
    return store as Store<RootState>;
}
