import { router } from "@klevn/solid-router" 
import './index.css'

import Home from "./routes/home"
import Todo from "./routes/todo"

function Wrapper({children}:{children:any}){
    return <div class="wrapper">
        {children}
    </div>
}

router.add("/", () => {
    return <Wrapper>
        <Home></Home>
    </Wrapper>
})

router.add("/[password]", ({password}) => {
    return <Wrapper>
        <Todo password={password}></Todo>
    </Wrapper>
})

router.update()
