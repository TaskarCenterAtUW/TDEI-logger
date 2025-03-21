import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
// import { OswValidator } from "./controller/osw-validator";
import { IController } from "./controller/interface/IController";
import { errorHandler } from "./middleware/error-handler-middleware";
import { unhandledExceptionAndRejectionHandler } from "./middleware/unhandled-exception-rejection-handler";

import { DatabaseService } from "./services/database.service";

import { Core } from "nodets-ms-core";
import { ListenerService } from "./services/listener.service";

class App {
    public app: express.Application;
    public port: number;
    // private databaseService: DatabaseService;

    constructor(controllers: IController[], port: number) {
        this.app = express();
        this.port = port;
        //First middleware to be registered: after express init
        unhandledExceptionAndRejectionHandler();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        
        // this.databaseService = new DatabaseService();

        //Last middleware to be registered: error handler. 
        this.app.use(errorHandler);
    }

    private initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;