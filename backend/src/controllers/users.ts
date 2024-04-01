import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import prisma from "../prisma.js";

export const createUser: RequestHandler = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
    },
  });
  res.status(201).json({ user });
};

// logged in controls...

export const getUserInfo: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  const info = await prisma.user.findUnique({
    where: { id: userId },
  });
  res.status(201).json({ info });
};

// after auth, user creds can be updated
export const updateUser: RequestHandler = async (req, res, next) => {
  const userId = req.user.userId;
  const user = await prisma.user.update({
    where: { id: userId },
    data: req.body,
  });

  if (!user) {
    return next(new Error("404"));
  }
  console.log("user updated!");
  res.json(user);
};

// remove user
export const deleteUser: RequestHandler = async (req, res) => {
  const acctId = req.user.userId;

  // remove all account data
  const chat = await prisma.message.deleteMany({
    where: { userId: acctId },
  });

  const collections = await prisma.collection.deleteMany({
    where: { userId: acctId },
  });

  // and finally remove the user
  const account = await prisma.user.delete({
    where: { id: acctId },
  });

  console.log(`User ${account.username} deleted`);
  res.sendStatus(200);
};

//  get chat history
export const getChatHistory: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  const chat = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      chatHistory: true,
    },
  })!;

  res.send({ history: chat.chatHistory });
};

// get file collections
export const getFileCollections: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      collections: true,
    },
  })!;

  res.send({ collection: user.collections });
};
