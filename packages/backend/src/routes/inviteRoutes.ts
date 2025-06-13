import express from "express";
import {InviteProvider} from "../providers/InviteProvider";
import {BackEndRoutes} from "../shared/ValidRoutes";
import {verifyAuthToken} from "../tokenAuth";
import {ObjectId} from "mongodb";





export function registerInviteRoutes(app: express.Application, inviteProvider: InviteProvider){
    app.post(BackEndRoutes.GAMES, verifyAuthToken, async (req, res) => {
        const {height ,width}  = req.body
        if(!req.user?.username) {
            res.status(401).json({message: "User Not Found"});
            return;
        }
        if(!height || !width || height < 2 || width < 2){
            res.status(400).json({message: "Invalid height or width"});
            return
        }
        await inviteProvider.createInvite(req.user.username, height, width).then(invite => {
            return res.status(201).json(invite);
        }).catch(err => {
            return res.status(500).json({message: err.message});
        })
    })
    app.get(BackEndRoutes.INVITE, verifyAuthToken, (req, res) => {
        const {inviteId} = req.params;

        if(!ObjectId.isValid(inviteId)){
             res.status(404).json({message: "Invalid invite ID"});
             return;
        }
        inviteProvider.getInvite(inviteId).then(invite => {
            if(!invite){
                return res.status(404).json({message: "Invite not found"});
            }
            return res.status(200).json(invite);
        }).catch(err => {
            res.status(500).json({message: err.message});
        })
    })
    app.patch(BackEndRoutes.INVITE, verifyAuthToken, async (req, res) => {
        const {inviteId} = req.params;
        if (!inviteId) {
            res.status(401).json({message: "Invalid invite ID"});
            return;
        }
        const submitter = req.user?.username;
        if (!submitter) {
            res.status(401).json({message: "Invalid user name"});
            return
        }

        inviteProvider.getInvite(inviteId).then(invite => {
            if (!invite) {
                return res.status(404).json({message: "Invite not found"});
            }
            inviteProvider.acceptInvite(invite._id.toString(), submitter).then(game => {
                res.status(201).json(game);
            })
        }).catch(err => {
            res.status(500).json({message: err.message});
        })
    });
}