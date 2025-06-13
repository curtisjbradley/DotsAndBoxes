import {Collection, MongoClient, ObjectId} from "mongodb";
import type {IGameData} from "../shared/SerializedGame";
import * as process from "node:process";

export interface IInviteDocument {
    _id: ObjectId;
    username: string;
    size: {
        x: number;
        y: number;
    }
    createdAt: Date;
}


export class InviteProvider {
    private readonly collection: Collection<IInviteDocument>;
    private readonly gamesCollection: Collection<IGameData>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.INVITES_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing INVITES_COLLECTION_NAME from env file");
        }

        this.collection = mongoClient.db().collection<IInviteDocument>(COLLECTION_NAME);

        const GAMES_COLLECTION_NAME = process.env.GAMES_COLLECTION_NAME;
        if (!GAMES_COLLECTION_NAME) {
            throw new Error("Missing GAMES_COLLECTION_NAME from env file");
        }
        this.gamesCollection = mongoClient.db().collection<IGameData>(GAMES_COLLECTION_NAME);

    }

    createInvite(username: string, height : number, width : number) {
        return this.collection.insertOne({_id: new ObjectId(), username,size: {x: width, y:height}, createdAt: new Date}).then((result) => this.collection.findOne({_id: result.insertedId})).then(found => {
            if(!found) {
                throw new Error("Could not create invite");
            }
            return found;
        })
    }

    getInvite(id: string) {
        return this.collection.findOne({_id: new ObjectId(id)})
    }
    acceptInvite(inviteId: string, user: string) {
        return this.collection.findOne({_id: new ObjectId(inviteId)}).then(async invite =>  {
            if(!invite) {
                throw new Error("Invite not found");
            }

            if(invite.username === user) {
                throw new Error("User cannot play themselves");
            }

            const newGame : IGameData = {
                _id: new ObjectId().toString(),
                board: {
                    size: invite.size,
                    moves: []
                },
                currentMove: user,
                player1: user,
                player2: invite.username,
                startedAt: new Date,
            }
            const game = await this.gamesCollection.insertOne(newGame).then(addedGame => this.gamesCollection.findOne({_id: addedGame.insertedId}));

            if(!game) {
                throw new Error("Could not create new game");
            }
            await this.collection.deleteOne(invite)
            return game
        })

    }
}