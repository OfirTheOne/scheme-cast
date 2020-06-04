import { FieldDefinition } from "../models";
import { injectFieldDefinition } from "./inject-field-definition";


export function definitionDecoratorFactory<Class = any>(definition: FieldDefinition<Class>) {

    return function(target: any, key: string) {
        return injectFieldDefinition(target, key,  {args: [], ...definition});
    };
}


