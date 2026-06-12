import express from 'express'
import UserRouter from './routes/user.routes.js'

const app = express()
const PORT = process.env.PORT_URL ?? 8000

app.use(express.json())


app.get('/',(req,res)=>{
    return res.json({status :"Server is running"})
})
app.use('/user',UserRouter)

app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})

export default express