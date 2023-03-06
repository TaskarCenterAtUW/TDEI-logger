import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { environment } from "../environment/environment";
import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { QueueMessageContent } from "../models/messages/queue-message-content";
import Record from "../models/record";


export class DatabaseService {

    collections: { records?: mongoDB.Collection } = {}

    initialize(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const client: mongoDB.MongoClient = new mongoDB.MongoClient(environment.mongoDBURL!);

            // await client.connect();
            client.connect().then((value) => {
                const db: mongoDB.Db = client.db(environment.mongoDBName);

                const recordsCollection: mongoDB.Collection = db.collection(environment.recordsCollection!);

                this.collections.records = recordsCollection;

                console.log(`Successfully connected to database: ${db.databaseName} and collection: ${recordsCollection.collectionName}`);
                resolve(true);

            }).catch((e) => {
                reject(e);
            });


        });

    }

    processMessage(msg:QueueMessage) {

        var queueContent = QueueMessageContent.from(msg.data);

        this.collections.records?.findOne<Record>({'tdeiRecordId':queueContent.tdeiRecordId}).then((e)=>{
             
            if(e == null){
                console.log('Inserting new record '+queueContent.tdeiRecordId);
                // record.createdAt = queueMessage.publishedDate;
                var record = Record.generateRecord(msg);
                record.createdAt = msg.publishedDate;
                this.collections.records?.insertOne(record);
            }
            else {
                console.log('Updating record '+queueContent.tdeiRecordId);
                var record = Record.from(e);
                record.updateRecord(msg);
                
                this.collections.records?.updateOne({'tdeiRecordId':e.tdeiRecordId},{$set:record});
            }
        }).catch((e)=>{
            console.log(e);
        });

    }

}


// export const collections: { records?: mongoDB.Collection } = {}

// export async function connectToDatabase() {
//     dotenv.config();

//     const client: mongoDB.MongoClient = new mongoDB.MongoClient(environment.mongoDBURL!);

//     await client.connect();

//     const db: mongoDB.Db = client.db(environment.mongoDBName);

//     const recordsCollection: mongoDB.Collection = db.collection(environment.recordsCollection!);

//     collections.records = recordsCollection;

//     console.log(`Successfully connected to database: ${db.databaseName} and collection: ${recordsCollection.collectionName}`);
// }