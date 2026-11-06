const express = require("express")
const mysql = require("mysql2/promise")
const app = express()

// db = DATABASE
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    port: 3305,
    database: "escola"
})

// Professores
app.get("/professores", async (req, res) => {
    const [professores] = await db.execute("SELECT * FROM professores")
    return res.json(professores)
})

app.post("/professores", async (req, res) => {
    const { nome } = req.body 

    if(!nome) {
        return res.status(400).json("Nom não informado")
    }

    if(nome.length <= 2){
        return res.status(400).json("Nome muito curto")
    }

    const resultado = await db.execute("INSERT INTO professores(nome) VALUES (?)", [nome])
    
    return res.status(201).json({id: resultado.insertId, nome})

})

app.listen(3000, () => console.log("API no ar :D"))                        