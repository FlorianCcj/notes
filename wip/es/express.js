// file: express.js
// start: node express.js
// install: npm i -S express
// to see: in browser, url=localhost:3000
// thx to https://flaviocopes.com/

/** Install
 * -----------------
 * 
 * npm init
 * npm i -S express

 * yarn init
 * yarn add express
 */

const express = require('express');
const app = express();
var cors = require('cors');
const session = require('express-session');
const { check } = require('express-validator/check')

// for url like localhost:3000
eg1_hello_word = () => {
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(3000, () => console.log('Server ready'))
};

// for url like localhost:3000/?name=flavio&age=35
eg2_query_parameter = () => {
    app.get('/', (req, res) => {

        console.log('query: all')
        console.log('--------------------')
        console.log(req.query)
        console.log('query: one by one')
        console.log('--------------------')
        for (const key in req.query) {
            console.log(key, ': ', req.query[key])
        }
        console.log(`req.query.name: ${req.query.name}`)
        console.log('--------------------')
        res.end()
    });
    app.listen(3000)
};

eg3_post_query = () => {
    // for Content-Type: application/json
    // if header = 
    app.use(express.json());

    // for Content-Type: application/x-www-form-urlencoded
    // if header =
    app.use(express.urlencoded());

    app.post('/form', (req, res) => {
        const name = req.body.name;
    });
};

eg4_response = () => {
    app.get('/answer', (req, res) => {
        // if give text Content-Type: text/html
        // if give object Content-Type: application/json
        res.send({"coucou": "walou"});
    });
    app.get('/200', (req, res) => {
        res.sendStatus(200);
        // <=> res.status(200).send('Ok');
    });
    app.get('/403', (req, res) => {
        res.sendStatus(403);
        // <=> res.status(403).send('Forbidden');
    });
    app.get('/404', (req, res) => {
        res.sendStatus(404);
        // <=> res.status(404).send('File not found');
    });
    app.get('/500', (req, res) => {
        res.sendStatus(500)
        // === res.status(500).send('Internal Server Error')
    });

    app.get('/json', (req, res) => {
        res.json({"coucou": "walou"});
    });

    app.listen(3000, () => console.log('Server ready'))
};

eg5_header = () => {
    app.get('/json', (req, res) => {
        res.set('content-type', 'application/json');
        res.type('json');
        res.end();
    });
    app.listen(3000, () => console.log('Server ready'))
};

eg6_redirect = () => {
    // made a 302
    app.get('/1', (req, res) => {
        res.redirect('/2');
    });
    app.get('/2', (req, res) => {
        res.redirect(301, '/3/hey');
    });
    app.get('/3/hey', (req, res) => {
        res.redirect(301, '/..');
    });
    app.get('/3', (req, res) => {
        res.end();
    });
    app.get('/back', (req, res) => {
        res.redirect('back');
    });
    app.listen(3000, () => console.log('Server ready'))
};

eg7_routing_parameters = () => {
    app.get('/uppercase/:theValue', (req, res) => {
        res.send(req.params.theValue.toUpperCase());
    });
    // regex will match /post , /post/first , /thepost , /posting/something , and so on.
    app.get(/post/, (req, res) => res.end())
    app.listen(3000, () => console.log('Server ready'))
};

