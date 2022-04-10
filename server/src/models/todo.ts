import mongoose, { model, Schema, Types, Document, Model } from 'mongoose';

export interface Todo {
    content: string;
    isCompleted: boolean;
}

interface TodoBaseDoc extends Todo, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoDoc extends TodoBaseDoc {}

export interface TodoModel extends Model<TodoDoc> {}

const todoSchema = new Schema<TodoDoc, TodoModel>(
    {
        content: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model<TodoDoc, TodoModel>('Todo', todoSchema);
