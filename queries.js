const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // Local MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    console.log("✅ Connected to MongoDB");

    // ------------------------------
    // Example queries
    // ------------------------------

    // 1. Find all books
    const allBooks = await books.find().toArray();
    console.log("All Books:", allBooks);

    // 2. Find books by genre
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("Fiction:", fictionBooks);

    // 3. Find books published after 1950
    const recentBooks = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log("Recent Books:", recentBooks);

    // 4. Update the price of a book
    await books.updateOne({ title: "Wuthering Heights" }, { $set: { price: 1800 } });
    console.log("Price updated for Wuthering Heights");

    // 5. Delete a book
    await books.deleteOne({ title: "Moby Dick" });
    console.log("Moby Dick deleted");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();
