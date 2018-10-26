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
      this.createTodoItem('Drink Cofee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label){
    return {label, important: false, done: false,  id: this.maxId++}
  }
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
    const newItem = this.createTodoItem(text)
    //add element in array 
    this.setState(({todoDate}) => {
      const newArr = [...todoDate, newItem];
      return{
        todoDate : newArr
      }
    })
  };

  toggleProperty(arr, id, propName){
    const idx = this.state.todoDate.findIndex((el) => el.id === id);
    // update obj
    const oldItem = this.state.todoDate[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return  [...arr.slice(0, idx), newItem, ... arr.slice(idx + 1)];
  
  }

  onToggleImportant = (id) => {
    this.setState(({todoDate}) => {
      return {todoDate: this.toggleProperty(todoDate, id, 'important')}
      })

  };

  onToggleDone = (id) => {
    this.setState(({todoDate}) => {
     
    return {todoDate: this.toggleProperty(todoDate, id, 'done')}
    })
  };

  searchChage(search){
    this.setState({
      search
    });
  }

  render(){
    const {todoDate} = this.state;
    const doneCount = this.state.todoDate.filter((el) => el.done).length;
    const todoCount = this.state.todoDate.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel searchChange = {this.searchChage}/>
          <ItemStatusFilter />
        </div>
  
        <TodoList 
         onToggleDone = {this.onToggleDone}
         onToggleImportant = {this.onToggleImportant}
         todos={this.state.todoDate} 
         onDeleted={this.deleteItem}
         />
        <ItemAddForm onItemAdded = {this.addItem} />
      </div>
    );
  }
 
};