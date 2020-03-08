import React from 'react';
import { useHistory } from 'react-router-dom';

import { SharedElements, useMotion } from 'react-motion-layout';

export default function FeedItem({ avatar, image, id }) {
  const history = useHistory();
  const { withTransition } = useMotion(`story-${id}`);
  return (
      <div
        onClick={withTransition(() => { history.push(`/story/${id}`)})}
        className="cursor-pointer rounded shadow-sm bg-white  max-w-sm w-full lg:max-w-full lg:flex mb-4"
      >
        <SharedElements.Image
          className="h-48 rounded-l lg:h-auto lg:w-48 flex-none bg-cover bg-center text-center overflow-hidden"
          animationKey="big-image"
          src={image}
        />
        <div className="p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Members only
            </p>
            <SharedElements.Text className="text-gray-900 font-bold text-xl mb-2" animationKey="text-main">
              Can coffee make you a better developer?
            </SharedElements.Text>
            <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full mr-4 bg-cover" style={{ backgroundImage: `url(${avatar})`}} />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">Jonathan Reinink</p>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>
        </div>
      </div>
  );
}