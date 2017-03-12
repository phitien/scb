import Server from '../../../common/server/server'
import NewAppRoutes from '../Routes'
import NewAppApplication from '../App'

var server = new Server()
server.port = process.env.PORT ? process.env.PORT : 2810
server.views = process.env.VIEWS ? process.env.VIEWS : 'public/gen/new_app'
server.template = process.env.TEMPLATE ? process.env.TEMPLATE : 'index.html'
server.routes = NewAppRoutes
server.store = NewAppApplication.defaultStore
server.title = 'NewApp | Asia Finance'
server.meta_description = 'NewApp, Financial Planning, Retirement Planning, Insurance'
server.meta_keywords = 'NewApp, Financial Planning, Retirement Planning, Insurance'
server.data = {
    facebook_api_key: '1563228833967568',
    linkedin_api_key: '78x0bfyd7eg3mb',
}
server.handler = function(props) {this.render(props)}
server.run()
