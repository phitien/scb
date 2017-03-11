import {Router, browserHistory} from 'react-router'
import {onEnterAuthenticated, onEnterUnauthenticated} from 'common/core/CoreApplication'
import NewAppViewport from 'apps/new_app/components/Viewport'
import NewAppHomepagePage from 'apps/new_app/homepage/Page'
/**NEW_PAGE**/

const rootPaths = ['/apps/new-app']
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
