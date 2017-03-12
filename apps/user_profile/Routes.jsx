import {Router} from 'react-router'
import {onEnterAuthenticated, onEnterUnauthenticated} from '../../common/core/CoreApplication'
import UserProfileViewport from './components/Viewport'
import UserProfileHomepagePage from './homepage/Page'
/**NEW_PAGE**/

const rootPaths = ['/public/apps/user_profile']
const subRoutes = [
/**NEW_PAGE_ROUTE**/
]
const routes = []

rootPaths.map(root => {
    routes.push({
        path: root,
        component: UserProfileViewport,
        indexRoute: {
            component: UserProfileHomepagePage
        },
        childRoutes: subRoutes,
        onEnter: onEnterAuthenticated,
    })
})

export default routes
