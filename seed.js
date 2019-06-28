const { Author, Book } = require("./models");

const createBooksAndAuthors = async () => {
  //create authors
  //   const author1 = await Author.create({ name: "George Orwell" });

  //create books
  //   await Book.create({ title: "Animal Farm" });
  //   await Book.setAuthor(author1); //setAuthor method is created when you do the sequelize linking

  await Author.create(
    {
      name: "George Orwell",
      books: [
        { title: "Animal Farm" },
        { title: "My family and other animals" },
        { title: "1984" }
      ]
    },
    { include: [Book] }
  );

  await Author.create(
    {
      name: "Roald Dahl",
      books: [
        { title: "Matilda" },
        { title: "Charlie and the Cholocate Factory" }
      ]
    },
    { include: [Book] }
  );
};

module.exports = createBooksAndAuthors;
