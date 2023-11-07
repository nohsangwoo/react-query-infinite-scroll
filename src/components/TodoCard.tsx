import { FC, HTMLAttributes, Ref } from "react"
import { todo } from "../types/todo"


// onClick등을 부모태그에서 사용하고싶을때
interface TodoCardProps extends HTMLAttributes<HTMLParagraphElement> {
    todo: todo
    innerRef?: Ref<HTMLParagraphElement>
}
const TodoCard: FC<TodoCardProps> = ({ todo, innerRef, ...props }) => {


    return (
        <p className="todo-card" key={todo.id} ref={innerRef} {...props}>
            {todo.title}
        </p>
    )
}

export default TodoCard