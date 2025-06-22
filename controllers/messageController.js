import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { messages } from '../utils/inMemoryDb.js';

const messageSchema = z.object({
  message: z.string().min(10, { message: "Message must be at least 10 characters long." })
});

export const createMessage = (req, res, next) => {
  try {
    const { message } = messageSchema.parse(req.body);
    const id = uuidv4();
    const newMessage = { id, message, createdAt: new Date() };
    messages.set(id, newMessage);
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    next(error);
  }
};

export const getAllMessages = (req, res) => {
  res.status(200).json({
    success: true,
    count: messages.size,
    data: Array.from(messages.values())
  });
};

export const getMessageById = (req, res) => {
  const { id } = req.params;
  if (!messages.has(id)) {
    return res.status(404).json({ success: false, message: "Message not found" });
  }

  res.status(200).json({ success: true, data: messages.get(id) });
};

export const deleteMessage = (req, res) => {
  const { id } = req.params;
  if (!messages.has(id)) {
    return res.status(404).json({ success: false, message: "Message not found" });
  }

  messages.delete(id);
  res.status(200).json({ success: true, message: "Message deleted successfully" });
};
