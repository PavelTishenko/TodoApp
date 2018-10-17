import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state ={
    todoDate:[
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }
    ]
  };
// delete item from list
  deleteItem = (id) => {
    this.setState(({todoDate}) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const before = todoDate.slice(0, idx);
      const after = todoDate.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        todoDate: newArray
      } ;
    });
  };

  // add new item to list
  addItem = (text) => {
    // generate id 
    const newItem = {label: text, important: false, id: this.maxId++}
    //add element in array 
    this.setState(({todoDate}) => {
      const newArr = [...todoDate, newItem];
      return{
        todoDate : newArr
      }
    })
  };

  render(){
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
        todos={this.state.todoDate} 
        onDeleted={this.deleteItem}/>
        <ItemAddForm onItemAdded = {this.addItem} />
      </div>
    );
  }
 
};