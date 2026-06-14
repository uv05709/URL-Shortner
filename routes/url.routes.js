import express from 'express'
import { error } from 'node:console'

const router = express.Router()

router.post('/shorten', async function (req, res) {
    const userId = req.user.id
    if(!userId){
        return res.status(401).json({error: ` You must be logged in to access this resourse`})
    }
})


export default router