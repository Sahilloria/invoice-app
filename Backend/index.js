import app from "./app.js"
import { connectDB } from "./src/db/connectDB.js"


connectDB().then(()=>{
    app.listen(process.env.PORT|| 8000, ()=>{
        console.log("App is running at:" ,process.env.PORT)
    })
})


