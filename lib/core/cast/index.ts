import { Class } from 'utility-types';
import { extractScheme } from "../../internal/extract-scheme";
import { SchemeDefinitionMap, FieldDefinition, FieldDefinitionType, ConstructResult, DefinitionAction } from "../../models";
import { globals } from '../../globals';
import { errorToJson } from '../../utils';
import { ArrayOfSchemeRefAppliedOnNonArrayVelueError } from '../../errors';



export function cast<T>(schemeClass: Class<T>, rawValue: { [key: string]: any }): ConstructResult<T> {

    const map: SchemeDefinitionMap = extractScheme(schemeClass);
    try {
        let errors = [];
        const defaultedValues: any = {}
        const transformedValues: any = {}

        for (let [key, definitions] of map.entries()) {
            
            let loopVariables = {
                value : rawValue[key],
    
                fieldErrors: [],
                isFieldOptionalAndNotExists: false,
                isFieldExists: globals.required_condition(rawValue[key]),
                isFieldOptional: true,
                defaultValueApplied: false,
                isPreValidateTransform: false,
                isAliasKeyApplied: false,
                aliasKey: undefined //findFirstKeyWhereValueExists(key, )
            }

            // let fieldAliases: Array<string> = []


            const orderGroupedDefinitionsEntries = preprocessFieldDefinitions(definitions);

            for (let [type, list] of orderGroupedDefinitionsEntries) {

                switch (type) {
                /*
                    case FieldDefinitionType.ALIAS: {
                        if(!globals.apply_aliases) { break; }
                        const aliasesDefinitions = list;

                        for (let def of aliasesDefinitions) {
                            // stop checking for required definition after the first definition that resolved to optional 
                            // if (isFieldOptionalAndNotExists) { break; }

                            let { action, args = [], error } = def;

                            const actionResult = (action as DefinitionAction<Array<string>, any>)({
                                value: loopVariables.value,
                                key,
                                ref: rawValue
                            }, ...args);


                            const fieldAliases = actionResult;
                            loopVariables.aliasKey = findFirstAliasKeyWhereValueExists(key, fieldAliases, rawValue);
                            loopVariables.isAliasKeyApplied = loopVariables.aliasKey != key;

                            loopVariables.value = extractValueWithOriginalOrAliasKey(key, loopVariables.aliasKey, rawValue);
                        }

                        break;
                    }
                */

                    case FieldDefinitionType.REQUIRED: {
                        const requiredDefinitions = list;

                        for (let def of requiredDefinitions) {
                            // stop checking for required definition after the first definition that resolved to optional 
                            if (loopVariables.isFieldOptionalAndNotExists) { break; }

                            let { action, args = [], error } = def;

                            const actionResult: boolean = (action as DefinitionAction<any>)({
                                value: loopVariables.value,
                                key,
                                ref: rawValue
                            }, ...args);
                            loopVariables.isFieldOptional = !actionResult;

                            if (!loopVariables.isFieldOptional && !loopVariables.isFieldExists) {
                                loopVariables.fieldErrors.push(((error || globals.error_generator)(def, { key, value: loopVariables.value })));

                            }
                            loopVariables.isFieldOptionalAndNotExists = (loopVariables.isFieldOptional && !loopVariables.isFieldExists);
                        }

                        break;
                    }

                    case FieldDefinitionType.DEFAULT: {
                        // assign default values only on field that resolved to optional.
                        if (!loopVariables.isFieldOptional) { break }

                        const defaultDefinitions = list;

                        for (let def of defaultDefinitions) {
                            const { action, args = [], error } = def;

                            if (!loopVariables.isFieldExists) {
                                const defaultValue = (action as DefinitionAction<any>)({
                                    value: loopVariables.value,
                                    key,
                                    ref: rawValue
                                }, ...args);
                                defaultedValues[key] = defaultValue;
                                loopVariables.defaultValueApplied = true;
                            }
                        }

                        break;
                    }

                    case FieldDefinitionType.TRANSFORM_PRE_VALIDATE: {
                        if (globals.skip_transform_on_default && loopVariables.defaultValueApplied) { break }

                        if (globals.skip_transform_on_optional_not_exists_no_default && 
                           (
                               loopVariables.isFieldOptional && 
                                !loopVariables.isFieldExists && 
                                !loopVariables.defaultValueApplied
                            )
                        ) { break }
                        
                        const transformPreValidateDefinitions = list;

                        for (let def of transformPreValidateDefinitions) {
                            const { action, args = [], error } = def;

                            if (loopVariables.fieldErrors.length == 0) {
                                const transformValue = (action as DefinitionAction<any>)({
                                    value: loopVariables.value,
                                    key,
                                    ref: rawValue
                                }, ...args);

                                transformedValues[key] = transformValue;

                                loopVariables.isPreValidateTransform = true;
                                loopVariables.value = transformValue
                            }
                        }

                        break;
                    }

                    case FieldDefinitionType.VALIDATE: {
                        // if field optional and not exists not applying validation definitions.
                        if (loopVariables.isFieldOptionalAndNotExists || loopVariables.defaultValueApplied) { break; }

                        const validateDefinitions = list;

                        for (let def of validateDefinitions) {
                            const { action, args, error } = def;

                            const actionResult: boolean = (action as DefinitionAction<any>)({
                                value: loopVariables.value,
                                key,
                                ref: rawValue
                            }, ...args);
                            if (!actionResult) {
                                loopVariables.fieldErrors.push(((error || globals.error_generator)(def, { key, value: loopVariables.value })));
                            }
                        }

                        break;
                    }

                    case FieldDefinitionType.SCHEME_REF: {
                        const defaultDefinitions = list;

                        for (let def of defaultDefinitions) {
                            const { action, args = [], error } = def;

                            if (loopVariables.fieldErrors.length == 0) {
                                const constructResult = processSchemeRefDefinition(def, loopVariables.value, key, loopVariables.fieldErrors, transformedValues);
                                if (constructResult.errors.length > 0) {
                                    loopVariables.fieldErrors.push(...constructResult.errors)
                                } else {
                                    transformedValues[key] = constructResult.value
                                }
                            }
                        }

                        break;
                    }

                    case FieldDefinitionType.TRANSFORM: {
                        if (globals.skip_transform_on_default && loopVariables.defaultValueApplied) { break }

                        if (globals.skip_transform_on_optional_not_exists_no_default && 
                           (
                               loopVariables.isFieldOptional && 
                                !loopVariables.isFieldExists && 
                                !loopVariables.defaultValueApplied
                            )
                        ) { break }
                        
                        const transformDefinitions = list;

                        for (let def of transformDefinitions) {
                            const { action, args = [], error } = def;

                            if (loopVariables.fieldErrors.length == 0) {
                                const transformValue = (action as DefinitionAction<any>)({
                                    value: loopVariables.value,
                                    key,
                                    ref: rawValue
                                }, ...args);
                                transformedValues[key] = transformValue;
                            }
                        }

                        break;
                    }

                    default:
                        break;
                }

            }

            errors = loopVariables.fieldErrors.length > 0 ? [...errors, { [key]: loopVariables.fieldErrors }] : errors;
        }

        return {
            errors: errors.map(e => errorToJson(e)),
            value:
                Object.assign(
                    new schemeClass(),
                    rawValue,
                    defaultedValues,
                    transformedValues
                ) as T,
            rawValue
        }

    } catch (error) {
        throw error;
    }

}