eg8_cors = () => {
    const whitelist = ['http://example1.com', 'http://example2.com']
    const corsOptions = {
        origin: function(origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
    app.get('/with-cors', cors(corsOptions), (req, res, next) => {
        res.json({ msg: 'WHOAH with CORS it works!' });
    });
    app.listen(3000, () => console.log('Server ready'))
};

eg9_prefligth = () => {
    //allow OPTIONS on just one resource
    app.options('/the/resource/you/request', cors());
    //allow OPTIONS on all resources
    app.options('*', cors());
};

eg10_middleware = () => {
    const myMiddleware = (req, res, next) => {
        next()
    };
    app.get('/', myMiddleware, (req, res) => res.send('Hello World!'));
};

eg11_static_file = () => {
    app.get('/', (req, res) => res.download('./yarn.lock'));
    app.get('/', (req, res) => res.download('./yarn.lock', './dat_spam.txt'));    
    app.listen(3000, () => console.log('Server ready'));
};

eg12_session = () => {
    app.use(session({
        'secret': '343ji43j4n3jn4jk3n',
    }));
    app.get('/', (req, res, next) => {
        req.session.name = 'Flavio'
        res.send(req.session);
        console.log(req.session);
    });
    app.listen(3000, () => console.log('Server ready'));
};

eg13_validating_input = () => {
    app.post('/form', [
        check('name')
            .isAlpha()
            .withMessage('Must be only alphabetical chars')
            .isLength({ min: 10 })
            .withMessage('Must be at least 10 chars long'),
        check('email')
            .isEmail()
            .custom(email => {
                if (alreadyHaveEmail(email)) {
                    throw new Error('Email already registered')
                }
            }),
        check('age').isNumeric()
    ], (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const age = req.body.age;
    });
    app.listen(3000, () => console.log('Server ready'));
};

eg14_sanitizing = () => {
    app.use(express.json());
    // trim() trims characters (whitespace by default) at the beginning and at the end of a string
    // escape() replaces < , > , & , ' , " and / with their corresponding HTML entities
    // normalizeEmail() canonicalizes an email address. Accepts several options to lowercase email addresses or subaddresses (e.g. flavio+newsletters@gmail.com )
    // blacklist() remove characters that appear in the blacklist
    // whitelist() remove characters that do not appear in the whitelist
    // unescape() replaces HTML encoded entities with < , > , & , ' , " and /
    // ltrim() like trim(), but only trims characters at the start of the string
    // rtrim() like trim(), but only trims characters at the end of the string
    // stripLow() remove ASCII control characters, which are normally invisible

    const sanitizeValue = value => {
        return value;
    };
    app.post('/form', [
        check('name')
            .isAlpha()
            .withMessage('Must be only alphabetical chars')
            .isLength({ min: 10 })
            .withMessage('Must be at least 10 chars long')
            .trim().escape(),
        check('email')
            .isEmail()
            .custom(email => {
                if (alreadyHaveEmail(email)) {
                    throw new Error('Email already registered')
                }
            })
            .normalizeEmail(),
        check('age').isNumeric()
            .trim().escape(),
        check('value').customSanitizer(value => sanitizeValue(value)),
    ], (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const age = req.body.age;
    });
    app.listen(3000, () => console.log('Server ready'));
};
eg15_handling_form = () => {
    // wtf ... don t understand
    app.listen(3000, () => console.log('Server ready'));
};
eg16_file_upload = () => {
    app.listen(3000, () => console.log('Server ready'));
};
eg17_https = () => {
    /**
     * with openssl generate certs 
     * `openssl req -nodes -new -x509 -keyout server.key -out server.cert`
     * Just remember to set this to localhost
     */

    const https = require('https');
    const fs = require('fs');
    app.get('/', (req, res) => {
        res.send('Hello HTTPS!');
    });
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(3000, () => {
        console.log('Listening...');
    });
};

eg18_let_s_encrypt = () => {
    /**
     * install certbot
     * ```
     * sudo add-apt repository ppa:certbot/certbot
     * sudo apt-get update
     * sudo apt-get install certbot
     * ```
     * 
     * generate cert
     * `certbot certonly --manual`
     * 
     * active renewal
     * `0 */12 * * * root /usr/local/bin/certbot renew >/dev/null 2>&1`
     */

    app.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ))
    
    const fs = require('fs')
    const https = require('https')
    const app = express()
    
    app.get('/', (req, res) => {
        res.send('Hello HTTPS!')
    });
    https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/path/to/key.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/path/to/cert.pem'),
        ca: fs.readFileSync('/etc/letsencrypt/path/to/chain.pem')
    }, app).listen(443, () => {
        console.log('Listening...')
    });
}

exemple_sumary = (sumary_number) => {
    switch (sumary_number) {
        case 1: {
            eg1_hello_word();
            break;
        }
        case 2: {
            eg2_query_parameter();
            break;
        }
        case 3: {
            eg3_post_query();
            break;
        }
        case 4: {
            eg4_response();
            break;
        }
        case 5: {
            eg5_header();
            break;
        }
        case 6: {
            eg6_redirect();
            break;
        }
        case 7: {
            eg7_routing_parameters();
            break;
        }
        case 8: {
            eg8_cors();
            break;
        }
        case 9: {
            eg9_prefligth();
            break;
        }
        case 10: {
            eg10_middleware();
            break;
        }
        case 11: {
            eg11_static_file();
            break;
        }
        case 12: {
            eg12_session();
            break;
        }
        case 13: {
            eg13_validating_input();
            break;
        }
        case 14: {
            eg14_sanitizing();
            break;
        }
        case 15: {
            eg15_handling_form();
            break;
        }
        case 16: {
            eg16_file_upload();
            break;
        }
        case 17: {
            eg17_https();
            break;
        }
        case 18: {
            eg18_let_s_encrypt();
            break;
        }
    }
}

exemple_sumary(12);
