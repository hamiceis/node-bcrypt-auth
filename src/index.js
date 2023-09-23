import express from "express" 
import { config } from "dotenv"
import { routerMain } from "./route.js"

config()
const app = express()
app.use(express.json())

app.use(routerMain)

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP Server Running ')
})


//Instanciando o express e importando as routes 