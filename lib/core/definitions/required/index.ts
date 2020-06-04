// required
//#region 

import { definitionDecoratorFactory } from "../../../internal/definition-decorator-factory"

import { FieldDefinitionType } from "../../../models"

/**
 * @definition_type required
 */
export const Required = <Class = any>(condition?: (ref: Class)=>boolean) =>  definitionDecoratorFactory<Class>({
    type: FieldDefinitionType.REQUIRED,
    id: 'Required',
    action: ({value, ref}) => (condition == undefined ? true : condition(ref)) 
})
/**
 * @definition_type required
 */

export const Optional = <Class = any>(condition?: (ref: Class)=>boolean) => definitionDecoratorFactory<Class>({
    type: FieldDefinitionType.REQUIRED,
    id: 'Optional',
    action: ({value, ref}) => (condition == undefined ? false : !condition(ref)  ) 
})
//#endregion