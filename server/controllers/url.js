import mongoose from "mongoose"
import { ShortUrl } from "../models/shortUrl.js"
import {nanoid} from "nanoid"
import { User } from "../models/user.js"

async function handleGetShortUrl(req,res){
    
    try {
        const entry = await ShortUrl.find({ createdBy: req.user._id });
        res.json(entry)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error getting Short URL" })
    }
     
}

async function handleCreateShortUrl(req,res){
    
    try {
        const body = req.body;
        if(!body || !body.url) res.send("please provide an url")
        console.log(req.user)
        const user = req.user
        const entry =await User.findOne({user})
        
        
        const result = await ShortUrl.create({
            shortId: nanoid(10),
            redirectUrl: body.url,
            createdBy: req.user._id
        })
        console.log(result);
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error creating Short URL" })
    }
     
}

async function handleRedirect(req,res){
    try {
        
        const entry = await ShortUrl.findOneAndUpdate({
            shortId: req.params.id
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        })
        console.log(entry)
        res.redirect(entry.redirectUrl)
    } catch (error) {
        console.log(error)
        res.send("error redirecting")
    }
}

async function handleAnalytics(req,res) {
    try {
        const entry = await ShortUrl.findOne({shortId: req.params.id})
        res.json({"Clicks": entry.visitHistory.length})
    } catch (error) {
        console.log(error);
        
        res.json({ error: "Error getting clicks" })
    }
}

export {handleCreateShortUrl,handleRedirect,handleAnalytics, handleGetShortUrl}