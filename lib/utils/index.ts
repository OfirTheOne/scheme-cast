export function errorToJson(err: any) {
    const alt = {};

    Object.getOwnPropertyNames(err).forEach(function (key) {

        key != 'stack' ? alt[key] = err[key] : 0;
    });

    return alt;
}


export function objectOwnEveryProperties(obj: object, properties: Array<string>) {
    return typeof obj == 'object' && properties.every(p => (obj as Object).hasOwnProperty(p)) 
}

export function objectOwnSomeProperties(obj: object, properties: Array<string>) {
    return typeof obj == 'object' && properties.some(p => (obj as Object).hasOwnProperty(p)) 
}


export function objectOwnNoProperties(obj: object, properties: Array<string>) {
    return typeof obj == 'object' && properties.every(p => !(obj as Object).hasOwnProperty(p)) 
}





export function arrayOfType(arr: Array<any>, type: string) {
    return Array.isArray(arr) && arr.every(v => typeof v == type);
}

export function arrayOfLength(arr: Array<any>, len: number) {
    return Array.isArray(arr) && arr.length == len;
}



