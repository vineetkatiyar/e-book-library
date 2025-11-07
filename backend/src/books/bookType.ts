import mongoose, { Document } from "mongoose";
import { User } from "../user/user.types";

export interface BookType extends Document {
    _id : string;
    title: string;
    description?: string;
    bookAuthor : string;
    author : User;
    genre : string;
    coverImageUrl : string;
    file : string;
    createdAt : Date;
    updatedAt : Date;
}

export interface BookPaginateModel extends mongoose.Model<BookType> {}