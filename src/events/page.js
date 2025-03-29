"use client";


import { useRouter } from 'next/navigation';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the event ID from the URL

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center">Event Details for Event {id}</h1>
      <p className="text-center mt-4">Here you can display the details of the event with ID: {id}.</p>
      {/* You can now fetch event details from a database or API using this ID */}
    </div>
  );
}
