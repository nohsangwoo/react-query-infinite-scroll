import { useEffect, useState } from 'react'
import './App.css'
import TodoCard from './components/TodoCard'
import { todo } from './types/todo'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

function App() {
  // ref : 관찰 대상이 되는 DOM 요소
  // inView : 관찰 대상이 화면에 보이는지 여부
  // entry : 관찰 대상에 대한 정보
  const { ref, inView, entry } = useInView();

  const [todos, setTodos] = useState<todo[]>([])

  const fetchTodos = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`)
    const data = await res.json()
    setTodos(data)
    return data
  }

  // fetchNextPage는 다음 페이지를 가져오는 트리거 함수
  // hasNextPage는 다음 페이지가 있는지 여부를 알려주는 boolean
  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    // initialPageParam: 1,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {

      console.log({ lastPage, allPages })
      // lastPage는 이전에 가져온 페이지의 데이터 내용을 포함한다.
      // allPages는 현재부터 이전에 가져온 페이지들의 데이터 내용을 전부 포함한다.

      // return lastPage.nextCursor
      // return allPages.length + 1
      // return 20 + 1
      const nextPage = lastPage.length ? allPages.length + 1 : undefined
      return nextPage
    }
  })

  const content = data?.pages.map((todos: todo[]) => todos.map((todo, index) => {
    if (todos.length === index + 1) {
      return (<TodoCard innerRef={ref} key={todo.id} todo={todo} />)
    }
    return <TodoCard key={todo.id} todo={todo} />
  }))


  useEffect(() => {
    if (inView) {
      console.log("inView")
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])


  if (status === "pending") return <div>loading...</div>

  if (status === "error") {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className='app'>
      {content}
      {/* <button ref={ref} disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? "Loading more" : hasNextPage ? "Load more" : "Nothing more to load"}
      </button> */}
      {isFetchingNextPage && <h4>Loading...</h4>}
    </div>
  )
}

export default App
