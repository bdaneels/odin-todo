import { eventHandler, dateHandler, relationshipHandler, } from "./event"
import { Task, Project, taskDB, projectDB, activeProject } from '.'

const Pageload = (()=> {
    
    function _constructHTML () {
        let header = document.createElement('div')
        header.classList.add('header')

        let activeProjectDiv = document.createElement('div')
        activeProjectDiv.setAttribute('id','activeproject')

        header.appendChild(activeProjectDiv)

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
    
        createNavElement('All Tasks')
        createNavElement('New Task')
        createNavElement('New Project')
        
        


        let contentDiv = document.createElement('div')
        contentDiv.classList.add('content')
    
        navbarContentDiv.appendChild(navbar)
        navbarContentDiv.appendChild(contentDiv)
    
    
       
    
        document.body.appendChild(header)
        document.body.appendChild(navbarContentDiv)

        let projectDiv = document.createElement('div')
        projectDiv.setAttribute('id','projectdiv')
        let newtask = document.getElementById('newtask')
        let parentNode = newtask.parentNode
        parentNode.insertBefore(projectDiv,newtask)
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
       let projectSelectLabel = document.createElement('label')
       projectSelectLabel.setAttribute('for', 'projectselect')
       projectSelectLabel.textContent= 'Select a project:'
       let projectSelect = document.createElement('select')
       projectSelect.setAttribute('id','projectselect') 
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
       formContainer.appendChild(projectSelectLabel)
       formContainer.appendChild(projectSelect)
       formContainer.appendChild(labelPriority)
       formContainer.appendChild(priority)
       formContainer.appendChild(submitButton)
       formContainer.appendChild(cancelButton)
       formDiv.appendChild(formContainer)
       document.body.appendChild(formDiv)


        /* edit task */
        let editFormDiv = document.createElement('div')
        editFormDiv.setAttribute('id', 'editformdiv')
        editFormDiv.classList.add('hide')
        let editFormContainer = document.createElement('div')
        editFormContainer.setAttribute('id', 'editformcontainer')
        let editFormTitle = document.createElement('h2')
        editFormTitle.textContent = 'Edit Task'
        editFormTitle.setAttribute('id', 'editformtitle')
        let editFormInput = document.createElement('input')
        editFormInput.setAttribute('id', 'editforminput')
        editFormInput.setAttribute('type', 'text')
        editFormInput.setAttribute('placeholder', 'Task Description')
        let editFormDate = document.createElement('input')
        editFormDate.setAttribute('id', 'editformdate')
        editFormDate.setAttribute('type', 'date')
        let editProjectSelectLabel = document.createElement('label')
        editProjectSelectLabel.setAttribute('for', 'projectselect')
        editProjectSelectLabel.textContent= 'Select a project:'
        let editProjectSelect = document.createElement('select')
        editProjectSelect.setAttribute('id','projectselect') 
        let editPriority = document.createElement('input')
        editPriority.setAttribute('type', 'checkbox') 
        editPriority.setAttribute('id', 'edithighpriority')
        editPriority.setAttribute('name', 'priority')
        let labelEditPriority = document.createElement('label')
        labelEditPriority.setAttribute('for', 'priority')
        labelEditPriority.setAttribute('id', 'editprioritylabel')
        labelEditPriority.textContent = "High Priority"
        let editSubmitButton = document.createElement('button')
        editSubmitButton.setAttribute('class', 'submitbutton')
        editSubmitButton.setAttribute('id', 'editsubmitbutton')
        editSubmitButton.textContent = 'submit'
        let editCancelButton = document.createElement('button')
        editCancelButton.setAttribute('class', 'cancelbutton')
        editCancelButton.setAttribute('id', 'editcancelbutton')
        editCancelButton.textContent = 'cancel'
 
        editFormContainer.appendChild(editFormTitle)
        editFormContainer.appendChild(editFormInput)
        editFormContainer.appendChild(editFormDate)
        editFormContainer.appendChild(editProjectSelectLabel)
        editFormContainer.appendChild(editProjectSelect)
        editFormContainer.appendChild(labelEditPriority)
        editFormContainer.appendChild(editPriority)
        editFormContainer.appendChild(editSubmitButton)
        editFormContainer.appendChild(editCancelButton)
        editFormDiv.appendChild(editFormContainer)
        document.body.appendChild(editFormDiv)


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


    function populateProjectSelect(){
        let selectDivs = document.querySelectorAll('#projectselect')
        let projectArray = projectDB.getProjectArray()
        for (let selectDiv of selectDivs){
            selectDiv.innerHTML = '';
        
        

            for (let project of projectArray){
            let option = document.createElement('option')
            let title = project.getTitle()
            option.setAttribute('value', title)
            option.textContent = title
            selectDiv.appendChild(option)
           }
        }
    }

    function _targetById(id) {
        let element = document.querySelector(id)
        return element
    }

    function _setEventListeners() {
        _targetById('#alltasks').addEventListener('click', ()=> console.log('you clicked me'), false)
        _targetById('#newtask').addEventListener('click', ()=> eventHandler.newTask(), false)
        _targetById('#newproject').addEventListener('click', ()=> eventHandler.newProject(), false)
        _targetById('#submitbutton').addEventListener('click', eventHandler.formSubmit, false)
        _targetById('#cancelbutton').addEventListener('click', ()=> eventHandler.cancelTask(), false)
        _targetById('#projectsubmitbutton').addEventListener('click', ()=> eventHandler.projectFormSubmit(), false)
        _targetById('#projectcancelbutton').addEventListener('click', ()=> eventHandler.cancelProject(), false)
        _targetById('#editcancelbutton').addEventListener('click', ()=> eventHandler.cancelEditTask(), false)
        _targetById('#editsubmitbutton').addEventListener('click', ()=> eventHandler.editTaskSubmit(), false)
        
    }


    function populateTasks(){
        let projectIndex = activeProject.getActiveProject()


        console.log(`populate task function called with an projectindex of ${projectIndex}`)
        let startDiv = document.querySelector('.content')
        
        let arrayTaskIndexes = relationshipHandler.getTasksByProject(projectIndex)
        let taskArray = taskDB.getTaskArray()
        console.log(arrayTaskIndexes)
        
        startDiv.innerHTML = ""

        for(let i in arrayTaskIndexes) {
            let taskIndex = arrayTaskIndexes[i]
            let task = taskArray[taskIndex]

            let title = task.getTitle()
            let date = task.getDate()
            let priority = task.getPriority()
            let index = taskIndex
        

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

            let buttonDiv = document.createElement('button')
            buttonDiv.setAttribute('id', 'taskbuttondiv')
            
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
                let container = this.parentElement.parentElement;
                let index = parseInt(container.getAttribute('data'));
                
                let projectIndex = relationshipHandler.getProjectByTask(index)
                relationshipHandler.removeRelationship(projectIndex,index)
                console.log(`relationship removed with ${projectIndex}project index and taskindex ${index}`)

                taskDB.removeTask(index);
                populateTasks();
                populateProjectSelect()
            });

            let editButton = document.createElement('button')
            editButton.textContent = 'Edit'
            editButton.addEventListener('click', function(){
                let container = this.parentElement.parentElement;
                let index = parseInt(container.getAttribute('data'))
                eventHandler.editTask(index)

            })

        



            container.appendChild(titleDiv)
            container.appendChild(dateDiv)
            container.appendChild(priorityBtn)
            buttonDiv.appendChild(deleteButton)
            buttonDiv.appendChild(editButton)
            container.appendChild(buttonDiv)
          

            startDiv.appendChild(container)




        }
    }

    function populateProjects(){
        let projectDiv = document.querySelector('#projectdiv')
        projectDiv.innerHTML= ""
      
        let array = projectDB.getProjectArray()
        for (let object in array) {
          let title = array[object].getTitle()
          let index = projectDB.getIndex(array[object])
          let projectBtn = document.createElement('button')
          projectBtn.setAttribute('data', index)
          projectBtn.setAttribute('id', 'projectbtn')
          projectBtn.textContent = title
          let projectContainer = document.createElement('div')
          projectContainer.setAttribute('id', 'projectcontainer')
          projectContainer.setAttribute('data', index)
          projectBtn.addEventListener('click', function(){
            let projectIndex = parseInt(projectBtn.getAttribute('data')) ;
            activeProject.setActiveProject(projectIndex)
            populateTasks()
          })
      
          let projectDelete = document.createElement('button')
          projectDelete.setAttribute('id', 'projectdeletebtn')
          let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("width", "16");
          svg.setAttribute("height", "16");
          svg.setAttribute("viewBox", "0 0 16 16");
          let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", "M2 3h12v2H2V3zm12 4H2v6h12V7zm-2 4H4v-3h8v3z");
          path.setAttribute("fill", "currentColor");
          svg.appendChild(path);
          projectDelete.appendChild(svg);
          projectDelete.addEventListener('click', function(){
            let container = this.parentElement
            let index = parseInt(container.getAttribute('data'))
            let projectArray = projectDB.getProjectArray()
            let project = projectArray[index]
            if(index != 0 ){projectDB.removeProject(project)
            relationshipHandler.removeAllTasksByProject(index)
      
            activeProject.setActiveProject(0)
            populateProjects()
            populateProjectSelect()
            populateTasks()} 
            else {
                window.alert('Cannot delete default project.')
            }
          })
      
          projectContainer.appendChild(projectBtn)
          projectContainer.appendChild(projectDelete)
          projectDiv.appendChild(projectContainer)  
        }
      }


    function load (){
        
        _constructForms()
        populateProjectSelect()
        _constructHTML()
        populateTasks()
        populateProjects()
        _setEventListeners()
       
    }

    return{ load,
        populateTasks,
        populateProjects,
        populateProjectSelect

    }

})()



export {Pageload}