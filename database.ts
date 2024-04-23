const { MongoClient } = require('mongodb');
export class Database {
    private uri : string
    private client

    constructor() {
        this.uri = 'mongodb://admin:admin@mongodb:27017\n';
        this.client = new MongoClient(this.uri);
    }

    public connectToMongoDB = async () => {
        try {
            await this.client.connect();
            console.log('Connected to the MongoDB data-sender-docker');
            return this.client.db(); // Return the database reference
        } catch (error) {
            console.error('Error connecting to the MongoDB data-sender-docker:', error);
        }
    }

    public addObjectToDatabase = async (collectionName, object) => {
        try {
            const db = await this.connectToMongoDB();
            const collection = db.collection(collectionName);
            const result = await collection.insertOne(object);
            console.log('Object added to the database:', result.insertedId);
        } catch (error) {
            console.error('Error adding object to the database:', error);
        } finally {
            await this.client.close();
            console.log('Connection to the MongoDB data-sender-docker closed');
        }
    }

}



