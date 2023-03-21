import {format, parse} from 'date-fns'
import { Task, Project, taskDB, projectDB } from '.'
import { Pageload } from './html'


const eventHandler = (()=> {
    
    function newTask () {
        domHandler.showForm('task')
    }

    function newProject(){
        domHandler.showForm('project')
    }

    function cancelTask(){
        domHandler.closeForm('task')
    }

    function cancelProject(){
        domHandler.closeForm('project')
    }

    function formSubmit (e) {
        e.preventDefault()
        formInputHandler.createTask()
        domHandler.closeForm('task')
                
    }

    

    function projectFormSubmit () {
        formInputHandler.createProject()
        domHandler.closeForm('project')
        console.log('eventhandler poject called')
                
    }


    return{
        newTask,
        cancelTask,
        formSubmit,
        projectFormSubmit,
        newProject,
        cancelProject,
    
    }

})()


const domHandler = (()=> {
    
    function showForm (option) {
        if (option === "task") {
            let element=document.querySelector('#formdiv')
            element.classList.add('flexbox')
            element.classList.remove('hide')
            console.log('newtask nav element clicked')
        } else {
            let element=document.querySelector('#projectformdiv')
            element.classList.add('flexbox')
            element.classList.remove('hide')
            console.log('new project nav element clicked')
        }
    }

    function closeForm(option) {
        if (option === "task") {
            let element=document.querySelector('#formdiv')
            element.classList.add('hide')
            element.classList.remove('flexbox')
            _resetForm(option)
        } else {
            let element=document.querySelector('#projectformdiv')
            element.classList.add('hide')
            element.classList.remove('flexbox')
            _resetForm(option)
        }
    }

    function _resetForm(option) {
        if (option === "task") {
            document.querySelector('#forminput').value = ""
            document.querySelector('#highpriority').checked = false
            document.querySelector('#formdate').value = ""    
            console.log('resetform func called')
        } else {
            document.querySelector('#projectforminput').value = ""
            console.log('projectresetform func called')
        }
    }

    return{
    showForm,
    closeForm
    }

})()

const formInputHandler = (()=> {
    
    function createTask(){
        let title = document.getElementById('forminput').value
        let date = dateHandler.formatDate(document.getElementById('formdate').value)
        let priority = _checkDomPriority(document.getElementById('highpriority'))
        let projectTitle = document.getElementById('projectselect').value
        let project = projectDB.getProjectByTitle(projectTitle)
        let projectIndex = projectDB.getIndex(project)
        console.log(title, date, priority, projectIndex)

        let task = new Task(title, priority, date)
        taskDB.addTask(task)
        let taskIndex = taskDB.getIndex(task)

        relationshipHandler.addRelationship(projectIndex,taskIndex)

        /* change argument below */
         Pageload.populateTasks() 

    }

    function createProject(){
        let title = document.getElementById('projectforminput').value
        let project = new Project(title)
        projectDB.addProject(project)
        console.log('project create func called')
        Pageload.populateProjects()
        Pageload.populateProjectSelect()
    }


    function _checkDomPriority(element){
        if (element.checked === true){
            return 'high'
        } else {
            return 'low'
        }
    }
 
    return{
        createTask,
        createProject
    }

})()


const dateHandler = (() => {

    function formatDate(date){
        return format(new Date(date), 'dd/MM/yyyy')
    }

    function formatLocaleDate(date){
        
            return parse(date, 'dd/MM/yyyy', new Date())
    }

return {
    formatDate,
    formatLocaleDate
}

})()


const relationshipHandler = (() => {
    const relationshipObject = {}
    
    function addRelationship(projectIndex, taskIndex) {
      if (relationshipObject.hasOwnProperty(projectIndex)) {
        relationshipObject[projectIndex].push(taskIndex)
      } else {
        relationshipObject[projectIndex] = [taskIndex]
      }
      console.log(`relationship added with ${projectIndex} as projectindex and ${taskIndex} as taskindex`)
      console.log(relationshipObject)
    }
    
    function removeRelationship(projectIndex, taskIndex) {
      if (relationshipObject.hasOwnProperty(projectIndex)) {
        const taskIndices = relationshipObject[projectIndex]
        const index = taskIndices.indexOf(taskIndex)
        if (index !== -1) {
          taskIndices.splice(index, 1)
          if (taskIndices.length === 0) {
            delete relationshipObject[projectIndex]
          }
        }
      }
    }
    
    function getTasksByProject(projectIndex) {
      const taskIndices = relationshipObject[projectIndex]
      const tasks = []
      if (taskIndices) {
        for (let i = 0; i < taskIndices.length; i++) {
          tasks.push(taskIndices[i])
        }
      }
      console.log(`the tasksindices are called by gettasksbyproject taskindices: ${tasks}`)
      return tasks
    }
    
    function getProjectByTask(taskIndex) {
        for (let projectIndex in relationshipObject) {
          if (relationshipObject.hasOwnProperty(projectIndex)) {
            const taskIndices = relationshipObject[projectIndex]
            if (taskIndices.includes(taskIndex)) {
              console.log(`the project index for task index ${taskIndex} is ${projectIndex}`)
              return projectIndex
            }
          }
        }
        console.log(`no project found for task index ${taskIndex}`)
        return null
      }


    return {
      addRelationship,
      removeRelationship,
      getTasksByProject,
      getProjectByTask
    }
  })()



export {domHandler, eventHandler, dateHandler, relationshipHandler}