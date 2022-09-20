const express = require("express");
const app = express();
app.use(express.json());

const books = [
  { title: "Harry Potter", id: 1 , author : "J.K. Rowling"},
  { title: "A Passage To India", id: 2, author : "E.M. Forster" },
  { title: "Invisable Man", id: 3, author : "Ralph Ellison" },
  { title: "To Kill a Mochingbird", id: 4, author : "Harper Lee" },
  { title: "The Greate Gatsby", id: 5, author : "Scott Fitzgerald" },
];

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));

  if (!book)
    res
      .status(404)
      .send(
        `Ooops... Can't find what you are looking for!`
      );
  res.send(book);
});

//CREATE Request Handler
app.post("/api/books", (req, res) => {
  const book = {
    title: req.body.title,
    id: books.length + 1,
    author :req.body.author,
  };
  books.push(book);
  res.send(book);
});

//UPDATE Request Handler
app.put("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book) res.status(404).send('This Book Not Found!!');

  book.title = req.body.title;
  book.author = req.body.author,
  res.send(book);
});

//DELETE Request Handler
app.delete("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book)
    res.status(404).send('Not Found!!');

  const index = books.indexOf(book);
  books.splice(index, 1);

  res.send(book);
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
