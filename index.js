import express from 'express'
const app = express()
const PORT = process.env.PORT_URL ?? 8000

app.get('/',(req,res)=>{
    return res.json({status :"Server is running"})
})
app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})

export default express