import Server from 'common/server/server'
import UserProfileRoutes from 'apps/user_profile/Routes'
import UserProfileApplication from 'apps/user_profile/App'

var server = new Server()
server.port = process.env.PORT ? process.env.PORT : 2810
server.views = process.env.VIEWS ? process.env.VIEWS : 'public/gen/user_profile'
server.template = process.env.TEMPLATE ? process.env.TEMPLATE : 'index.html'
server.routes = UserProfileRoutes
server.store = UserProfileApplication.defaultStore
server.title = 'UserProfile | Asia Finance'
server.meta_description = 'UserProfile, Financial Planning, Retirement Planning, Insurance'
server.meta_keywords = 'UserProfile, Financial Planning, Retirement Planning, Insurance'
server.data = {
    facebook_api_key: '1563228833967568',
    linkedin_api_key: '78x0bfyd7eg3mb',
}
server.handler = function(props) {this.render(props)}
server.run()
