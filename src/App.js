import * as React from 'react';
import KeycloakProvider from "./keycloak";
import Logout from "./keycloak/Logout";

export default function App() {
    return <KeycloakProvider>
        <div style={{
            width: '90%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 10
        }}>
            <h1 style={{
                fontFamily: 'sans-serif'
            }}>Logged in successfully</h1>
            <Logout/>
        </div>
    </KeycloakProvider>
}