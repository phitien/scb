import { Router, browserHistory } from 'react-router';
import log from 'loglevel';
import { createHistory, useQueries } from 'history';

let history;

if (typeof window !== 'undefined') {
    history = useQueries(createHistory)();
    // Listen for changes to the current location. The
    // listener is called once immediately.
    let unlisten = history.listen(function (location) {
        // console.log('history - location change', location.query)
        // console.log(location.query);
        history.query = location.query;
    });
}

// import createBrowserHistory from 'history/lib/createBrowserHistory';

export default browserHistory;
