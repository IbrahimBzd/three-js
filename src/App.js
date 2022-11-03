import * as React from 'react';
import {
    AsyncStateStatus,
    createSource,
    useAsyncState,
} from 'react-async-states';
import {UserManager} from 'oidc-client';


const KEYCLOAK_CONFIG = Object.freeze({
    authority: 'http://localhost:8080/realms/Javatechie/.well-known/openid-configuration',
    client_id: 'sprinboot-keycloak',
    clientId: 'sprinboot-keycloak',
    clientSecret: 'XOOSu5cCz6m4dLcEVDuDa3A2yqyLGmEp',
    redirect_uri: 'http://localhost:3000',
    response_type: 'code',
    scope: 'openid',
    response_mode: 'query',
});

export function getKeycloakConfig() {
    return KEYCLOAK_CONFIG;
}

export const hasCodeInUrl = (location) => {
    const searchParams = new URLSearchParams(location.search);
    const hashParams = new URLSearchParams(location.hash.replace('#', '?'));

    return Boolean(
        searchParams.get('code') ||
        searchParams.get('id_token') ||
        searchParams.get('session_state') ||
        hashParams.get('code') ||
        hashParams.get('id_token') ||
        hashParams.get('session_state'),
    );
};

function producer({payload: {manager}}) {
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

const currentUserSource = createSource('current-user', producer);

export default function AuthProvider() {

    const manager = React.useMemo(() => new UserManager(getKeycloakConfig()), []);
    const {state} = useAsyncState(
        {
            lazy: false,
            payload: {manager},
            source: currentUserSource,
            events: {
                change: (newState) => {
                    if (
                        newState.state.status === AsyncStateStatus.success &&
                        hasCodeInUrl(window.location)
                    ) {
                        window.location.pathname = '/'
                    }
                },
            },
        },
        [manager],
    );

    if (state.status === AsyncStateStatus.success) {
        console.log('success', state)
        return <div>
            <h1 style={{
                fontFamily: 'cursive'
            }}>Logged In Successfully</h1>
        </div>;
    }

    if (state.status === AsyncStateStatus.error) {
        return <span>The following error occurred: {state.data.toString()}</span>;
    }

    return <span>Trying to connect</span>;
}