const uuid = require("uuid/v4");
const express = require("express");
const router = express.Router();
const { books } = require("../data/db.json");
const { Author, Book } = require("../models");

const filterBooksBy = (property, value) => {
  return books.filter(b => b[property] === value);
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.sendStatus(403);
  } else {
    if (authorization === "Bearer my-awesome-token") {
      next();
    } else {
      res.sendStatus(403);
    }
  }
};

router
  .route("/")
  .get(async (req, res) => {
    const { author, title } = req.query;

    if (title) {
      //get only books matching that title
      const books = await Book.findOne({
        where: { title: title },
        include: [Author]
      });
      res.json(books);
    } else if (author) {
      const books = await Book.findAll({
        include: [{ model: Author, where: { name: author } }]
      });
      res.json(books);
    } else {
      const books = await Book.findAll({
      include: [Author]
      })
      res.json(books);
    }
  })
  .post(verifyToken, async (req, res) => {
    const {title, name} = req.body
    //save book to the DB
    const newBook = await Book.create({
      title:title,
      author:{name:name}
    }, {include: [Author]})
    res.status(201).json(newBook);
  });

router
  .route("/:id")
  .put(async (req, res) => {
    const book = await Book.findOne({
      where: {id: req.params.id},
      include: [Author]
    })
    if (book) {
    const updated = await book.update({
      title: req.body.title
    })
      res.status(202).json(updated);
    } else {
      res.sendStatus(400);
    }
  })
  .delete((req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
      res.sendStatus(202);
    } else {
      res.sendStatus(400);
    }
  });

module.exports = router;
