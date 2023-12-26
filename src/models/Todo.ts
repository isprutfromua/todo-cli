import {confirm} from "@inquirer/prompts";
import {ITodo} from "../types/Todo";

export class Todo implements ITodo {
    private readonly _createdAt: number

    constructor(title: string, content: string) {
        const currentTime = Date.now()

        this._title = title
        this._content = content
        this._createdAt = currentTime
        this._editedAt = currentTime
        this._done = false
    }

    private _title: string
    private _content: string
    private _editedAt: number
    private _done: boolean

    async edit(newTitle: string, newContent: string) {
        this._title = newTitle
        this._content = newContent
        this._editedAt = Date.now()
    }

    complete() {
        this._done = true
    }

    toString() {
        return [
            `Title: ${this._title}`,
            `Content: ${this._content}`,
            `Created: ${new Date(this._createdAt).toLocaleString()}`,
            `Edited: ${new Date(this._editedAt).toLocaleString()}`,
            `Done: ${this.done}`
        ].join('\n')
    }

    get done(): boolean {
        return this._done
    }

    get title(): string {
        return this._title;
    }

    get content(): string {
        return this._content;
    }

    get createdAt(): number {
        return this._createdAt;
    }
}

export class PrivateTodo extends Todo {
    async edit(newTitle: string, newContent: string) {
        const confirmation = await confirm({message: 'Do you want to save this note?'})

        if (confirmation) {
            await super.edit(newTitle, newContent)
            console.log('Edit confirmed')
        } else {
            console.log('Edit is not allowed')
        }
    }
}