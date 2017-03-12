import {Router} from 'react-router'
import {onEnterAuthenticated, onEnterUnauthenticated} from '../../common/core/CoreApplication'
import ScannerViewport from './components/Viewport'
import ScannerHomepagePage from './homepage/Page'
/**NEW_PAGE**/

const rootPaths = ['/public/apps/scanner']
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
