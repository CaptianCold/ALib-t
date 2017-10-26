/**
 * Created by divya.raghunathan on 6/24/2016.
 */

export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export function bytesToSize(bytes : number) : string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024))+'', 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

export function capitalizeFirstLetter(word : string) : string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
