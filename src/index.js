import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './App.css'
import userlist from './User';

function Filter(){
  const[users, setUsers] =  useState([]);
  const[search, setSearch] = useState(null);
  const[category, setCategory] = useState(null);

  useEffect(()=>{
    getUsers(userlist);
  },[])

  const getUsers = userlist =>{
    setUsers(userlist);
  };

  const byCategory = (user, category)=>{
    if(category){
      return user.category === category;
    } else return user;
  }

  const bySearch = (user, search)=>{
   if(search){
    return user.name.toLowercase().includes(search.toLowercase());
  }else return user;
};

const filteredList = (users, category, search) => {
  return users
    .filter(user => byCategory(user, category))
    .filter(user => bySearch(user, search));
};

return(
  <div className="App">
    <input 
      type="search"
      onchange = { e => setSearch(e.target.value)}
      />

      <select onChange={ e =>setCategory(e.target.value)}>
        <option value="/">Choose Category</option>
        <option value="movies">Movies</option>
        <option value="games">games</option>
        <option value="shows">shows</option>
        <option value="others">others</option>
      </select>

      {filteredList(users, category, search).map(user => (
        <div key={user.id}>
          {user.name} : {user.category}
        </div>
      ))}
  </div>
)
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Filter />, rootElement);