import {Router} from 'react-router'
import {onEnterAuthenticated, onEnterUnauthenticated} from '../../common/core/CoreApplication'
import NewAppViewport from './components/Viewport'
import NewAppHomepagePage from './homepage/Page'
/**NEW_PAGE**/

const rootPaths = ['/public/apps/new_app']
const subRoutes = [
/**NEW_PAGE_ROUTE**/
]
const routes = []

rootPaths.map(root => {
    routes.push({
        path: root,
        component: NewAppViewport,
        indexRoute: {
            component: NewAppHomepagePage
        },
        childRoutes: subRoutes,
        onEnter: onEnterUnauthenticated,
    })
})

export default routes
