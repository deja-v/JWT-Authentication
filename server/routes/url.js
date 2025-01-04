import express from 'express';
import { handleCreateShortUrl,handleRedirect, handleAnalytics, handleGetShortUrl } from '../controllers/url.js';

const router = express.Router();

router.get('/', (req, res) => {
    handleGetShortUrl(req,res)
});

router.post('/', (req, res) => {
    handleCreateShortUrl(req,res)
});



router.get('/analytics/:id', (req,res)=>{
    handleAnalytics(req,res)
})

export default router