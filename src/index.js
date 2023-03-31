import './style.css'
import { Pageload } from './html'





const taskDB = (() => {
    let taskArray = [];
  
    function addTask(object) {
      taskArray.push(object);
      saveTasks();
    }
  
    function getTaskArray() {
      return taskArray;
    }
  
    function setTaskArray(array) {
      taskArray = array;
    }
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(taskArray));
    }
  
    function getIndex(object) {
      return taskArray.indexOf(object);
    }
  
    function removeTask(index) {
      delete taskArray[index];
      saveTasks();
    }
  
    function getTask(index) {
      return taskArray[index];
    }
  
    function setTask(object, index) {
      taskArray[index] = object;
      saveTasks();
    }
  
    return {
      getTaskArray,
      setTaskArray,
      addTask,
      getIndex,
      removeTask,
      getTask,
      setTask,
    };
  })();
  
  const projectDB = (() => {
    let projectArray = [];
  
    function addProject(object) {
      projectArray.push(object);
      saveProjects();
    }
  
    function getProjectArray() {
      return projectArray;
    }
  
    function setProjectArray(array) {
      projectArray = array;
    }
  
    function saveProjects() {
      localStorage.setItem("projects", JSON.stringify(projectArray));
    }
  
    function getIndex(object) {
      return projectArray.indexOf(object);
    }
  
    function removeProject(object) {
      let index = getIndex(object);
      if (index !== -1) {
        delete projectArray[index];
        saveProjects();
      }
    }
  
    function getProjectByTitle(title) {
      for (let i = 0; i < projectArray.length; i++) {
        if (projectArray[i].getTitle() === title) {
          return projectArray[i];
        }
      }
      return null;
    }
  
    return {
      getProjectArray,
      addProject,
      getIndex,
      removeProject,
      getProjectByTitle,
      setProjectArray,
    };
  })();

const activeProject = (()=> {
    let activeProject = '0'

    function setActiveProject(projectIndex){
        activeProject = projectIndex
        _styleActiveProject(projectIndex)
    }

    const getActiveProject = () => activeProject

    function _styleActiveProject(index){
      let container = document.getElementById('activeproject')
      if(container != null){
      let array = projectDB.getProjectArray()
      let title = array[parseInt(index)].getTitle()
      console.log(`the container in the _styleactiveproject is ${container}`)
      container.textContent = `Active Project: ${title}`
    }
  
    }

    

    return{
       setActiveProject,
       getActiveProject
    }

})()


class Task {
    constructor(title, priority, date) {
        this.title = title
        this.priority = priority
        this.date = date
    }

    getTitle() {
        return this.title
    }

    setTitle(string){
        this.title = string
    }
    getPriority() {
        return this.priority
    }
    setPriority(string){
        this.priority = string
    }

    getDate() {
        return this.date
    }
    setDate(date){
        this.date = date
    }

}


class Project {
    constructor (title) {
        this.title = title
    }

    getTitle() {
        return this.title
    }

    setTitle (title) {
        this.title = title
    }
}

export{taskDB,projectDB, activeProject, Project, Task}


/* default project */

let project1 = new Project('default')

projectDB.addProject(project1)

Pageload.load()
activeProject.setActiveProject(0)
