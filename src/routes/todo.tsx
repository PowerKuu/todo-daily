import { Route } from "@klevn/solid-router"
import styles from "./todo.module.css"

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
            <img src="" alt="" />
            <p>20.0.0.2</p>
            <img src="" alt=""/>
        </div>

        <form class={styles.new}>
            <input class={styles.text} type="text"></input>
            <input class={styles.submit} type="submit"/>
        </form>
    </div>
}