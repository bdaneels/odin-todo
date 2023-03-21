import './style.css'
import { Pageload } from './html'




const taskDB = (()=> {
    const taskArray = new Array()

    function addTask (object){

        taskArray.push(object)
    }
    const getTaskArray = () => taskArray
    function getIndex (object) {
        return taskArray.indexOf(object)
        
    }
    function removeTask(index){
        delete taskArray[index]
    }

    const getTask = (index) => taskArray[index]

    return{
        getTaskArray,
        addTask,
        getIndex,
        removeTask,
        getTask
    }

})()

const projectDB = (()=> {
    const projectArray = new Array()

    function addProject (object){

        projectArray.push(object)
    }
    const getProjectArray = () => projectArray
    function getIndex (object) {
        return projectArray.indexOf(object)
        
    }
    function removeProject(object){
        let index = getIndex(object)
        delete projectArray[index]
    }
    function getProjectByTitle(title) {
        const projectArray = getProjectArray()
        for (let i = 0; i < projectArray.length; i++) {
          if (projectArray[i].title === title) {
            return projectArray[i]
          }
        }
        return null // return null if project with given title not found
      }

    return{
        getProjectArray,
        addProject,
        getIndex,
        removeProject,
        getProjectByTitle
    }

})()

const activeProject = (()=> {
    let activeProject = '0'

    function setActiveProject(projectIndex){
        activeProject = projectIndex
    }

    const getActiveProject = () => activeProject

    

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
activeProject.setActiveProject(0)


Pageload.load()