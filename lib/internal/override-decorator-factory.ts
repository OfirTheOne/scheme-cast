import { FieldDefinition, FieldDefinitionType } from "../models";
import { overrideFieldDefinitionType } from "./inject-field-definition";


export function overrideDecoratorFactory(override: FieldDefinitionType, origin: FieldDefinitionType) {

    return function(target: any, key: string) {
        return overrideFieldDefinitionType(target, key, override, origin);
    };
}


