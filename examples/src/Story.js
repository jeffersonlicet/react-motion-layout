import React from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Stories';

import { MotionScene, SharedElement, MotionScreen } from 'react-motion-layout';

export default function Story() {
  const { storyId } = useParams();
  const { avatar, image } = items[storyId];

  return (
    <MotionScreen>
      <MotionScene name={`story-${storyId}`} scrollUpOnEnter>
        <div className="w-full p-10">
          <div className="flex items-center">
              <div className="w-40 h-40 rounded-full mr-4 bg-cover" style={{ backgroundImage: `url(${avatar})`}} />
            <div className="flex flex-col">
              <div className="text-orange-600 leading-none font-bold text-sm">Jefferson</div>
              <SharedElement.Text className="text-gray-700 font-bold text-xm" animationKey="text-main">
                Can coffee make you a better developer?
              </SharedElement.Text>
            </div>
          </div>
          <div className="flex flex-col pt-10">
            <SharedElement.Image
              className="rounded w-2/6 bg-cover bg-center overflow-hidden"
              animationKey="big-image"
              src={image}
            />
            <p className="text-gray-700 text-base w-3/6 mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
          </div>
        </div>
      </MotionScene>
    </MotionScreen>
  );
}