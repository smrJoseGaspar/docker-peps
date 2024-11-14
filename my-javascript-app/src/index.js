// Fichero que renderiza la página web del servidor Node
const express=require('express');
const app=express();
const PORT=8080
app.use(express.static('src/public'));

app.get('/',(req, res) => {
    res.render("index.js");
});

app.listen(PORT, () => console.log('Servidor escuchando en el puerto', PORT));
