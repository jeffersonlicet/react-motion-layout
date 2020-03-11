import React, { useState, useEffect } from 'react';
import {
  MotionScreen, MotionScene, SharedElements, useMotion,
} from 'react-motion-layout';

// TODO: Friends list with friend view and url at the top
export default function HomeDemo() {
  const [animated, setAnimated] = useState(true);
  const [withTransition] = useMotion('story-0');

  useEffect(() => {
    const interval = setInterval(withTransition(() => setAnimated(!animated)), 2000);
    return () => { clearInterval(interval); };
  }, [animated, withTransition]);

  return (
    <div className="mr-10 rounded shadow-sm bg-white">
      { !animated
          && (
          <MotionScreen name="Feed-Screen">
            <MotionScene name="story-0">
              <div className="flex p-4 border-b">
                <SharedElements.Image
                  className="h-24 w-24 rounded-full"
                  animationKey="image"
                  src="https://images.unsplash.com/photo-1567186937675-a5131c8a89ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=60"
                />
                <div className="flex justify-between w-full">
                  <div className="flex flex-col items-start">
                    <div className="ml-2 mt-2 text-gray-600 font-medium pr-4">Travis</div>
                    <div className="ml-2 text-gray-500 font-normal pr-4">Surf, sports and books.</div>
                  </div>
                  <img
                    className="h-16 w-24 rounded-sm"
                    src="https://images.unsplash.com/reserve/91JuTaUSKaMh2yjB1C4A_IMG_9284.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  />
                </div>
              </div>
            </MotionScene>
            <MotionScene name="story-1">
              <div className="flex p-4">
                <SharedElements.Image
                  className="h-16 w-16 rounded-full"
                  animationKey="image"
                  src="https://images.unsplash.com/photo-1567186937675-a5131c8a89ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=60"
                />
                <div className="flex justify-between w-full">
                  <div className="flex flex-col items-start">
                    <div className="ml-2 mt-2 text-gray-600 font-medium pr-4">Travis</div>
                    <div className="ml-2 text-gray-500 font-normal pr-4">Surf, sports and books.</div>
                  </div>
                  <img
                    className="h-16 w-24 rounded-sm"
                    src="https://images.unsplash.com/reserve/91JuTaUSKaMh2yjB1C4A_IMG_9284.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  />
                </div>
              </div>
            </MotionScene>
          </MotionScreen>
          )}
      { animated
        && (
        <MotionScreen name="Individual-Screen">
          <MotionScene name="story-0">
            <div className="pb-4">
              <img
                className="h-32 rounded-t-sm w-full object-cover"
                src="https://images.unsplash.com/reserve/91JuTaUSKaMh2yjB1C4A_IMG_9284.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
              />
              <div className="flex justify-center">
                <SharedElements.Image
                  style={{ marginTop: '-15px' }}
                  className="rounded-full border-4 object-center object-cover border-white h-16 w-16"
                  animationKey="image"
                  src="https://images.unsplash.com/photo-1567186937675-a5131c8a89ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=60"
                />
              </div>
            </div>
          </MotionScene>
        </MotionScreen>
        )}
    </div>
  );
}
