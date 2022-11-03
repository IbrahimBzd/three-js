import * as React from 'react';
import {AsyncStateStatus, useAsyncState} from 'react-async-states';
import {UserManager} from 'oidc-client';
import {getKeycloakConfig} from "./keycloakConfig";
import {currentUserSource} from "./data/ressource";
import {hasCodeInUrl} from "./hasCodeInUrl";

export default function KeycloakProvider({children}) {
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
        return children
    }

    if (state.status === AsyncStateStatus.error) {
        return <span>The following error occurred: {state.data.toString()}</span>;
    }

    return <span>Trying to connect</span>;
}