import { Schema, Types, Document, Model, model } from 'mongoose';

export interface Todo {
    author: Types.ObjectId;
    content: string;
    category?: string;
    isCompleted: boolean;
}

interface TodoBaseDoc extends Todo, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoDoc extends TodoBaseDoc {}

export interface TodoPopulatedDoc extends TodoDoc {}

export interface TodoModel extends Model<TodoDoc> {}

const todoSchema = new Schema<TodoDoc, TodoModel>(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: String,
        },
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
