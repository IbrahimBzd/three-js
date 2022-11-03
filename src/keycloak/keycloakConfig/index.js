const KEYCLOAK_CONFIG = Object.freeze({
    authority: 'http://localhost:8080/realms/Javatechie/.well-known/openid-configuration',
    client_id: 'sprinboot-keycloak',
    clientId: 'sprinboot-keycloak',
    client_secret: 'ziKPiaQGPvoMBqPLdTixttA7wbhOso0D',
    redirect_uri: 'http://localhost:3000',
    response_type: 'code',
    scope: 'openid',
    response_mode: 'query',
});

export function getKeycloakConfig() {
    return KEYCLOAK_CONFIG;
}
