import { FC, HTMLAttributes } from "react"
import { todo } from "../types/todo"


// onClick등을 부모태그에서 사용하고싶을때
interface TodoCardProps extends HTMLAttributes<HTMLParagraphElement> {
    todo: todo
}
const TodoCard: FC<TodoCardProps> = ({ todo, ...props }) => {
    return (
        <p className="todo-card" key={todo.id} {...props}>
            {todo.title}
        </p>
    )
}

export default TodoCard