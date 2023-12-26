export interface ISortable<T> {
    sort(key: keyof T): T[]
}