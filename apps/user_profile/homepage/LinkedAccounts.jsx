import React from 'react'
import UserProfileComponent from '../components/Component'
import ConfirmUnlinkModal from '../modals/ConfirmUnlinkModal'

export default class LinkedAccountsComponent extends UserProfileComponent {
    get changed() {
        return this.state.linkedLinkedin != this.authStore.linkedLinkedin
            || this.state.linkedTwitter != this.authStore.linkedTwitter
            || this.state.linkedFacebook != this.authStore.linkedFacebook
    }
    init() {
        this.state.linkedLinkedin = this.authStore.userInfo.linkedLinkedin
        this.state.linkedTwitter = this.authStore.userInfo.linkedTwitter
        this.state.linkedFacebook = this.authStore.userInfo.linkedFacebook
    }
    renderLinkedAccount = (title, account) => {
        let name
        try {name = JSON.parse(account.replace(/\'/g, '\"')).name}
        catch(e) {name = account && account.name ? account.name : account}
        return name ? <div className='linked-account'>
            <div className='title'>{title}:</div>
            <div className='account'>{name}</div>
            <a className='btn-unlink' onClick={this.onUnLink(title)}>Unlink</a>
        </div> : null
    }
    renderLink = (title, account) => {
        try {account = JSON.parse(account).name} catch(e) {}
        return !account ? <a className='btn-link' onClick={this.onLink(title)}>{title}</a> : null
    }
    onUnLink = (title) => () => {
        this.modal = <ConfirmUnlinkModal title={title} onConfirm={this.onConfirmUnlink(title)}/>
    }
    onConfirmUnlink = (title) => title == 'Linkedin' ? this.onUnLinkToLinkedin : title == 'Twitter' ? this.onUnLinkToTwitter : this.onUnLinkToFacebook
    onUnLinkToLinkedin = () => {
        this.modal = null
        this.setState({linkedLinkedin: ''})
    }
    onUnLinkToTwitter = () => {
        this.modal = null
        this.setState({linkedTwitter: ''})
    }
    onUnLinkToFacebook = () => {
        this.modal = null
        this.setState({linkedFacebook: ''})
    }
    onLink = (title) => title == 'Linkedin' ? this.onLinkToLinkedin : title == 'Twitter' ? this.onLinkToTwitter : this.onLinkToFacebook
    onLinkToLinkedin = () => {
        if (IN && IN.User) {
            IN.User.authorize(() => IN.API.Raw('/people/~:(email-address,first-name,last-name,public-profile-url,picture-url::(original))')
            .result(res => {
                this.setState({linkedLinkedin: JSON.stringify({name: `${res.firstName} ${res.lastName}`, link: res.publicProfileUrl})})
            })
            .error(error => console.log('linked in get info error')))
        }
    }
    onLinkToTwitter = () => this.authService.linkTwitterAccount()
    onLinkToFacebook = () => FB.api('/me', {fields: 'email, first_name, last_name, gender, picture, timezone, locale, verified, link'}, (res) => {
        this.setState({linkedFacebook: JSON.stringify({name: `${res.first_name} ${res.last_name}`, link: res.link})})
    })
    render() {
        return <div className='field field-linking-accounts'>
            <div className='field-label'>Linked accounts</div>
            {this.state.linkedFacebook || this.state.linkedLinkedin || this.state.linkedTwitter ? <div className='linked-accounts'>
                {this.renderLinkedAccount('Facebook', this.state.linkedFacebook)}
                {this.renderLinkedAccount('Linkedin', this.state.linkedLinkedin)}
                {this.renderLinkedAccount('Twitter', this.state.linkedTwitter)}
            </div> : null}
            {this.state.linkedFacebook && this.state.linkedLinkedin && this.state.linkedTwitter ? null : <div className='links'>
                <div className='title'>Link:</div>
                {this.renderLink('Facebook', this.state.linkedFacebook)}
                {this.renderLink('Linkedin', this.state.linkedLinkedin)}
                {this.renderLink('Twitter', this.state.linkedTwitter)}
            </div>}
        </div>
    }
}
