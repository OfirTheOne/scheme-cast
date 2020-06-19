// -- type

import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory"

import { FieldDefinitionType } from "../../../../models"

import { globals } from '../../../../globals';

const idPrefix = 'Type';

/**
 * @definition_type validate
 */
export const StringType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'StringType'),
    action: ({key, value}) => typeof value == 'string'
})
/**
 * @definition_type validate
 */
export const NumberType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'NumberType'),
    action: ({key, value}) => typeof value == 'number'  
})
/**
 * @definition_type validate
 */
export const BooleanType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'BooleanType'),
    action: ({key, value}) => typeof value == 'boolean'  
})
/**
 * @definition_type validate
 */
export const ArrayType = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'ArrayType'),
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
    id: globals.definition_id_generator(idPrefix, 'ObjectType'),
    action: ({key, value}) => typeof value == 'object' && !Array.isArray(value) && value != null  
})
