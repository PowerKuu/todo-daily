import { Route } from "@klevn/solid-router"

import Todo, {State} from "../components/todo"

import styles from "./todos.module.css"

import leftArrow from "../assets/arrow-left.svg"
import rightRight from "../assets/arrow-right.svg"

import plusSymbol from "../assets/plus-symbol.svg"
import { createEffect, createSignal } from "solid-js"

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
    const offsetedTime = new Date(offsetedUnixMulliseconds)

    offsetedTime.setHours(0,0,0,0)

    return offsetedTime
}

export function formatDate(date: Date): string {
    return `${date.getFullYear()}/${String(date.getMonth()).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`
}

export default function Todos({password, initTimeOffset}:{password:string, initTimeOffset?:number}){
    const initTodosHistory:Todos = {}

    const todosHistory = initTodosHistory

    const [getTimeOffset, setTimeOffset] = createSignal(initTimeOffset ?? 0)
    const [getTodosElement, setTodosElement] = createSignal(mapTodos())
    function share(){
        alert(password)
    }

    function slide(left:boolean){
        if (left){
            setTimeOffset(getTimeOffset()+1)
        } else {
            if (getTimeOffset() == 0) return
            setTimeOffset(getTimeOffset()-1)
        }

        setTodosElement(mapTodos())
    }
    
    function mapTodos(){
        const currentTodos = getTodos(getTimeOffset())

        if (!currentTodos) return
        return currentTodos.map(({text, state}) => {
            return <Todo text={/*@once*/ text} state={/*@once*/ state} toggle={() => {
                
            }}></Todo>
        })
    }

    function getTodos(timeOffset: number){
        const timeKey = calculateTimeOffset(timeOffset).getTime().toString()

        if (!todosHistory[timeKey]){
            var latest:Todo[] = []
            var latestTimeKey = 0
            for (var compareTimeKey in todosHistory){
                const nTimeKey = Number(timeKey)
                const nCompareTimeKey = Number(compareTimeKey)

                if (nCompareTimeKey > latestTimeKey && nCompareTimeKey < nTimeKey){
                    latest = todosHistory[compareTimeKey]
                    latestTimeKey = nCompareTimeKey
                }
            }
            
            return latest
        } else {
            return todosHistory[timeKey]
        }
    }

    function addTodo(todo: Todo) {
        const timeKey = calculateTimeOffset(getTimeOffset()).getTime().toString()

        const todos = getTodos(getTimeOffset())
        todos.push(todo)

        todosHistory[timeKey] = todos
        
        setTodosElement(mapTodos())
    }   

    let formElement:any
    
    return <div class={styles.content}>
        <div class={styles.buttons}>
            <Route path="/">
                <p>Exit</p>
            </Route>

            <p onclick={share}>
                Share
            </p>
        </div>

        <div class={styles.slide}>
            <img onclick={() => {slide(true)}} src={leftArrow} alt="" />
            <p>{formatDate(calculateTimeOffset(getTimeOffset()))}</p>
            <img class={getTimeOffset() == 0 ? styles.gray : ""} onclick={() => {slide(false)}} src={rightRight} alt=""/>
        </div>

        <form ref={formElement} class={`${styles.new} ${getTimeOffset() == 0 ? styles.viseble : ""}`} onsubmit={(event) => {
            event.preventDefault()
            const formData = new FormData(formElement)
            const text = formData.get("text") as string

            if (!text) return
            addTodo({text, state: 0})
        }}>
            <input class={styles.text} name="text" type="text"></input>

            <input class={styles.submit} name="submit" type="image" src={plusSymbol} alt="Submit"/>
        </form>

        <div class={styles.todos}>
            {getTodosElement()}
        </div>
    </div>
}