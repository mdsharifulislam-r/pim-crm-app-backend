import mongoose from "mongoose";
import { IMessage, MessageModel } from "./message.interface";

const messageSchema = new mongoose.Schema<IMessage,MessageModel>({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: false },
    file: {
        url: { type: String, required: false },
        public_id: { type: String, required: false }
    },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    isLink: { type: Boolean, default: false }
}, {
    timestamps: true
});

export const Message = mongoose.model<IMessage, MessageModel>('Message', messageSchema);