import React from 'react'
import NavigationBaseComponent from 'apps/navigation/Component'

export default class LoginSignupSocialNetworksComponent extends NavigationBaseComponent {
    get mainClassName() {return 'login-signup-social-networks'}
    get items() {return [{
        icon: 'twitter',
        url: 'https://twitter.com/AsiaDotFinance'
    },{
        icon: 'linkedin',
        url: 'https://www.linkedin.com/company/6650221?trk=tyah&trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A6650221%2Cidx%3A2-2-5%2CtarId%3A1454427188686%2Ctas%3Aasia%20finance'
    },{
        icon: 'facebook',
        url: 'https://www.facebook.com/asiafinanceportal/'
    },{
        icon: 'googleplus',
        url: ''
    }]}

    render() {
        return <div className={this.className}>
            <div className='text'>Log in or sign up with</div>
            <div className='links'>
                {this.items.map((item,i) => <a key={i} target='_blank' className={`follow-us-icon follow-us-icon-${item.icon}`} href={item.url}></a>)}
            </div>
        </div>
    }
}
