'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'assets')
            }
        }
    });

    await server.register(require('@hapi/vision'));
    await server.register(require('@hapi/inert'));

    
    server.state('username', {
        ttl: null,
        isSecure: true,
        isHttpOnly: true
    });

    

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '/assets/image.png'
            }
        }
    });

    const getDate = {
        name: 'getDate',
        version: '1.0.0',
        register: async function (server, options) {
    
            const currentDate = function() {
    
                const date = new Date();
                return `Hello ${ options.name }. The current date is ${ date }`
            };
    
            server.decorate('toolkit', 'getDate', currentDate);
        }
    };

    await server.register({
        plugin: getDate,
        options: {
            name: 'Abdulrahman Fawzy'
        }
    });

    
    server.route({
        method: 'GET',  
        path: '/',
        handler: (req, res) => {
            return res.view('home', { heading: 'Asswaat', para: 'Asswaat is a web application that allows you to send records to people without knowing you' });
        }
    });


   


    server.route({
        method: 'GET',
        path: '/user',
        handler: (req, res) => {
            res.response({ msg: 'There are lots of things now' });
        }
    });

    server.route({
        method: 'POST',  
        path: '/user',
        handler: (req, res) => {
            const user = req.payload;
            if(user.id === 1) {
                return res.response({ statusCode: '200', message: 'Success', result: user });
            } else throw Boom.notFound('Page not found');
            
        }
    });
 
    const getBooks = async () => {
        return [
            { author: 'good', isbn: 25, pageCount: 5, datePublished: Date.now()  },
            { title: 'good', author: 'good', isbn: 25, pageCount: 5, datePublished: Date.now()  },
            { title: 'good', author: 'good', isbn: 25, pageCount: 5, datePublished: Date.now()  }
        ]
    }
    

    server.route({
        method: 'GET',  
        path: '/books',
        handler: async (req, res) => {
            return await getBooks();
        }
    });

    server.route({
        method: 'POST',  
        path: '/api/book/addBook',
        handler: async (req, res) => {
            const book = req.payload;
            if(!book.title || !book.author || !book.isbn || !book.pageCount) {
                return res.response({ statusCode: '400', message: 'Failed', result: book });
            }
        }
    });

    await server.start();
    console.log('Server running on port 3000');

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();