export interface ITodo {
    title: string;
    content: string;
    createdAt: number;
    done: boolean;

    edit(newTitle: string, newContent: string): Promise<void>;

    complete(): void;
}

export type TSearchableKeys = 'title' | 'content'
export type TSortableKeys = 'done' | 'createdAt'