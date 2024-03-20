export function encode(data: string): string {
    return btoa(data);
}

export function decode(encodedData: string): string {
    return atob(encodedData);
}