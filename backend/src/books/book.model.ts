import mongoose from "mongoose";
import { BookType } from "./bookType";
import mongoosePaginate from "mongoose-paginate-v2";

const bookSchema = new mongoose.Schema<BookType>({
    title : {
        type : String,
        required: true,
        trim: true,
        index: true,
    },
    description : {
        type : String,
        required: false,
        trim: true,
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    genre : {
        type : String,
        required: true,
        trim: true,
        index: true,
    },
    coverImageUrl : {
        type : String,
        required: true,
        trim: true,
    },
    file : {
        type : String,
        required: true,
        trim: true,
    },
},{
    timestamps: true,
})

bookSchema.plugin(mongoosePaginate);

const book = mongoose.model<BookType, mongoose.PaginateModel<BookType>>("Book", bookSchema);
export default book;