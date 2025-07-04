import app from "./app";
import { config } from "./config/config";
import connectDB from "./config/db";

const startServer = async() => {

    await connectDB();

    const PORT = config.port || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
    );
}

startServer();