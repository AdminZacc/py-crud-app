"use client"
import React, { useEffect, useState } from 'react';

type Item = {
  id: number;
  name: string;
};

const Home = () => {
  const [data, setData] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/items/');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        if (!Array.isArray(result)) {
          throw new Error('Data is not an array');
        }
        setData(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data from FastAPI</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;