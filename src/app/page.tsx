"use client";
import Link from "next/link";
import { useState } from "react";

import { Review } from "@/mocks/types";

export default function Home() {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  const handleGetReviews = () => {
    // Client-side request are mocked by `mocks/browser.ts`.
    fetch("/reviews")
      .then((res) => res.json())
      .then(setReviews);
  };
  return (
    <main>
      <button
        className="text-3xl font-bold underline "
        onClick={handleGetReviews}
      >
        Load reviews
      </button>
      <Link href="/signin">Login</Link>
      <Link href="/logout">logout</Link>
      {reviews && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.text}</p>
              <p>{review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
