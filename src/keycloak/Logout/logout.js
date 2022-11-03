export default function logout() {
    const KEYCLOAK_URL = 'http://localhost:8080/realms/Javatechie/protocol/openid-connect/logout';
    // http://{domain-name}/auth/realms/{realm-name}/protocol/openid-connect/logout?redirect_uri=encodedRedirectUri
    // const loginUrl = 'http://localhost:8080/realms/Javatechie/.well-known/openid-configuration';
    // const redirectUri = 'http%3A%2F%2Flocalhost%3A3000';
    window.location.href = KEYCLOAK_URL;
    localStorage.clear();
    sessionStorage.clear();
}