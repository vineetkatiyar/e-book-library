export interface Book {
    _id: string;
    title: string;
    description: string;
    author: Author;
    genre: string;
    coverImageUrl: string;
    file: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Author {

    name: string;
}