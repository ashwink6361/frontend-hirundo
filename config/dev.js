/*******************************************************************************
 * Put Server and Plugins configs here
 * ENV: Development
 ******************************************************************************/

'use strict';

const path = require('path');
const projectName = 'MVP Hirundo';
const port = 5052;
const apiUrl = 'http://localhost:5051/';

module.exports = {
    env: 'development',
    server: {
        host: '127.0.0.1',
        port: port
    },
    product: {
        name: projectName+' Web Server'
    },
    key: {
        privateKey: 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc'
    },
    apiUrl: apiUrl+'api/'
};

