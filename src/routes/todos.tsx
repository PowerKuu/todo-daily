import { Route } from "@klevn/solid-router"

import Todo, {State} from "../components/todo"

import styles from "./todos.module.css"

import leftArrow from "../assets/arrow-left.svg"
import rightRight from "../assets/arrow-right.svg"

import plusSymbol from "../assets/plus-symbol.svg"
import { createSignal } from "solid-js"

interface Todo {
    text: string,
    state: State,
}

interface Todos {
    [time: string]: Todo[]
}

export function calculateTimeOffset(offset: number): Date {
    const millisecondsInDay = 86_400_000
    const offsetedUnixMulliseconds =  new Date().getTime() - (offset * millisecondsInDay)
    return new Date(offsetedUnixMulliseconds)
}

export default function Todos({password, initTimeOffset}:{password:string, initTimeOffset?:number}){
    const initTodos:Todos = {
        [new Date().getTime().toString()]: [
            {
                text: "hello",
                state: 1
            },
            {
                text: "hello",
                state: 0
            },
            {
                text: "hello",
                state: 2
            },
        ],

        [(new Date().getTime()-3400000).toString()]: [
            {
                text: "hello",
                state: 1
            },
            {
                text: "hello",
                state: 0
            },
            {
                text: "hello",
                state: 2
            },
        ],

        [(new Date().getTime()-7400000).toString()]: [
            {
                text: "hello",
                state: 1
            },
            {
                text: "hello",
                state: 0
            },
            {
                text: "hello",
                state: 2
            },
        ],
    }

    const [getTodos, setTodos] = createSignal(initTodos)
    const [getTimeOffset, setTimeOffset] = createSignal(initTimeOffset ?? 0)

    function slide(left:boolean){
        if (left){
            setTimeOffset(getTimeOffset()+1)
        } else {
            if (getTimeOffset() == 0) return
            setTimeOffset(getTimeOffset()-1)
        }
    }

    function share(){
        alert(password)
    }

    function mapTodos(){
        const currentTodos = getTodos()[
            calculateTimeOffset(
                getTimeOffset()
            ).getTime().toString()
        ]

        if (!currentTodos) return
        return currentTodos.map(({text, state}) => {
            return <Todo text={text} state={state}></Todo>
        })
    }

    function getLatestTodo(){
        const todos = getTodos()

        interface Current {
            time: number,
            todos: Todo[]
        }

        var current:Current = {
            time: 0,
            todos: []
        }

        for (var timeKey in todos){
            if (current.time < Number(timeKey)){
                current = {
                    time: Number(timeKey),
                    todos: todos[timeKey]
                }
            }
        }

        return current
    }

    function addTodo(text: string){
        const todos = getTodos()
        const timeKey = calculateTimeOffset(0).toString()
        var newTodos = []

        if (!todos[timeKey]){
            newTodos = getLatestTodo().todos
        } else {
            newTodos = todos[timeKey]
        }

        newTodos.push({
            text,
            state: 0,
        })

        setTodos(todos)
    }

    let formElement:any

    return <div class={styles.content}>
        <div class={styles.buttons}>
            <p>
                <Route path="/">Exit</Route>
            </p>

            <p onclick={share}>
                Share
            </p>
        </div>

        <div class={styles.slide}>
            <img onclick={() => {slide(true)}} src={leftArrow} alt="" />
            <p>{calculateTimeOffset(getTimeOffset()).toLocaleDateString()}</p>
            <img onclick={() => {slide(false)}} src={rightRight} alt=""/>
        </div>

        <form ref={formElement} class={styles.new} onsubmit={(event) => {
            event.preventDefault()
            const formData = new FormData(formElement)
            const text = formData.get("text") as string

            if (!text) return
        }}>
            <input class={styles.text} name="text" type="text"></input>

            <input class={styles.submit} name="submit" type="image" src={plusSymbol} alt="Submit"/>
        </form>

        <div class={styles.todos}>
            {mapTodos()}
        </div>
    </div>
}