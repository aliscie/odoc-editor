export function removeItemAtIndex<T>(arr: T[], index: number): T[] {
    if (index < 0 || index >= arr.length) {
        throw new Error('Index out of bounds');
    }
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}