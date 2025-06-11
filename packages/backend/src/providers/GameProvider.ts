import {Collection, MongoClient} from "mongodb";
import {IGameData} from "../shared/SerializedGame";




export class GameProvider {
    private readonly collection: Collection<IGameData>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.GAMES_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing GAMES_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<IGameData>(COLLECTION_NAME);
    }

    getAllGames() {
        return this.collection.find().toArray()
    }
}
