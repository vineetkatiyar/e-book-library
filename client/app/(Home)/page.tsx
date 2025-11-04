import Banner from "@/components/home/banner";
import BookList from "@/components/home/bookList";
import BookLoadingSkeleton from "@/components/home/bookLoadinSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Banner />
      <Suspense fallback={<BookLoadingSkeleton/>}>
      <BookList />
      </Suspense>
    </div>
  );
}
