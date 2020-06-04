// -- type

import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory"

import { FieldDefinitionType } from "../../../../models"

/**
 * @definition_type validate
 */
export const StringType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Type:StringType',
    action: ({key, value}) => typeof value == 'string'
})
/**
 * @definition_type validate
 */
export const NumberType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Type:NumberType',
    action: ({key, value}) => typeof value == 'number'  
})
/**
 * @definition_type validate
 */
export const BooleanType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Type:BooleanType',
    action: ({key, value}) => typeof value == 'boolean'  
})
/**
 * @definition_type validate
 */
export const ArrayType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Type:ArrayType',
    action: ({key, value}) => Array.isArray(value)  
})

/**
 * @definition_type validate
 * @logic @example
 * 
 *  typeof value == 'object' && !Array.isArray(value) && value != null  
 */
export const ObjectType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Type:ArrayType',
    action: ({key, value}) => typeof value == 'object' && !Array.isArray(value) && value != null  
})
