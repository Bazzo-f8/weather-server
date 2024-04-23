"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
class Database {
    constructor() {
        this.connectToMongoDB = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log('Connected to the MongoDB data-sender-docker');
                return this.client.db(); // Return the database reference
            }
            catch (error) {
                console.error('Error connecting to the MongoDB data-sender-docker:', error);
            }
        });
        this.addObjectToDatabase = (collectionName, object) => __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connectToMongoDB();
                const collection = db.collection(collectionName);
                const result = yield collection.insertOne(object);
                console.log('Object added to the database:', result.insertedId);
            }
            catch (error) {
                console.error('Error adding object to the database:', error);
            }
            finally {
                console.log('Connection to the MongoDB');
            }
        });
        this.closeConnection = () => __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
        });
        this.uri = 'mongodb://admin:admin@mongodb:27017';
        this.client = new mongodb_1.MongoClient(this.uri);
    }
}
exports.Database = Database;
