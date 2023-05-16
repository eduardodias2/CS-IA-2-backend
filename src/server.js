import express from "express"
import cors from "cors"
import {PrismaClient} from "@prisma/client"
const app = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(cors());
app.listen(3333, () => console.log("Sever is Running"));
app.post("/register", async(req, res) => {
  const data = req.body;
  try {
    const createdUser = await prisma.users.create({
      data
    })
    return res.json({ data: createdUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occured: This email has already been registered."})
  }
});
app.post("/notes", async(req, res) => {
  const data = req.body;
  const createNote = await prisma.notes.create({
    data
  })
  return res.sendStatus(201);
});
app.get("/notes", async(req, res) => {
  const notes = await prisma.notes.findMany()
  return res.json({ data: notes });
});
app.post("/login", async(req, res) => {
  return res.send();
})