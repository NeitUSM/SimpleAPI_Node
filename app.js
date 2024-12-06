import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//Middleware
app.use(bodyParser.json());

const readData = () => {
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error){
        console.log(error)
    }
};

const writeData = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error){
        console.log(error);
    }
};

readData()

app.get('/', (req, res) =>{
    res.send("This is my first API");
});

app.get('/books', (req, res) =>{
    const data = readData();
    res.json(data.books)
});

app.get('/books/:id', (req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id) //Extraer id y transformar a entero
    const book = data.books.find((book) => book.id === id) ;
    res.json(book)
});

app.post("/books", (req,res) => {
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ... body,
    };
    data.books.push(newBook);
    writeData(data)
    res.json(newBook)
});

app.put("/books/:id", (req,res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "Book updated!"});
});

app.delete("/books/:id", (req,res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({message: "Book deleted!"});
});

//Error 404
app.use((req,res,next) => {
    res.status(404).send("<h1>Error 404: página no encontrada</h1>")
})
