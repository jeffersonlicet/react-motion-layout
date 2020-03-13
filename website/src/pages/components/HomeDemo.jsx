import React, { useState, useEffect } from 'react';
import {
  MotionScreen, MotionScene, SharedElements, useMotion,
} from 'react-motion-layout';

// TODO: Friends list with friend view and url at the top
export default function HomeDemo() {
  const [animated, setAnimated] = useState(false);
  const [withTransition] = useMotion('story-0');

  const setAnimated2 = withTransition(() => setAnimated(!animated));

  useEffect(() => {
     const interval = setInterval(withTransition(() => setAnimated(!animated)), 2000);
     return () => { clearInterval(interval); };
  }, [animated, withTransition]);

  return (
    <>
    <div className="xl:mr-16 mr-0 rounded shadow-sm bg-white rounded-lg p-6 shadow-xl">
      { !animated
          && (
          <MotionScreen name="Feed-Screen">
            <MotionScene name="story-0">
              <div className="flex flex-col cursor-default">
                <div className="flex">
                  <SharedElements.Image
                    animationKey="avatar"
                    className="w-16 h-16 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                  />
                  <div className="flex flex-col ml-4 mt-2">
                    <div className="font-bold text-lg leading-tight text-pink-400">
                      Patricia
                    </div>
                    <div className="font-normal text-sm text-gray-500">
                      a minute ago
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <SharedElements.Text animationKey="body" className="font-normal text-gray-500 max-w-sm">
                    Hey guys, as I promised here is my collection of in motion pictures. I hope you like it.
                  </SharedElements.Text>
                  <div className="flex my-8">

                    <img
                      className="h-32 rounded-lg object-cover"
                      src="https://images.unsplash.com/photo-1517509226241-64ec72c124a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                    />
                    <div className="ml-2">
                      <SharedElements.Image
                        animationKey="big-image"
                        className="h-32 rounded-lg object-cover"
                        src="https://images.unsplash.com/photo-1472808900176-aa74f96048c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                      />
                    </div>
                   <img
                      className="h-32 rounded-lg object-cover ml-2"
                      src="https://images.unsplash.com/photo-1523815378073-a43ae3fbf36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                    />

                  </div>

                  <div className="mt-4 flex items-center">
                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 border-solid z-20"
                      src="https://images.unsplash.com/photo-1523598455533-144bae6cf56e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                    />

                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 -ml-4 border-solid z-10"
                      src="https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                    />

                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 -ml-4 border-solid"
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
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
            <MotionScene name="story-0">
              <div className="flex">
                <div className="flex flex-col items-center">
                  <SharedElements.Image
                    animationKey="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                  />
                  <div className="flex flex-col mt-2 items-center">
                    <div className="font-bold text-lg leading-tight text-pink-400">
                      Patricia
                    </div>
                    <div className="font-normal text-sm text-gray-500">
                      a minute ago
                    </div>
                  </div>
                </div>
                <div className="ml-8">
                  <div className="mb-4">
                    <SharedElements.Text animationKey="body" className="font-normal text-gray-500 max-w-sm">
                      Hey guys, as I promised here is my collection of in motion pictures. I hope you like it.
                    </SharedElements.Text>
                  </div>
                  <SharedElements.Image
                    animationKey="big-image"
                    className="h-64 rounded-lg object-cover"
                    src="https://images.unsplash.com/photo-1472808900176-aa74f96048c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                  />

                  <div className="mt-4 flex items-center">
                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 border-solid z-20"
                      src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                    />

                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 -ml-4 border-solid z-10"
                      src="https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                    />

                    <img
                      className="w-10 h-10 rounded-full object-cover border-white border-2 -ml-4 border-solid"
                      src="https://images.unsplash.com/photo-1510678960173-b52e15cbcfb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
                    />

                    <div className="text-bold font-bold pl-2 text-pink-300">+40</div>
                  </div>
                </div>
              </div>
            </MotionScene>
          </MotionScreen>
        )}
    </div>
    <div className="mt-4 hidden">
      <div className="mt-24">
        <a href="#" onClick={setAnimated2} className="hover:text-white button_pink rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-pink-500 hover:bg-pink-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md">Get Started</a>
      </div>
    </div>
    </>
  );
}
