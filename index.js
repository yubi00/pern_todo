const express = require("express");
const path = require("path");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json()); //give access to request.body to access data as json

 app.use(express.static(path.join(__dirname, "client/build")));
if (process.env.NODE_ENV === "production") {
 
}

//ROUTES//

//Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//Get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
    if (todo.rowCount === 0)
      return res.status(404).json({
        message: `Todo of id ${id} not found!`
      });
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [
      description,
      id
    ]);

    const updatedTodo = await pool.query("SELECT * FROM todo WHERE id=$1", [
      id
    ]);
    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.log(err.mesage);
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
    if (todo.rowCount === 0)
      return res.status(404).json({
        message: `Todo of id ${id} not found!`
      });
    await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json({ message: `Todo with the id ${id} deleted` });
  } catch (err) {
    console.log(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
