let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'jupauls-next-race-client.herokuapp.com':
        APIURL = 'https://jupauls-next-race.herokuapp.com'
        break;
    default:
        console.log('Unable to connect.');
}

export default APIURL;