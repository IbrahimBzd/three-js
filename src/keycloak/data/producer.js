import {hasCodeInUrl} from "../hasCodeInUrl";

export function producer({payload: {manager}}) {
    if (hasCodeInUrl(window.location)) {
        // eslint-disable-next-line camelcase
        return manager.signinCallback().then(({access_token, profile}) => {
            localStorage.setItem('token', access_token);
            localStorage.setItem('profile', JSON.stringify(profile));
        });
    }
    return manager.getUser().then((user) => {
        // console.log(user.access_token);s
        if (!user || user.expired) {
            manager.signinRedirect();
            throw new Error('need to login');
        }
        return user;
    });
}
