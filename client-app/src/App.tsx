import React, { Fragment, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
      debugger;
    })
  }, [])

  return (
    <Fragment>
      <Header as='h2' icon='users' content="Reactivities"/>
      <List>
        {activities.map((item:any) => 
          <List.Item key={item.id}>{item.title}</List.Item>
        )}
      </List>
    </Fragment>
  );
}

export default App;
