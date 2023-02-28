import {format, parse} from 'date-fns'
import { Task, Project, taskDB, projectDB } from '.'
import { Pageload } from './html'


const eventHandler = (()=> {
    
    function newTask () {
        domHandler.showForm('task')
    }

    function cancelTask(){
        domHandler.closeForm('task')
    }

    function formSubmit (e) {
        e.preventDefault()
        formInputHandler.createTask()
        domHandler.closeForm('task')
                
    }


    return{
        newTask,
        cancelTask,
        formSubmit
    }

})()


const domHandler = (()=> {
    
    function showForm (option) {
        if (option === "task") {
            let element=document.querySelector('#formdiv')
            element.classList.add('flexbox')
            element.classList.remove('hide')
            console.log('newtask nav element clicked')
        }
    }

    function closeForm(option) {
        if (option === "task") {
            let element=document.querySelector('#formdiv')
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

        let task = new Task(title, date, priority)
        taskDB.addTask(task)
        let index = taskDB.getIndex(task)
        console.log(index)

        /* delete under*/
        Pageload.populateTasks()


    }

    function _checkDomPriority(element){
        if (element.checked === true){
            return 'high'
        } else {
            return 'low'
        }
    }
 
    return{
        createTask
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