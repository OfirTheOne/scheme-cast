
import { RootSchemeKey } from "../consts";
import { InvalidSchemeClassError } from "../errors";



export function extractScheme(schemeClass: any) {
    if(schemeClass.prototype == undefined) {
        throw new InvalidSchemeClassError();
    }
    return schemeClass.prototype[RootSchemeKey];
}

