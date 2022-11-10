import styles from "./todo.module.css"

export default function Todo({password}:{password:string}){
    return <>
        <div class={styles.button}>
            <p>Exit</p>
            <p>Share</p>
        </div>

        <div class={styles.slide}>
            <img src="" alt="" />
            <p>20.0.0.2</p>
            <img src="" alt=""/>
        </div>

        <form class={styles.new}>
            <input class={styles.text} type="text"></input>
            <input type="submit"/>
        </form>
    </>
}