/**
 *
 * @author: Jason Tse
 *
 */
// Set the 'development' environment configuration object


module.exports = {
    db: 'mongodb://localhost/COMP308',
    sessionSecret: 'superspecialawesomedevelopmentsecret',
    secretKey: 'superspecialawesomesecretkey',
    jwtExpirySeconds: 1800
};