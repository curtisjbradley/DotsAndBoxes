import express from "express";

import {BackEndRoutes} from "../shared/ValidRoutes";
import {GameProvider} from "../providers/GameProvider";
import {verifyAuthToken} from "../tokenAuth";

export function registerGameRoutes(app: express.Application, gameProvider: GameProvider){
    app.get(BackEndRoutes.GAMES, verifyAuthToken, (req, res) => {


        if(!req.query?.id) {
            gameProvider.getAllGames().then(games => res.status(200).json(games))
            return;
        }

        const gameId = req.query.id;
        gameProvider.getAllGames().then(games => {
            const foundGame = games.find(game => game._id.toString() === gameId)
            if(!foundGame){
                return res.status(404).json({message: "No game found."});
            } else {
                return res.status(200).json(foundGame);
            }
        }).catch(err => res.status(500).json(err));
    })
}