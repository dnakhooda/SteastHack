export async function generateMetadata({ params }) {
  return {
    title: decodeURIComponent(params.eventTitle),
  };
}

export default function EventPage({ params }) {
  return (
    <div>
      <h1>{decodeURIComponent(params.eventTitle)}</h1>
      <p>Event details go here...</p>
    </div>
  );
}