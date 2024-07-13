// This file contains the URLs for the API endpoints and Oauth2 authentication.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const OAUTH2_REDIRECT_URI = import.meta.env.VITE_OAUTH2_REDIRECT_URI;

export const AvatarUrl = API_BASE_URL + '/avatar/';
export const FilesUrl = API_BASE_URL + '/files/';
export const CertificateUrl = API_BASE_URL + '/certificate-url/';
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;