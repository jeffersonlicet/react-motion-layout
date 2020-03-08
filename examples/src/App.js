import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { MotionProvider }  from 'react-motion-layout';
import Feed from './Feed';
import Story from './Story';
import './App.css';

import { RouterLink as Link } from 'react-motion-layout';

export default function App() {
  return (
    <Router>
      <MotionProvider debug>
        <div className="container w-full container bg-container flex">
          <div className="h-full fixed w-2/12 bg-white shadow-right">
            <ul className="p-10">
              <li className="text-gray-500 uppercase text-sm font-bold flex items-center menu-item py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 25 25"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg>
                <Link to="/" className="ml-2">Feed</Link>
              </li>

              <li className="text-gray-500 uppercase text-sm font-bold flex items-center menu-item py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 25 25"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg>
                <Link to="/" className="ml-2">Feed</Link>
              </li>
            </ul>
          </div>
          <div className="w-10/12 ml-64">
            <Switch>
              <Route path="/story/:storyId">
                <Story />
              </Route>
              <Route path="/">
                <Feed />
              </Route>
            </Switch>
          </div>
        </div>
      </MotionProvider>
    </Router>
  );
}
