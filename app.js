const express = require('express');
const bodyParser = require('body-parser');
const recordRoutes = require('./routes/recordRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/records', recordRoutes);

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
