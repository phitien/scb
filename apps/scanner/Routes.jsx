import {Router, browserHistory} from 'react-router'
import {onEnterAuthenticated, onEnterUnauthenticated} from 'common/core/CoreApplication'
import ScannerViewport from 'apps/scanner/components/Viewport'
import ScannerHomepagePage from 'apps/scanner/homepage/Page'
/**NEW_PAGE**/

const rootPaths = ['/apps/scanner']
const subRoutes = [
/**NEW_PAGE_ROUTE**/
]
const routes = []

rootPaths.map(root => {
    routes.push({
        path: root,
        component: ScannerViewport,
        indexRoute: {
            component: ScannerHomepagePage
        },
        childRoutes: subRoutes,
        onEnter: onEnterUnauthenticated,
    })
})

export default routes
