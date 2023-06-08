/** @odoo-module **/

import { registry } from "@web/core/registry";
const { Component, mount, xml, reactive, useState, useRef, useEnv, useSubEnv, onMounted, onWillStart } = owl;

// --------------------------------------------------------------------------
// Store
//  The useStore hook and the TaskList class compose the store for this file.
//  The TaskList defines the data held within the store, which is shared by
//  all components who acess the store. A component can access the store by
//  calling the useStore hook in their setup method. 
//
//  When state is modified in the store, all components who are using it will 
//  automatically receive notifications and update their state accordingly.
//  This is due to createTaskStore being called to establish the env, and it
//  creates a reactive instantiation of TaskList. Everytime the store is
//  modified, the tasks will be saved using the nested saveTasks function.
// --------------------------------------------------------------------------

// Hook: useStore
function useStore() {
    const initEnv = useEnv();
    // If there's an existing env w/ a store, use it
    if (initEnv?.store) {
        return useState(initEnv.store);
    }
    // Otherwise this is the root component and the store needs to be
    // initialized.
    const newEnv = {
        ...initEnv,
        store: createTaskStore(),
    }
    useSubEnv(newEnv) // Share this env with child components
    return useState(newEnv.store);
}

// Class (non-component): TaskList
class TaskList {
    constructor(tasks) {
        // If there are existing tasks, use those. Otherwise start anew.
        this.tasks = tasks || [];
        const taskIds = this.tasks.map(t => t.id);
        // To get the nextId, the max of all Ids needs to be found (rather
        // than just using the length) to account for deleted tasks.
        this.nextId = taskIds.length ? Math.max(...taskIds) + 1 : 1;
        this.filter = "all";
    }

    get displayedTasks() {
        const tasks = this.tasks;
        console.log("dt", tasks)
        switch(this.filter) {
            case "all": return tasks;
            case "active": return tasks.filter(t => !t.isCompleted);
            case "completed": return tasks.filter(t => t.isCompleted);
        }
    }

    addTask(text) {
        text = text.trim();
        if (!text) return;

        const newTask = {
            id: this.nextId++,
            text: text,
            isCompleted: false,
        };
        this.tasks.push(newTask);
    }

    toggleTask(task) {
        task.isCompleted = !task.isCompleted;
    }

    deleteTask(task) {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1);
    }

    setFilter(filter) {
        this.filter = filter; 
    }
}

// Function: createTaskStore
function createTaskStore() {
    async function fetchTasks() {
        const tasks = await this.orm.searchRead("owl_todo", [], ["name", "color", "completed"])
        // for (let t of tasks)
        //     this.store.addTask(t);
    }

    function saveTasks() {
        // localStorage.setItem("owl-todoapp", JSON.stringify(taskStore.tasks));
        console.log("Saving tasks... :)")
    }

    // const initialTasks = JSON.parse(localStorage.getItem("owl-todoapp") || "[]");
    // const initialTasks = fetchTasks()
    const taskStore = reactive(new TaskList(initialTasks), saveTasks);
    saveTasks(); // Initial observation
    return taskStore;
}


// --------------------------------------------------------------------------
// Auxiliary Components
//  The Task and InputField components support the Root component. 
//  Task contains the structure of each task and the relevant calls to the
//  store. The text for each task is used as a label and automatically mapped 
//  to its associated checkbox.
//  InputField creates a text field and associated label, with an automatically
//  generated name to map the label to the field. Additionally, the input field 
//  can optionally be focused when the page is loaded.
// --------------------------------------------------------------------------

// Component: Task
class Task extends Component {
    setup() {
        this.store = useStore();
    }
}
Task.props = ["task"]
Task.template = "owl_todo.Task";


// Component: InputField
class InputField extends Component {
    setup() {
        this.store = useStore();
        this.state = useState({
            technicalName: this.props.inputName.toLowerCase().replaceAll(' ', '-'),
        });
        if (this.props.isFocused) {
            const inputRef = useRef("add-input");
            onMounted(() => inputRef.el.focus());
        }
    }
}
InputField.props = ["inputName", "handleKeypress", "isFocused"]
InputField.template = "owl_todo.InputField"


// Component: TaskPanel
class TaskPanel extends Component {
    setup() {
        this.store = useStore();
        this.state = useState({
            displayedTasks: this.props.displayedTasks,
        });
    }
}
TaskPanel.template = "owl_todo.TaskPanel"


// --------------------------------------------------------------------------
// Main Component
//  This is the entrypoint for the todo list application. It displays the 
//  input field where the user can specify a new task using the InputField
//  component. Every task inside the store is then listed using the Task
//  component.
// --------------------------------------------------------------------------
// Component: Root
export class Root extends Component {
    setup() {
        this.state = useState({
            filter: "all",
            displayedTasks: []
        });
        this.store = useStore();

        onWillStart(async () => {
            await this.fetchTasks();
        });
    }
        
    addTask(e) {
        if (e.key === "Enter") {
            this.store.addTask(e.target.value);
            e.target.value = "";
        }
    }
}
Root.components = { InputField, TaskPanel, Task };
Root.template = 'owl_todo.TodoList';


registry.category('actions').add('owl_todo.action_todolist_js', Root);
