// select DOM elemnts

const input = document.getElementById("todo-input")
const addbtn = document.getElementById("add-btn")
const list = document.getElementById("todo-list")

// try to load saved todos from localstorage(if any)

const saved = localStorage.getItem("todos");
const todos = saved? JSON.parse(saved) : [];

function saveTodos(){
    // save current todos array to local storage
    localStorage.setItem("todos",JSON.stringify(todos));
}

// create a dom node for a todo object and append it to the list

function createTodonode(todo, index){
    const li = document.createElement("li");

    //chckbox to toggle completion
    const checkbox = document.createElement("input")
    checkbox.type= "checkbox";
    checkbox.checked = !! todo.completed;
    checkbox.addEventListener("change",()=>{
        todo.completed = checkbox.checked;

        //visual feedback: strike through when completed
        textSpan.style.textDecoration = todo.completed?"line-through": ""
        saveTodos();
    })

    //text of the todo
    const textSpan= document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin= " 0 8px"
    if(todo.completed){
        textSpan.style.textDecoration = "line-through";
    }
        //add double click event listener

        textSpan.addEventListener("dblclick", ()=>{
            const newText = prompt("Edit todo", todo.text);
            if(newText !== null){
                todo.text = newText.trim()
                textSpan.textContent = todo.text;
                saveTodos();
            
            }       
})
    

    //DELETE TODO
    const delbtn = document.createElement("button");
    delbtn.textContent = "Delete";
    delbtn.addEventListener("click", ()=>{
        todos.splice(index, 1)
        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li
}



//render the whole todolist to array

function render(){
    list.innerHTML= "";

    //recreate each item

    todos.forEach((todo, index) => {
        const node= createTodonode(todo,index);
        
        list.appendChild(node)
        
    });

}

function addtodo(){
    const text = input.value.trim();
    if(!text){
        return
    }
    // push a new todo object
    todos.push({text, completed : false});
    input.value = "";
    render()
    saveTodos()
}

addbtn.addEventListener("click", addtodo);
render();