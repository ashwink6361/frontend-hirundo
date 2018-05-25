var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    _ = require('underscore-node'),
    cons = require('consolidate'),
    multer  = require('multer'),
    Config = require('./config/config'),
    root = fs.realpathSync('.'),
    app = express();
//configuring vendor based middlewares
app.use(express.static(path.join(__dirname, 'release')));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use(multer({ dest: './uploads/'}).any());
//rendering engine
app.set('views', './');
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('apiUrl', Config.apiUrl);
app.set('secretKey', Config.key.privateKey);
app.set('socketUrl', Config.socketUrl);
//intercepting API requests
app.use('/api/*', function (req, res, next) {
    var token = req.cookies.token;
    var headers = {        
        Authorization: 'Bearer ' + token,
        privatekey: app.set('secretKey')    
    }; 
    var urlArr = req.originalUrl.split('/');
    urlArr.splice(0, 2);
    var path = urlArr.join('/');

    var method = req.method;
    var uri = app.get('apiUrl') + path;
    //POST INTERCEPTOR
    if (method == 'POST') {
        if (_.isEmpty(req.files)) {
            request.post({
                url: uri,
                json: req.body,
                headers: headers
            }, function (error, httpResponse, body) {
                if (!error) {
                    res.status(httpResponse.statusCode).send(body);
                }
            });
        } else {
            console.log('req.body',req.body);
            var formData = req.body;
            var fileObj = _.pairs(req.files);
            for (var i = 0; i < fileObj.length; i++) {
                formData[fileObj[i][1].fieldname] = fs.createReadStream(__dirname + '/uploads/' + fileObj[i][1].filename);
                fs.unlink(__dirname + '/uploads/' + fileObj[i][1].filename, function(error) {});
            }
            console.log('uri',uri);
            console.log('formData',formData);
            console.log('headers',headers);

            request.post({
                url: uri,
                formData: formData,
                headers: headers
            }, function (error, httpResponse, body) {
                if (!error) {
                    res.status(httpResponse.statusCode).send(body);
                }
            });
        }
    }
    //PUT INTERCEPTOR
    if (method == 'PUT') {
        if (_.isEmpty(req.files)) {
            request.put({
                url: uri,
                json: req.body,
                headers: headers
            }, function (error, httpResponse, body) {
                if (!error) {
                    res.status(httpResponse.statusCode).send(body);
                }
            });
        } else {
            var formData = req.body;
            var fileObj = _.pairs(req.files);
            for (var i = 0; i < fileObj.length; i++) {
                formData[fileObj[i][1].fieldname] = fs.createReadStream(__dirname + '/uploads/' + fileObj[i][1].name);
            }
            request.put({
                url: uri,
                formData: formData,
                headers: headers
            }, function (error, httpResponse, body) {
                if (!error) {
                    res.status(httpResponse.statusCode).send(body);
                }
            });
        }
    }

    //GET INTERCEPTOR
    if (method == 'GET') {
        request.get({
            url: uri,
            headers: headers
        }, function (error, httpResponse, body) {
            if (!error) {
                var resStatus = (httpResponse && httpResponse.statusCode) ? httpResponse.statusCode : 200;
                res.status(resStatus).send(body);
            } else {
                var resStatus = (httpResponse && httpResponse.statusCode) ? httpResponse.statusCode : 500;
                return res.status(resStatus).send({
                    err: error
                });
            }
        });
    }

    //DELETE INTERCEPTOR
    if (method == 'DELETE') {
        request.del({
            url: uri,
            headers: headers
        }, function (error, httpResponse, body) {
            if (!error) {
                res.status(httpResponse.statusCode).send(body);
            }
        });
    }
});

app.get('/server/env', function(req, res) {
    res.send({socketUrl: app.get('socketUrl')});
});

app.use('/login', function (req, res, next) {
    var url = app.get('apiUrl')+'login';
    var body = req.body;
    var headers = {
        "accept-language": req.headers['accept-language'],
        "content-type": "application/json"
    };
    request.post({
        url: url,
        json: body,
        headers: headers
    }, function (error, httpResponse, body) {
        if (!error) {
            res.status(httpResponse.statusCode).send(body);
        }
    });
});

// User Account Varify

app.get('/user/account/verify', function (req, res) {
    var uri = app.get('apiUrl') + 'user/account/verify?userId=' + req.query.userId + '&email=' + req.query.email + '&token=' + req.query.token;    
    var headers = {        
        "accept-language": req.headers['accept-language'],
        "content-type": "application/json"    
    };
    request.get({
        url: uri,
        headers: headers
    }, function (error, httpResponse, body) {
        var result = JSON.parse(body);
        if (result.statusCode == 200) {
            res.send("<p style='text-align: center; color: #fff; background-color: green; padding: 20px; font-size: 18px;'>" + result.message + " on your app</p>");
        } else {
            res.send("<p style='text-align: center; color: #fff; background-color: red; padding: 20px; font-size: 18px;'>" + result.message + " </p>");    
        }
    });
});

// Waiter Account Varify

app.get('/waiter/account/verify', function (req, res) {
    var uri = app.get('apiUrl') + 'user/account/verify?userId=' + req.query.userId + '&email=' + req.query.email + '&token=' + req.query.token;    
    var headers = {        
        "accept-language": req.headers['accept-language'],
        "content-type": "application/json"    
    };
    request.get({
        url: uri,
        headers: headers
    }, function (error, httpResponse, body) {
        var result = JSON.parse(body);
        if (result.statusCode == 200) {
            res.send("<p style='text-align: center; color: #fff; background-color: green; padding: 20px; font-size: 18px;'>" + result.message + " on your app</p>");
        } else {
            res.send("<p style='text-align: center; color: #fff; background-color: red; padding: 20px; font-size: 18px;'>" + result.message + " </p>");    
        }
    });
});

// Department Account Varify

app.get('/department/account/verify', function (req, res) {
    var uri = app.get('apiUrl') + 'user/account/verify?userId=' + req.query.userId + '&email=' + req.query.email + '&token=' + req.query.token;    
    var headers = {        
        "accept-language": req.headers['accept-language'],
        "content-type": "application/json"    
    };
    request.get({
        url: uri,
        headers: headers
    }, function (error, httpResponse, body) {
        var result = JSON.parse(body);
        if (result.statusCode == 200) {
            res.send("<p style='text-align: center; color: #fff; background-color: green; padding: 20px; font-size: 18px;'>" + result.message + " on your app</p>");
        } else {
            res.send("<p style='text-align: center; color: #fff; background-color: red; padding: 20px; font-size: 18px;'>" + result.message + " </p>");    
        }
    });
});

app.get('/*', function (req, res) {
    res.render(path.join(root, 'release/index.html'));
});

//SERVER LISTENING
var port = Config.server.port || 5052;

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    //Route to Frontend to make socket connection
    console.log('Node server running at http://%s:%s. API in use: %s', host, port, app.get('env'));
});
