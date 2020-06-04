export function errorToJson(err: any) {
    const alt = {};

    Object.getOwnPropertyNames(err).forEach(function (key) {

        key != 'stack' ? alt[key] = err[key] : 0;
    });

    return alt;
}