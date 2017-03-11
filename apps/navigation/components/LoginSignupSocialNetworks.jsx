import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'

export default class LoginSignupSocialNetworksComponent extends NavigationBaseComponent {
    get mainClassName() {return 'regular login-signup-social-networks'}
    get items() {return [{
        icon: 'twitter',
        onClick: this.onTwitterClick,
        ref: 'twitterButton'
    },{
        icon: 'linkedin',
        onClick: this.onLinkedInClick,
        ref: 'linkedinButton'
    },{
        icon: 'facebook',
        onClick: this.onFacebookClick,
        ref: 'facebookButton'
    }]}

    componentDidMount() {
        if (typeof gapi != 'undefined') {
            this.renderGoogleButton()
        }
        else {
            window.onGapiReady = this.onGapiReady
            this.util.addMeta('google-signin-client_id', '110796584934-6mvb8qrpj53tp51bphmgonuuditbbrr6.apps.googleusercontent.com', 'google-signin-client_id')
            this.util.addJsScript('//apis.google.com/js/platform.js?onload=onGapiReady', 'google-platform')
        }
    }

    renderGoogleButton = () => {
        gapi.load('auth2', () => {
            let auth2 = gapi.auth2.init({
                client_id: '110796584934-6mvb8qrpj53tp51bphmgonuuditbbrr6.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            })
            auth2.attachClickHandler(this.refs.googleplusButton, {},
                googleUser => {
                    this.authService.googleLogin({
                        accessToken: googleUser.getAuthResponse().id_token,
                        emailAddress: googleUser.w3.U3,
                        firstName: googleUser.w3.ofa,
                        lastName: googleUser.w3.wea,
                        pictureUrl: googleUser.w3.Paa,
                    })
                    this.successfulLogin()
                },
                this.unsuccessfulLogin
            )
        })
    }
    onGapiReady = this.renderGoogleButton

    onTwitterClick = () => {
        this.service.query(this.settings.twitter_login_url, null, (res) => {
            location.href = res.url
        }, this.unsuccessfulLogin)
    }
    onLinkedInClick = () => {
        IN.User.authorize((response) => {
            IN.API.Raw('/people/~:(email-address,first-name,last-name,public-profile-url,picture-url::(original))')
            .result((data) => {
                data.link = JSON.stringify({name: `${data.firstName} ${data.lastName}`, link: data.publicProfileUrl})
                this.authService.linkedInLogin(data)
                this.successfulLogin()
            })
            .error(this.unsuccessfulLogin)
        })
    }
    onFacebookClick = () => {
        const valueScope = 'public_profile, email, user_birthday, user_actions.news, user_likes, user_location'
        FB.login((response) => {
            if (response.status === 'connected') {
                ((authRes) => {
                    FB.api('/me', {fields: 'email, first_name, last_name, gender, picture, timezone, locale, verified, link'}, (res) => {
                        this.authService.facebookLogin({
                            accessToken: authRes.accessToken,
                            code: authRes.userID,
                            email: res.email,
                            firstName: res.first_name,
                            lastName: res.last_name,
                            gender: res.gender,
                            verified: res.verified,
                            profilePic: res.picture.data.url,
                            locale: res.locale,
                            link: JSON.stringify({name: `${res.first_name} ${res.last_name}`, link: res.link})
                        })
                        this.successfulLogin()
                    })
                })(response.authResponse)
            }
            else {
                this.unsuccessfulLogin()
            }
        }, { scope: valueScope })
    }

    successfulLogin = () => {
        this.modal = null
    }
    unsuccessfulLogin = (error) => {
        this.modal = null
    }
    render() {
        return <div className={this.className}>
            <div className='text'>Log in or sign up with</div>
            <div className='links'>
                {this.items.map((item,i) => <a key={i} {...item} target='_blank'
                    className={`follow-us-icon follow-us-icon-${item.icon}`}
                    onClick={item.onClick}></a>)}
            </div>
        </div>
    }
}
