import Server from 'common/server/server'
import ScannerRoutes from 'apps/scanner/Routes'
import ScannerApplication from 'apps/scanner/App'

var server = new Server()
server.port = process.env.PORT ? process.env.PORT : 2810
server.views = process.env.VIEWS ? process.env.VIEWS : 'public/apps/scanner'
server.template = process.env.TEMPLATE ? process.env.TEMPLATE : 'index.html'
server.routes = ScannerRoutes
server.store = ScannerApplication.defaultStore
server.title = 'Scanner | Asia Finance'
server.meta_description = 'Scanner, Financial Planning, Retirement Planning, Insurance'
server.meta_keywords = 'Scanner, Financial Planning, Retirement Planning, Insurance'
server.data = {
    facebook_api_key: '1563228833967568',
    linkedin_api_key: '78x0bfyd7eg3mb',
}
server.handler = function(props) {this.render(props)}
server.run()
