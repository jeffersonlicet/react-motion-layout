import React from 'react';
import Item from './FeedItem';
import { items } from './Stories';

export default function Feed() {
  return (
      <div className="p-10 pt-4">
        {items.map((item, i) => (<Item key={i} id={i} {...item} />))}
      </div>
  );
}