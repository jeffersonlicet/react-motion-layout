import React from 'react';
import Item from './FeedItem';
import { items } from './Stories';

import { MotionScene, MotionScreen } from 'react-motion-layout';

export default function Feed() {
  return (
    <MotionScreen name="Feed-Screen">
      <div className="p-10 pt-4">
        {items.map((item, i) => (
          <MotionScene key={i} name={`story-${i}`}>
            <Item key={i} id={i} {...item} />
          </MotionScene>
          ))}
      </div>
    </MotionScreen>
  );
}