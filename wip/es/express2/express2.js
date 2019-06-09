/**
 * exmple tirer de la doc officiel
 * 
 * install: npm i -S express
 */

const express = require('express');
const app = express();

eg1_hello_word = () => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.listen(3000, () => console.log('Listening on port 3000 ...'));
};

eg2_static_file = () => {
    // permet d'acceder en direct au fichier dans public
    // http://localhost:3000/images/kitten.jpg
    app.use(express.static(__dirname + 'public'));
    app.use(express.static(__dirname + 'files'));
    // pour mettre un prefix au chemin d acces
    app.use('/static', express.static(__dirname + 'public')); 
};

eg3_routage = () => {
    // middleware
    app.all('/secret', function (req, res, next) {
        console.log('Accessing the secret section ...');
        next(); // pass control to the next handler
    });

    app.get('/', [
        (req, res, next) => {
            console.log('Hello World!');
        },
        (req, res, next) => {
            console.log('Hello World!');
        }
    ], (req, res) => {
        res.send('Hello World!');
    });

    // concat with app.route
    app.route('/book')
        .get(function(req, res) {
            res.send('Get a random book');
        })
        .post(function(req, res) {
            res.send('Add a book');
        })
        .put(function(req, res) {
            res.send('Update the book');
        })
    ;
};

eg4_express_router = () => {
    var birds = require('./birds');
    app.use('/birds', birds);
};

eg5_middleware = () => {
    // launch for each call
    var myLogger = function (req, res, next) {
        console.log('LOGGED');
        next();
    };
    app.use(myLogger);

    var requestTime = function (req, res, next) {
        req.requestTime = Date.now();
        next();
    };
      
    app.use(requestTime);
    app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
    });

    // launch only for the path 
    app.use('/user/:id', function (req, res, next) {
        console.log('Request Type:', req.method);
        next();
    });
      
      
    app.get('/', function (req, res) {
        res.send('Hello World!' + ' ' + req.requestTime);
    });

    app.listen(3000);
};

eg6_middleware_with_router = () => {
    // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
      });
      
    // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
    router.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
    }, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
    });
    
    // a middleware sub-stack that handles GET requests to the /user/:id path
    router.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id == 0) next('route');
    // otherwise pass control to the next middleware function in this stack
    else next(); //
    }, function (req, res, next) {
    // render a regular page
    res.render('regular');
    });
    
    // handler for the /user/:id path, which renders a special page
    router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id);
    res.render('special');
    });
    
    // mount the router on the app
    app.use('/', router);
};

eg7_middleware_error = () => {

app.use(function(err, req, res, next) {
    console.error(err.stack);
        res.status(500).send('Something broke!');
    });  
};

exemple_sumary = (sumary_number) => {
    switch (sumary_number) {
        case 1: {
            eg1_hello_word();
            break;
        }
    }
}

exemple_sumary(1);