import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'

export default class FollowUsComponent extends NavigationBaseComponent {
    get mainClassName() {return 'follow-us'}
    get items() {return [{
        icon: 'facebook',
        url: 'https://www.facebook.com/standardchartered'
    },{
        icon: 'twitter',
        url: 'https://twitter.com/stanchart'
    },{
        icon: 'linkedin',
        url: 'https://www.linkedin.com/standard-chartered-bank'
    }]}

    render() {
        return <div className={this.className}>
            <div className='text'>Follow us on</div>
            <div className='links'>
                {this.items.map((item,i) => <a key={i} target='_blank' className={`follow-us-icon follow-us-icon-${item.icon}`} href={item.url}></a>)}
            </div>
        </div>
    }
}
