import styles from "./todo.module.css"

export type State = 0|1|2

export default function Todo({text, state}:{text:string, state:State}){
    const stateClass = state === 0 ? styles.none : (state === 1 ? styles.done : styles.fail)
    return <div class={styles.todo}>
        <p>{text}</p>
        <div class={stateClass}></div>
    </div>
}