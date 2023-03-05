import { eventHandler, dateHandler } from "./event"
import { Task, Project, taskDB, projectDB } from '.'

const Pageload = (()=> {
    
    function _constructHTML () {
        let header = document.createElement('div')
        header.classList.add('header')
        let navbarContentDiv = document.createElement('div')
        navbarContentDiv.classList.add('nav-cont')
    
        let navbar = document.createElement('div')
        navbar.classList.add('navbar')
        
        function createNavElement(title) {
            let newNavElement = document.createElement('button')
            newNavElement.classList.add('nav-element')
            newNavElement.setAttribute('id', title.toLowerCase().replace(/\s/g,""))
            newNavElement.textContent = title
            navbar.appendChild(newNavElement)
        }
    
        createNavElement('Inbox')
        createNavElement('New Task')
        createNavElement('New Project')
    
        let contentDiv = document.createElement('div')
        contentDiv.classList.add('content')
    
        navbarContentDiv.appendChild(navbar)
        navbarContentDiv.appendChild(contentDiv)
    
    
    
    
        document.body.appendChild(header)
        document.body.appendChild(navbarContentDiv)
    }

    function _constructForms() {
        /* new task */
       let formDiv = document.createElement('div')
       formDiv.setAttribute('id', 'formdiv')
       formDiv.classList.add('hide')
       let formContainer = document.createElement('div')
       formContainer.setAttribute('id', 'formcontainer')
       let formTag = document.createElement('form')
       let formTitle = document.createElement('h2')
       formTitle.textContent = 'New Task'
       formTitle.setAttribute('id', 'formtitle')
       let formInput = document.createElement('input')
       formInput.setAttribute('id', 'forminput')
       formInput.setAttribute('type', 'text')
       formInput.setAttribute('placeholder', 'Task Description')
       let formDate = document.createElement('input')
       formDate.setAttribute('id', 'formdate')
       formDate.setAttribute('type', 'date')
       let priority = document.createElement('input')
       priority.setAttribute('type', 'checkbox') 
       priority.setAttribute('id', 'highpriority')
       priority.setAttribute('name', 'priority')
       let labelPriority = document.createElement('label')
       labelPriority.setAttribute('for', 'priority')
       labelPriority.setAttribute('id', 'prioritylabel')
       labelPriority.textContent = "High Priority"
       let submitButton = document.createElement('button')
       submitButton.setAttribute('class', 'submitbutton')
       submitButton.setAttribute('id', 'submitbutton')
       submitButton.textContent = 'submit'
       let cancelButton = document.createElement('button')
       cancelButton.setAttribute('class', 'cancelbutton')
       cancelButton.setAttribute('id', 'cancelbutton')
       cancelButton.textContent = 'cancel'


       formContainer.appendChild(formTag)
       formContainer.appendChild(formTitle)
       formContainer.appendChild(formInput)
       formContainer.appendChild(formDate)
       formContainer.appendChild(labelPriority)
       formContainer.appendChild(priority)
       formContainer.appendChild(submitButton)
       formContainer.appendChild(cancelButton)
       formDiv.appendChild(formContainer)
       document.body.appendChild(formDiv)

       /* new project */
       let projectFormDiv = document.createElement('div')
       projectFormDiv.setAttribute('id', 'projectformdiv')
       projectFormDiv.classList.add('hide')
       let projectFormContainer = document.createElement('div')
       projectFormContainer.setAttribute('id', 'projectformcontainer')
       let projectFormTitle = document.createElement('h2')
       projectFormTitle.textContent = 'New Project'
       projectFormTitle.setAttribute('id', 'projectformtitle')
       let projectFormInput = document.createElement('input')
       projectFormInput.setAttribute('id', 'projectforminput')
       projectFormInput.setAttribute('type', 'text')
       projectFormInput.setAttribute('placeholder', 'Project Description')
       let projectSubmitButton = document.createElement('button')
       projectSubmitButton.setAttribute('class', 'submitbutton')
       projectSubmitButton.setAttribute('id', 'projectsubmitbutton')
       projectSubmitButton.textContent = 'Submit'
       let projectCancelButton = document.createElement('button')
       projectCancelButton.setAttribute('class', 'cancelbutton')
       projectCancelButton.setAttribute('id', 'projectcancelbutton')
       projectCancelButton.textContent = 'cancel'


       projectFormContainer.appendChild(projectFormTitle)
       projectFormContainer.appendChild(projectFormInput)
       projectFormContainer.appendChild(projectSubmitButton)
       projectFormContainer.appendChild(projectCancelButton)
       projectFormDiv.appendChild(projectFormContainer)
       document.body.appendChild(projectFormDiv)

    }

    function _targetById(id) {
        let element = document.querySelector(id)
        return element
    }

    function _setEventListeners() {
        _targetById('#inbox').addEventListener('click', ()=> console.log('you clicked me'), false)
        _targetById('#newtask').addEventListener('click', ()=> eventHandler.newTask(), false)
        _targetById('#newproject').addEventListener('click', ()=> eventHandler.newProject(), false)
        _targetById('#submitbutton').addEventListener('click', eventHandler.formSubmit, false)
        _targetById('#cancelbutton').addEventListener('click', ()=> eventHandler.cancelTask(), false)
        _targetById('#projectsubmitbutton').addEventListener('click', ()=> eventHandler.projectFormSubmit(), false)
        _targetById('#projectcancelbutton').addEventListener('click', ()=> eventHandler.cancelProject(), false)
    }


    function populateTasks(){
        let startDiv = document.querySelector('.content')
        startDiv.innerHTML = ""
        let array = taskDB.getTaskArray()
        for(const object in array) {
            let title = array[object].getTitle()
            let date = array[object].getDate()
            let priority = array[object].getPriority()
            let index = object
        

            let startDiv = document.querySelector('.content')
            let container = document.createElement('div')
            container.setAttribute('id', 'taskcontainer')
            container.setAttribute('data' , index)
            
            let titleDiv = document.createElement('div')
            titleDiv.setAttribute('id', 'titlediv')
            titleDiv.textContent = title

            let dateDiv = document.createElement('div')
            dateDiv.setAttribute('id', 'datediv')
            dateDiv.textContent = date

            let priorityBtn = document.createElement('button');
            priorityBtn.setAttribute('id', 'priorityBtn');
            priorityBtn.textContent = priority;
            
            priorityBtn.addEventListener('click', function() {
                let container = this.parentElement;
                let index = container.getAttribute('data');
                let task = taskDB.getTask(index);
                if (task.getPriority() === 'high') {
                    task.setPriority('low');
                    priorityBtn.textContent = 'low';
                } else {
                    task.setPriority('high');
                    priorityBtn.textContent = 'high';
                }
            });

            let deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', function() {
                let container = this.parentElement;
                let index = container.getAttribute('data');
                taskDB.removeTask(index);
                populateTasks();
            });

            let dateInput = document.createElement('input');
            dateInput.setAttribute('type', 'date')
            dateInput.setAttribute('placeholder', date)
            dateInput.addEventListener('change', function() {
                let container = this.parentElement;
                let index = container.getAttribute('data');
                let newDate = dateHandler.formatDate(this.value);

                taskDB.getTask(index).setDate(newDate);
                populateTasks()
            });

        



            container.appendChild(titleDiv)
            container.appendChild(dateDiv)
            container.appendChild(priorityBtn)
            container.appendChild(deleteButton)
            container.appendChild(dateInput);
          

            startDiv.appendChild(container)




        }
    }

    function populateProjects(){
        let projectDiv = document.createElement('div')
        projectDiv.innerHTML= ""
        let newtask = document.getElementById('newtask')
        let parentNode = newtask.parentNode
        let array = projectDB.getProjectArray()
        for (let object in array) {
            let title = array[object].getTitle()
            let index = projectDB.getIndex(array[object])
            let projectBtn = document.createElement('button')
            projectBtn.setAttribute('data', index)
            projectBtn.setAttribute('id', 'projectbtn')
            projectBtn.textContent = title
            projectDiv.appendChild(projectBtn)
        }
        
        
        
        
        
        
        parentNode.insertBefore(projectDiv,newtask)


    }


    function load (){
        _constructForms()
        _constructHTML()
        populateTasks()
        populateProjects()
        _setEventListeners()
       
    }

    return{ load,
        populateTasks,
        populateProjects

    }

})()



export {Pageload}