import express from "express"
import cors from "cors"
import {PrismaClient} from "@prisma/client"
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "./envs.js";
import auth from "./middlewares/auth.js";

const app = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(cors());
app.listen(3333, () => console.log("Server is Running"));
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

app.post("/notes", auth, async(req, res) => {
  const data = req.body;
  data.userId = req.user.id
  console.log("create note", data)
  const createNote = await prisma.notes.create({
    data
  })
  return res.status(201).json(createNote);
});

app.get("/notes", auth , async (req, res) => {
  console.log("get notes", req.user)
  const notes = await prisma.notes.findMany({where: {
    userId: req.user.id
  }});
  return res.json({ data: notes });
});

app.post("/login", async(req, res) /*onde faz o login*/ => {
  const {email, password} = req.body;
  const user = await prisma.users.findFirst({where: {
    email
  }})
  if (password === user.password) {
    return res.json({
      user: user.id,
      token: jsonwebtoken.sign({ user }, JWT_SECRET),
    }); 
  }
  return res.status(401).json({ error: "Invalid email or password."}) /* early return */
})
