import { Dispatcher } from 'flux';

var dispatcher = new Dispatcher({
  logLevel: 'ALL'
});

export default dispatcher;
//var Dispatcher = require('flux').Dispatcher;
//var assign = require('object-assign');
//
//var AppDispatcher = assign({}, Dispatcher.prototype, {
//
//  /**
//   * A bridge function between the views and the dispatcher, marking the action
//   * as a view action.  Another variant here could be handleServerAction.
//   * @param  {object} action The data coming from the view.
//   */
//  testAction: function(action) {
//    this.dispatch({
//      source: 'HEADER_MENU_FETCHED',
//      action: action
//    });
//  }
//
//});
//
//module.exports = AppDispatcher;
