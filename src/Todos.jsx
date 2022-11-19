import { useState } from "react";
import { FaTimes, FaCheck, FaAngleRight, FaAngleDown } from "react-icons/fa";
import "./todo.css";

const Todo = ({ todo, toggle, deleteTodo, more }) => {


    const style = {
        marginTop: "5px",
        marginRight: "5px",
        color: "red",
        fontSize: "20px",
        cursor: "pointer"
    }
    const style2 = {
        marginRight: "20px",
        color: "green",
        fontSize: "20px",
        cursor: "pointer",
        marginTop: "5px"
    }
    const FaAngleRightStyle = {
        marginTop: "20px",
        marginRight: "25px",
        cursor: "pointer",
        color: "blueviolet",
        fontSize: "20px"

    }

    return (
        <div className="container">
            <div className="todo">
                <div className="text-area" style={todo.isCompleted ? { textDecoration: "line-through", color: "red" } : {}}>
                    {!todo.seeMore ? <FaAngleRight style={FaAngleRightStyle} onClick={() => {
                        more(todo.id)
                    }} /> : <FaAngleDown style={FaAngleRightStyle} onClick={() => {
                        more(todo.id)
                    }} />}
                    {todo.job}
                    {
                        todo.seeMore ? <div className="see-more"><p>When: {todo.when}</p><p>Where: {todo.where}</p></div> : ""
                    }

                </div>
                <div className="icons">
                    <FaCheck style={style2} onClick={() => {
                        toggle(todo.id)
                    }} /> <FaTimes style={style} onClick={() => {
                        deleteTodo(todo.id)
                    }} />
                </div>
            </div>

        </div>
    )
}

const Todos = () => {
    const [newTodo, setnewTodo] = useState("");
    const [newTodoWhen, setNewTodoWhen ] = useState("");
    const [newTodoWhere, setNewTodoWhere] = useState("");
    const [addForm, setAddForm] = useState(false);

    const [todos, setTodos] = useState([
        {
            id: 1,
            job: "Meeting with friends for coffee",
            seeMore: false,
            when: "Oct 22 2022 ",
            where: "At 4 Killo",
            isCompleted: false
        },
        {
            id: 2,
            job: "Start awesome react project",
            seeMore: false,
            when: "Oct 21 2022",
            where: "At 5 Killo",
            isCompleted: true
        },
        {
            id: 3,
            job: "Church programme",
            seeMore: false,
            when: "Oct 23 2022",
            where: "At 6 Killo",
            isCompleted: false
        },
    ])

    const addNewTodo = () => {
        const id = Math.floor(Math.random() * 100000 + 1);
        const newTodos = [...todos, { id: id, job: newTodo, seeMore: false, when: newTodoWhen, where: newTodoWhere, isCompleted: false }];
        setnewTodo("")
        setNewTodoWhen("");
        setNewTodoWhere("");
        setTodos(newTodos);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!newTodo) {
            alert("You must provide the name of todo!")
            return
        }
        addNewTodo();
    }
    const toggleIsCompleted = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
        setTodos(updatedTodos);
    }

    // Delete Todo
    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        console.log(newTodos);
        setTodos(newTodos);
    }

    // See More About Job
    const toggleSeeMore = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, seeMore: !todo.seeMore } : todo
        )

        setTodos(updatedTodos);
    }

    // Toggle Add form 
    const toggleAddForm = () => {
        setAddForm(!addForm);
    }

    return (
        <div className="todo-app">
            <h1 className="title">Todo List</h1>
            {
                todos.map((todo, index) => (<Todo
                    key={index} todo={todo}
                    toggle={toggleIsCompleted}
                    deleteTodo={deleteTodo}
                    more={toggleSeeMore}
                />))
            }
            <button
                className="add-todo"
                onClick={toggleAddForm}
            >{addForm ? "Close Form" : "Add Todo"}</button>
            {
            addForm ? <form onSubmit={onSubmit}>
                <div className="container">
                <div className="todo-div">
                <label htmlFor="todo">Todo:</label>
                <input name="todo" className="new-todo"
                    type="text"
                    autoComplete="off"
                    placeholder="Add a new Todo"
                    onChange={(e) => { setnewTodo(e.target.value) }}
                    value={newTodo}
                />
                </div>
                <div className="when-todo">
                <label htmlFor="when">When:</label>
                <input 
                   className="new-todo" 
                   autoComplete="off"
                   type="text" 
                   placeholder="When Todo" 
                   onChange={(e) => {setNewTodoWhen(e.target.value)}}
                   value={newTodoWhen}
                   />
                </div>

                <div className="where-todo">
                <label htmlFor="where">Where:</label>
                <input 
                    className="new-todo" 
                    type="text" 
                    autoComplete="off"
                    placeholder="Where Todo"
                    onChange={(e) => { setNewTodoWhere(e.target.value) }}
                    value={newTodoWhere}
                    />
                </div>
                <input className="submit" type="submit" value="Add" /> 
                </div>
            </form> : ""
            }
            <div className="copyRight">
                <p>All right reserved. developed by Melese Ayen</p>
            </div>

        </div>
    )
}




export default Todos;

