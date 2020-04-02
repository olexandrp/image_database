import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import LayoutDefault from './view/layouts/default/LayoutDefault';
import './App.scss';

function App() {
  return (
      <div className="App">
          <Router>
              <Route path="/:sectionName?" component={LayoutDefault} />
          </Router>
      </div>
  );
}

export default App;
