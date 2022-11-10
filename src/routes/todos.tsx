import { Route } from "@klevn/solid-router"
import styles from "./todos.module.css"

import leftArrow from "../assets/arrow-left.svg"
import rightRight from "../assets/arrow-right.svg"

import plusSymbol from "../assets/plus-symbol.svg"

export default function Todo({password}:{password:string}){
    const hello = "poop"
    return <div class={styles.content}>
        <div class={styles.buttons}>
            <p>
                <Route path="/">Exit</Route>
            </p>
            <p>
                Share
            </p>
        </div>

        <div class={styles.slide}>
            <img src={leftArrow} alt="" />
            <p>20.0.0.2</p>
            <img src={rightRight} alt=""/>
        </div>

        <form class={styles.new}>
            <input class={styles.text} type="text"></input>

            <input class={styles.submit} type="image" src={plusSymbol} alt="Submit"/>
        </form>
    </div>
}