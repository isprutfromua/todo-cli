import {ITodoList} from "../types/TodoList";
import {ISearchable} from "../types/Searchable";
import {ITodo, TSearchableKeys, TSortableKeys} from "../types/Todo";
import {ISortable} from "../types/Sortable";
import {Todo} from "./Todo";
import {IStats} from "../types/Stats";
import {TChoice} from "../types/Choise";

export class TodoList implements ITodoList, ISearchable<ITodo>, ISortable<ITodo> {
    private _notes: Map<number, ITodo> = new Map()

    get notes(): Map<number, ITodo> {
        return this._notes;
    }

    private _currentId: number = 0

    get currentId(): number {
        return this._currentId;
    }

    set currentId(value: number) {
        this._currentId = value;
    }

    get size(): number {
        return this.notes.size
    }

    add(todo: ITodo) {
        const todoId = this.currentId

        try {
            this.notes.set(todoId, todo)
            this.currentId = this.currentId + 1

            return true
        } catch {
            return false
        }
    }

    delete(id: number): boolean {
        return this.notes.delete(id)
    }

    async edit(id: number, args: ConstructorParameters<typeof Todo>): Promise<boolean> {
        const note = this.notes.get(id)

        if (!note) {
            return false
        }

        await note.edit(...args)

        return true;
    }

    getAllData(): ITodo[] {
        return Array.from(this.notes.values());
    }

    getEntries() {
        return this.notes.entries()
    }

    getInfo(id: number): string {
        return this.notes.get(id)?.toString() || `No data related to note with id ${id}`;
    }

    getNotesInfo(): IStats {
        return {
            all: this.size,
            completed: this.getAllData().filter(note => note.done).length
        };
    }

    markAsComplete(id: number): boolean {
        const note = this.notes.get(id)

        if (!note) {
            console.log(`No todo with ${id}`)
            return false
        }

        note.complete()

        return true;
    }

    search(key: TSearchableKeys, query: string): ITodo[] {
        return this.getAllData().filter(note => note[key].includes(query));
    }

    sort(key: TSortableKeys): ITodo[] {
        return this.getAllData().sort((a, b) => {
            const el1 = a[key]
            const el2 = b[key]

            if (typeof el1 === 'boolean') {
                return Number(el1) * -1
            }

            return Number(el1) - Number(el2)
        });
    }
}

export const initializeTodoList = () => new TodoList()
export const getTodoListAsChoices: (todoList: ITodoList) => TChoice<number>[] = (todoList) =>
    Array.from(todoList.getEntries())
        .map(([id, todo]) => ({
            name: todo.title,
            value: id
        }))