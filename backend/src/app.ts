import express from "express";
import usersRouter from "./routes/users.js";
// import authRouter from "./routes/auth.js";
import prisma from "./prisma";
import errors from "./middleware/errors.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    userId: 1,
  };
  next();
});

app.use("/users", usersRouter);
app.use(errors.errorHandler);

app.listen(port, () => {
  console.log(`App listening @... http://localhost:${port}`);
});
