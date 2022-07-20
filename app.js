const connectDb = require("./db/connect");
const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
const taskRouter = require("./routes/tasksRouter");
const notfound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/errorHandler");
app.use('/api/v1/task', taskRouter);
app.use(notfound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}..... `))
    } catch (error) {
        console.log(error);
    }
}
start();