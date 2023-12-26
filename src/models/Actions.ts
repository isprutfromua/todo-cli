import {getTodoListAsChoices, TodoList} from "./TodoList";
import {input, select} from "@inquirer/prompts";
import {PrivateTodo, Todo} from "./Todo";
import {searchChoices, sortChoices} from "./Choises";

export type TAction = Record<keyof typeof actionTitles,() => Promise<string | boolean>>
export type TActionKey = keyof typeof actionTitles

export const actionTitles = {
    add: 'Add new todo',
    delete: 'Delete todo',
    edit: 'Edit todo',
    get: 'Get info about todo',
    mark: 'Mark todo as completed',
    sort: 'Sort all todos',
    search: 'Search todo',
    stat: 'Get info about todos',
    printAll: 'Show all todos',
    exit: 'Exit'
}

export function getActions(todoList: TodoList):TAction  {
    return {
        add: async () => {
            const TodoConstructor = await select({
                message: 'Which todo do you want to add?', choices: [
                    {name: 'Default', value: Todo},
                    {name: 'Private', value: PrivateTodo}
                ]
            })
            const title = await input({message: 'Write new ToDo title', default: 'Title'})
            const content = await input({message: 'Write new ToDo content', default: 'Content'})
            const todo = new TodoConstructor(title, content)

            const result = todoList.add(todo)

            if (result) {
                return `Todo was successfully added.`
            } else {
                return `Something went wrong while trying to add todo`
            }
        },
        delete: async () => {
            if (!todoList.size) {
                return `You don't have any todos to remove.`
            }

            const noteId = await select({message: 'What ToDo you want to delete?', choices: getTodoListAsChoices(todoList)})
            todoList.delete(noteId)

            return `Todo was successfully deleted.`
        },
        edit: async () => {
            if (!todoList.size) {
                return `You don't have any todos to edit.`
            }

            const noteId = await select({message: 'What ToDo you want to edit?', choices: getTodoListAsChoices(todoList)})
            const title = await input({message: 'Write new ToDo title', default: 'Title'})
            const content = await input({message: 'Write new ToDo content', default: 'Content'})

            await todoList.edit(noteId, [title, content])

            return true
        },
        get: async () => {
            if (!todoList.size) {
                return `You don't have any todos.`
            }

            const noteId = await select({message: 'What ToDo you want to show?', choices: getTodoListAsChoices(todoList)})

            return todoList.getInfo(noteId)
        },
        mark: async () => {
            if (!todoList.size) {
                return `You don't have any todos to mark as done.`
            }

            const noteId = await select({
                message: 'What ToDo you want to mark as complete?',
                choices: getTodoListAsChoices(todoList)
            })
            todoList.markAsComplete(noteId)

            return `Todo was successfully marked as done.`
        },
        sort: async () => {
            if (!todoList.size) {
                return `You don't have any todos to sort.`
            }

            const sortKey = await select({message: 'How do you want to sort?', choices: sortChoices})
            const sorted = todoList.sort(sortKey)

            for (const todo of sorted) {
                console.log('-------------')
                console.log(todo.toString())
                console.log('-------------')
            }

            return true
        },
        search: async () => {
            if (!todoList.size) {
                return `You don't have any todos to search for.`
            }

            const searchKey = await select({message: 'How do you want to search?', choices: searchChoices})
            const query = await input({message: 'What do you want to search?'})

            const result = todoList.search(searchKey, query)

            if (!result.length) {
                return `You don't have any todos with ${searchKey} - ${query}.`
            } else {
                console.log(`You have ${result.length} todos with ${searchKey} - ${query}.\n`)

                for (const todo of result) {
                    console.log('-------------')
                    console.log(todo.toString())
                    console.log('-------------')
                }

                return `\nSearch was successfully done.`
            }
        },
        stat: async () => {
            if (!todoList.size) {
                return `You don't have any todos.`
            }

            const {all, completed} = todoList.getNotesInfo()

            return `You have ${all} todos.\nYou have ${all - completed} todos in progress.`
        },
        printAll: async () => {
            if (!todoList.size) {
                return `You don't have any todos.`
            }

            const todos = todoList.getAllData()

            for (const todo of todos) {
                console.log('-------------')
                console.log(todo.toString())
                console.log('-------------')
            }

            return true
        },
        exit: async () => process.exit()
    };
}