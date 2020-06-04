
import { FieldDefinition, SchemeDefinitionMap, FieldDefinitionType } from "../models";
import { RootSchemeKey } from "../consts";




function assignRootSchemeKey(prototype: any) {
    prototype[RootSchemeKey] = prototype[RootSchemeKey] == undefined ? new Map() : prototype[RootSchemeKey];
}


function addFieldDefinitionToScheme(prototype: any, key: string, definition: FieldDefinition) {
    const map = (prototype[RootSchemeKey] as SchemeDefinitionMap);
    map.has(key) ? map.get(key).push(definition) : map.set(key, [definition]);
}


export function injectFieldDefinition(prototype: any, key: string, definition: FieldDefinition) {
    assignRootSchemeKey(prototype);
    addFieldDefinitionToScheme(prototype, key, definition);
}

export function overrideFieldDefinitionType(prototype: any, key: string, override: FieldDefinitionType, origin: FieldDefinitionType) {
    assignRootSchemeKey(prototype);
    const map = (prototype[RootSchemeKey] as SchemeDefinitionMap);

    if(map.has(key)) {

        const definitions = map.get(key);
        const defType = definitions[definitions.length-1].type;
        if(defType == origin) {
            Object.assign(definitions[definitions.length-1], { type: override });
            map.set(key, definitions);
        }
    }
}