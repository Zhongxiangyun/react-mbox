import "./styles/main.less";
import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "mobx-react";
import {AppContainer} from "react-hot-loader";
import {hotRehydrate, rehydrate} from "rfx-core";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale('zh-cn');
import {isProduction} from "./utils/constants";
import App from "./components/App";
import stores from './stores/stores';
const store = rehydrate();

const renderApp = Component => {
    render(
        <AppContainer>
            <Router>
                <Provider store={isProduction ? store : hotRehydrate()}>
                    <App />
                </Provider>
            </Router>
        </AppContainer>,
        document.getElementById("root")
    );
};

function run() {
    renderApp(App);
    if (module.hot) {
        module.hot.accept(() => renderApp(App));
    }
}

/*store.userState.getCurrentUser().then(_ => run(), _ => run());*/
run();
