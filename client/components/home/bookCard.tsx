import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  _id: string;
  title: string;
  bookAuthor : string
  coverImageUrl: string;
}

export default function BookCard({
  _id,
  title,
  bookAuthor,
  coverImageUrl,
}: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 book-text">
      {/* Square Image Container */}
      <div className="relative w-full aspect-square">
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 200px"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">by {bookAuthor}</p>
        <Link
          href={`/books/${_id}`}
          className="inline-block bg-[#ff6700] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}