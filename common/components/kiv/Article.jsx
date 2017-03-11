// import React from 'react';
//
// import LinearLayout from './layouts/LinearLayout';
//
// export default class Article extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             page: {}
//         };
//     }
//     componentDidMount() {
//         console.log('componentDidMount');
//         this.loadPage(this.props.params.sectionId)
//     }
//     loadPage(pageSlug) {
//         console.log('loading page ');
//         $.ajax({
//             url: '/cms-api/pages/article',
//             dataType: 'json',
//             cache: false,
//             success: function(data) {
//                 console.log('success '+data);
//                 this.setState({page: data});
//             }.bind(this),
//             error: function(xhr, status, err) {
//             }.bind(this)
//         });
//     }
//     render() {
//         console.log('render - article id is ' + this.props.params.articleId);
//         var dataSrc = '/cms-api/articles/'+this.props.params.articleId;
//
//         var className = 'page';
//         className += ' '+this.state.page.class_name+' '+this.state.page.slug;
//
//
//
//         var linearLayouts;
//         if (this.state.page.linear_layouts && this.state.page.linear_layouts.length>0) {
//             linearLayouts = this.state.page.linear_layouts.map(function(layout) {
//                 layout.dataSrc = dataSrc;
//                 return (
//                     <LinearLayout {...layout} />
//                 );
//             });
//         }
//         return (
//             <div className={className}>
//                 {linearLayouts}
//             </div>
//         );
//     }
// }
