export interface ISearchable<T> {
    search(key: keyof T, query: string): T[]
}