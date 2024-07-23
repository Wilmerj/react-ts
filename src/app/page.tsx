'use client';

import { useState } from "react";
import type { MouseEventHandler } from 'react'
import { random } from 'lodash'
import { LazyImage } from "@/components/LazyImage";

type ImageItems = Array<IFoxItem>;

const randomImage = () => random(1, 123);

function generateUniqueId(prefix = 'id'): string {
  const timestamp = Date.now();
  const uniquePart = timestamp.toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${prefix}_${uniquePart}_${randomPart}`;
}

export default function Home() {
  const [images, setImages] = useState<ImageItems>([]);

  const handleAddFoxs: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const newImageItem:IFoxItem  = { id: generateUniqueId(), url:`https://randomfox.ca/images/${randomImage()}.jpg` };
    setImages(prevState => [...prevState, newImageItem]);
    window.plausible('add_fox');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Hello platzi</h1>
      <button onClick={handleAddFoxs}>Add new foxs</button>
      {images.map(({ url, id }, index) => (
        <div key={id} className="mb-4 mt-4">
          <LazyImage src={url} imageAlt={id} onClick={() => console.log('hola mundo')} onLazyLoad={(img) => {
            console.log(`Image loaded ${1}`, img);
          }} />
        </div>
      ))}
    </main>
  );
}
