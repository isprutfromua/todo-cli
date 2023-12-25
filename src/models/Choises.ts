import {TSearchableKeys, TSortableKeys} from "../types/Todo";
import {TChoice} from "../types/Choise";
import {ITodoList} from "../types/TodoList";

export const searchChoices: TChoice<TSearchableKeys>[] = [{
    name: 'By content',
    value: 'content'
}, {
    name: 'By Title',
    value: 'title'
}]
export const sortChoices: TChoice<TSortableKeys>[] = [{
    name: 'By status',
    value: 'done'
}, {
    name: 'By creation date',
    value: 'createdAt'
}]

export const getChoices: (todoList: ITodoList) => TChoice<number>[] = (todoList) =>
    Array.from(todoList.getEntries())
        .map(([id, todo]) => ({
            name: todo.title,
            value: id
        }))