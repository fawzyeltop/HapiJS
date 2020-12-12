server.route({
    method: 'GET',
    path: '/user',
    handler: (req, res) => {
        const user = {
            id: 5,
            name: 'Abdulrahman Fawzy',
            age: 22
        }
        return user;
    }
});

const user = server.route({
    method: 'POST',  
    path: '/user',
    handler: (req, res) => {
        console.log(res.getDate());
        const user = req.payload;
        res.response({ id: user.id + 1, name: user.name + ' here', age: user.age * 2 });
    }
});


module.exports = user;