export function groupByDefinitionsType(definitions: Array<FieldDefinition>) {

    return definitions.reduce((group, def) => {
        group[def.type] = group[def.type] == undefined ? [] : group[def.type];
        group[def.type].push(def);
        return group;
    }, {} as { [key in FieldDefinitionType]: Array<FieldDefinition> })

}

function preprocessFieldDefinitions(definitions: Array<FieldDefinition>) {
    const groupedDefinitions = groupByDefinitionsType(definitions);

    // iterations must follow this order.
    const orderGroupedDefinitionsEntries = [
        FieldDefinitionType.ALIAS,
        FieldDefinitionType.REQUIRED,
        FieldDefinitionType.DEFAULT,
        FieldDefinitionType.TRANSFORM_PRE_VALIDATE,
        FieldDefinitionType.VALIDATE,
        FieldDefinitionType.SCHEME_REF,
        FieldDefinitionType.TRANSFORM
    ].map(type => ([type, (groupedDefinitions[type] || [])] as [FieldDefinitionType, Array<FieldDefinition>]))

    return orderGroupedDefinitionsEntries.filter(([, d]) => d.length > 0);

}

function processSchemeRefDefinition(definition: FieldDefinition<any>, value: any, key: string, fieldErrors: Array<any>, transformedValues: any): { errors: Array<any>, value: any } {

    if (definition.type == FieldDefinitionType.SCHEME_REF) {

        const action = definition.action;
        if (!Array.isArray(action.scheme)) {

            if (action.options == undefined) {
                const constructResult = cast(action.scheme, value);
                return { errors: constructResult.errors, value: constructResult.value };

            } else if ('arrayOfTypeScheme' in action.options && action.options.arrayOfTypeScheme) {
                const constructArrayResult = castArray(action.scheme, value)
                return constructArrayResult;
            }

        }
        /*
        else if (action.options) {
        
        }

        */

    }

}


function findFirstAliasKeyWhereValueExists(key: string, aliases: Array<string>, rawValue: any) {
    const firstRelevantKey = aliases.find(k => globals.required_condition(rawValue[k]))
    return firstRelevantKey;
}

function extractValueWithOriginalOrAliasKey(key: string, alias: string, rawValue: any) {
    const firstRelevantKey = [key, alias].find(k => globals.required_condition(rawValue[k]))
    return rawValue[firstRelevantKey];
}



function castArray<T>(schemeClass: Class<T>, rawValue: Array<{ [key: string]: any }>): ConstructResult<Array<T>> {
    if (!Array.isArray(rawValue)) {
        throw new ArrayOfSchemeRefAppliedOnNonArrayVelueError()
    }
    const constructResultList = rawValue.map((val, i) => (cast((schemeClass as Class<any>), val)))
    const constructResultListError = constructResultList.map((res, i) => ({ [i]: res.errors })).filter((res, i) => res[i].length > 0);
    const constructResultListValue = constructResultList.map((res, i) => (res.value))

    return { errors: constructResultListError, value: constructResultListValue, rawValue };

}