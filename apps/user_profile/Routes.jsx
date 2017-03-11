import {Router, browserHistory} from 'react-router'
import {onEnterAuthenticated, onEnterUnauthenticated} from 'common/core/CoreApplication'
import UserProfileViewport from 'apps/user_profile/components/Viewport'
import UserProfileHomepagePage from 'apps/user_profile/homepage/Page'
/**NEW_PAGE**/

const rootPaths = ['/app/user-profile']
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
