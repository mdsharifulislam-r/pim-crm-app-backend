import { model, Schema } from 'mongoose';
import { INotification, NotificationModel } from './notification.interface';

const notificationSchema = new Schema<INotification, NotificationModel>(
    {
        text: {
            type: String,
            required: true
        },
        receivers: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            required: false
        },
        reference: {
            type: String,
            required: false
        },
        read: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            enum: ["general", "chat", "group"],
            required: false,
            default: "general"
        },
        readers: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            required: false
        },

        link: {
            type: String,
            enum: ["task", "case", "chat", "group", "user", "document", "team", "client"],
            required: false,
        },
        title: {
            type: String,
            required: true
        }
        

    },
    {
        timestamps: true
    }
);

export const Notification = model<INotification, NotificationModel>(
    'Notification',
    notificationSchema
);
