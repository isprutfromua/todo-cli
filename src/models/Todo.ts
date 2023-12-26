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

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    private _content: string

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    private _editedAt: number

    get editedAt(): number {
        return this._editedAt;
    }

    set editedAt(value: number) {
        this._editedAt = value;
    }

    private _done: boolean

    get done(): boolean {
        return this._done;
    }

    set done(value: boolean) {
        this._done = value;
    }

    get createdAt(): number {
        return this._createdAt;
    }

    async edit(newTitle: string, newContent: string) {
        this.title = newTitle
        this.content = newContent
        this.editedAt = Date.now()
    }

    complete() {
        this.done = true
    }

    toString() {
        return [
            `Title: ${this.title}`,
            `Content: ${this.content}`,
            `Created: ${new Date(this.createdAt).toLocaleString()}`,
            `Edited: ${new Date(this.editedAt).toLocaleString()}`,
            `Done: ${this.done}`
        ].join('\n')
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