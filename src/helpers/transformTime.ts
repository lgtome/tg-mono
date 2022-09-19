export function transformTime(value: string | number | undefined) {
    if (!value) {
        return undefined
    }
    const num = parseInt(value.toString())
    if (isNaN(num)) {
        return undefined
    }
    return num
}
export function sumUpTime(value: string | number | undefined): number {
    return new Function('return ' + value)()
}
