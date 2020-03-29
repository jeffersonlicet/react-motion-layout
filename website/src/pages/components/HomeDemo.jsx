import React, { useState, useCallback } from 'react';
import {
  MotionScreen, MotionScene, SharedElement, useMotion,
} from 'react-motion-layout';
import { FiArrowLeft, FiPlay } from 'react-icons/fi';

export default function HomeDemo() {
  const [animated, setAnimated] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const withTransition = useMotion('story-0');

  const animate = useCallback(() => {
    if (blocked) {
      return;
    }

    setBlocked(true);
    withTransition(() => {
      setAnimated(!animated);
      setBlocked(false);
    })();
  },
  [withTransition, animated, blocked]);

  return (
    <>
      <div className="xl:mr-14 w-4/4 mr-0 rounded bg-white lg:rounded-lg p-10 pt-8 lg:shadow-xl demo-box">
        { !animated
          && (
          <MotionScreen name="Feed-Screen">
            <MotionScene name="story-0" easing="cubic-bezier(0.22, 1, 0.36, 1)">
              <div className="flex flex-col cursor-default">
                <div className="flex">
                  <SharedElement.Image
                    animationKey="avatar"
                    className="w-16 h-16 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80"
                  />
                  <div className="flex flex-col ml-4 mt-2">
                    <SharedElement.Text animationKey="name" className="font-bold text-lg leading-tight text-pink-400">
                      Patricia
                    </SharedElement.Text>
                    <div className="font-normal text-sm text-gray-500">
                      a minute ago
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <SharedElement.Text animationKey="body" className="font-normal text-gray-500 max-w-xs">
                    Hey guys, as I promised here is my collection of vintage pictures. I hope you like it.
                  </SharedElement.Text>
                  <div className="flex my-8">

                    <img
                      className="h-40 rounded-lg object-cover"
                      src="https://images.unsplash.com/photo-1502120492606-fba13cc63721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=50"
                    />
                    <div className="ml-2">
                      <SharedElement.Image
                        animationKey="big-image"
                        className="h-40 rounded-lg object-cover"
                        src="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                      />
                    </div>
                    <img
                      className="h-40 rounded-lg object-cover ml-2"
                      src="https://images.unsplash.com/photo-1516962126636-27ad087061cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=50"
                    />

                  </div>

                  <div className="mt-4 flex items-center">
                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 border-solid z-20"
                      src="https://images.unsplash.com/photo-1523598455533-144bae6cf56e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=40"
                    />

                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 -ml-4 border-solid z-10"
                      src="https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=40"
                    />

                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 -ml-4 border-solid"
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=40"
                    />

                    <div className="text-bold font-bold pl-2 text-pink-300">+1801</div>
                  </div>
                </div>
              </div>
            </MotionScene>
          </MotionScreen>
          )}
        { animated
        && (
          <MotionScreen name="Story-Screen">
            <MotionScene name="story-0" easing="cubic-bezier(0.22, 1, 0.36, 1)">
              <div className="flex">
                <div className="flex flex-col items-center flex-shrink-0">
                  <SharedElement.Image
                    animationKey="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80"
                  />
                </div>
                <div className="ml-4">
                  <div className="mb-4">
                    <div className="flex flex-col">
                      <SharedElement.Text animationKey="name" className="font-bold text-base leading-tight text-pink-400">
                        Patricia
                      </SharedElement.Text>
                    </div>
                    <div className="mt-2">
                      <SharedElement.Text animationKey="body" className="font-normal text-gray-500 max-w-sm">
                        Hey guys, as I promised here is my collection of vintage pictures. I hope you like it.
                      </SharedElement.Text>
                    </div>
                  </div>
                  <SharedElement.Image
                    animationKey="big-image"
                    className="h-64 rounded-lg object-cover"
                    src="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                  />

                  <div className="mt-4 flex items-center">
                    <img
                      className="opacity-75 w-8 h-8 rounded-full object-cover border-white border-2 border-solid z-20"
                      src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=40"
                    />

                    <img
                      className="opacity-75  w-8 h-8 rounded-full object-cover border-white border-2 -ml-4 border-solid z-10"
                      src="https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=40"
                    />

                    <img
                      className="opacity-75  w-8 h-8 rounded-full object-cover border-white border-2 -ml-4 border-solid"
                      src="https://images.unsplash.com/photo-1510678960173-b52e15cbcfb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=40"
                    />

                  </div>
                </div>
              </div>
            </MotionScene>
          </MotionScreen>
        )}
      </div>
      <div className="mt-4 inline-block mb-8 ml-4 lg:ml-0">
        <div onClick={animate} className="p-4 bg-white rounded-md flex items-center shadow-md text-gray-600 cursor-pointer">
          {animated ? <FiArrowLeft /> : <FiPlay />}
          <div className="ml-4 font-medium ">
            {animated ? 'Go back' : 'Run animation'}
          </div>
        </div>
      </div>
    </>
  );
}
