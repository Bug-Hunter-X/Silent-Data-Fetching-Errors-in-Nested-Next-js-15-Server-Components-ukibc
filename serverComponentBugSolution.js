// serverComponentBugSolution.js
import { Suspense } from 'react';

async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw to be caught by parent component
  }
}

function NestedComponent() {
  const data = use(async () => await fetchData('/api/data2'));
  if (data.error) {
    return <p>Error loading nested data: {data.error.message}</p>;
  }
  return <p>Nested data: {JSON.stringify(data)}</p>;
}

export default function Page() {
  const data = use(async () => await fetchData('/api/data1'));
  return (
    <div>
      <h1>Main Data</h1>
      {data.error ? <p>Error loading data: {data.error.message}</p> : <p>Main data: {JSON.stringify(data)}</p>}
      <Suspense fallback={<p>Loading...</p>}>
        <NestedComponent/>
      </Suspense>
    </div>
  );
}