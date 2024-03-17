import twitter from 'twitter-lite';

exports.newClient = function (subdomain = 'api') {
    return new twitter({
        subdomain,
        consumer_key: '7G7EaYHIskmEUsEc8t3RIYfgE',
        consumer_secret: 'NDNPqFqUua9TuddoLw1S7IkCiGW2ulFMFtwpQwpzJPhm1OfBdi',
        access_token_key: '1769128796492570624-2phu5Vha12jUty5kFiOLpwwTvEMiHD',
        access_token_secret: 'v61o6dbPT0jTQMglUeSOpcnC0MPtjbrgqL3rCyiizAhej'
    });
}