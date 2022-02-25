const http = require('http');
const fs = require('fs');
const util = require('util');

const methodNotSupported = (res) => {
    res.writeHead(400);
    res.end('Request method not supported');
}

const htmlResponse = (path, res) => {
    fs.readFile(__dirname + path, (err, data) => {
        if (err){
            res.writeHead(500);
            res.end(JSON.stringify(err));
        }else{
            res.end(data);
        }
    })
}

const requestListener = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    switch(req.url) {
        case '/':
            if (req.method == 'GET') {
                htmlResponse('/post-form.html', res);
            }else{
                methodNotSupported(res);
            }
            break;
        case '/first':
            if (req.method == 'POST') {
                res.writeHead(302, {
                    'Location': '/second'
                });
                res.end();
            } else {
                methodNotSupported(res);
            }
            break;
        case '/second':
            if (req.method == 'GET'){
                htmlResponse('/second.html', res);
            } else {
                methodNotSupported(res);
            }
            break;
        default:
            res.writeHead(404);
            res.end('Page not found');
    }
}

const server = http.createServer(requestListener);
const port = 5555;
const host = '0.0.0.0';
server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
})