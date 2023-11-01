require('dotenv').config();
const PORT = process.env.PORT || 8000;;

const app = require('./app');

const start = async () => {
    try {
        await app.listen(PORT);
        app.log.info(`Server is running on ${app.server.address().port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
