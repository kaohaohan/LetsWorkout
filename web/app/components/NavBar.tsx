"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl">
        Workout App
      </Link>
      <div className="flex gap-4">
        <Link href="/profile">Profile</Link>
        <Link href="/history">History</Link>
        <Link
          href="/start-workout"
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          Start Workout
        </Link>
        <Link href="/exercises">Exercises</Link>
      </div>
    </nav>
  );
}
