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
        cancelProject
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
        
        console.log(title, date, priority)

        let task = new Task(title, priority, date)
        taskDB.addTask(task)
        let index = taskDB.getIndex(task)
        console.log(index)

        /* delete under*/
        Pageload.populateTasks()

    }

    function createProject(){
        let title = document.getElementById('projectforminput').value
        let project = new Project(title)
        projectDB.addProject(project)
        console.log('project create func called')
        Pageload.populateProjects()
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



export {domHandler, eventHandler, dateHandler}