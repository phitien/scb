import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import log from 'loglevel';

import { COOKIE_JWT, COOKIE_USER } from 'apps/authentication/constants/AuthConstants';
import AuthenticationServices from 'apps/authentication/services/AuthenticationServices';

const userHasValidToken = () => {
    // log.info('userHasValidToken');
    try {
        if (typeof window === 'undefined') {
            // log.warn('ENV - Node JS');
            return false;
        } else {
            var token = Cookies.get('af-jwt');
            if (!token)
            return false;

            if (token.length <= 0)
            return false;

            if (token === 'undefined') return false;

            const decodedToken = jwtDecode(token);
            const currentTime = (new Date()).getTime();
            // log.debug('expiry date time according to server', decodedToken.exp);
            // log.debug('current time is ', currentTime);
            if (decodedToken.exp <= Math.floor(currentTime/1000)) {
                // log.warn('as instructed by server, cookies should be cleared now');
                Cookies.remove(COOKIE_JWT);
                Cookies.remove(COOKIE_USER);
                AuthenticationServices.logout();
                return false;
            }
        }
    } catch (e) {
        log.error(e.stack);
        return false;
    }

    return true;
};

const getUserProfilePic = () => {
    if (!userHasValidToken()) {
        return null;
    }
    if (Cookies.get('profilePic')) {
        return Cookies.get('profilePic');
    }
    const token = Cookies.get(COOKIE_JWT);
    if (token) {
        return jwtDecode(token).profilePicture;
    }
    return null;
};

const getUserProfile = () => {
    if (!userHasValidToken()) {
        return null;
    }

    const token = Cookies.get(COOKIE_JWT);
    if (token) return jwtDecode(token);

    return null;
};

const isNormalLoginUser = () => {
    if (userHasValidToken()) {
        const userInfo = jwtDecode(Cookies.get('af-jwt'));
        // console.log(userInfo);
        return userInfo.is_normal_login;
    }
    return false;
};

const isUserAccredited = () => {
    if (userHasValidToken()) {
        const accredited = Cookies.get('isAccredited');
        if (!!accredited) {
            return JSON.parse(accredited);
        }
    }
    return false;
};

export { userHasValidToken, getUserProfile, isNormalLoginUser, getUserProfilePic, isUserAccredited };
