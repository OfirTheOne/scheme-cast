
import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory"

import { FieldDefinitionType, DefinitionAction } from "../../../../models"

import { globals } from '../../../../globals';

const idPrefix = 'Value';

/**
 * @definition_type validate
 */
export const Validate = <ClassType=any>(validate: DefinitionAction<boolean, ClassType>) => definitionDecoratorFactory<ClassType>({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'Validate'),
    action: (d) => (validate ? validate(d) : true)
})


/**
 * @definition_type validate
 */
export const Forbidden = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'Forbidden'),
    action: ({key, value}) => value == null || value == undefined
})
/**
 * @definition_type validate
 */
export const Exists = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'Exists'),

    action: ({key, value}) =>  value != null && value != undefined 
})
/**
 * @definition_type validate
 */
export const Equals = (val: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'Equals'),
    action: ({key, value}) => value == val  
})

/**
 * @definition_type validate
 */
export const EqualsToOneOf = (valList: Array<any>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'EqualsToOneOf'),
    action: ({key, value}) => valList.some(val => value == val)  
})

/**
 * @definition_type validate
 */
export const EqualsStrict = (val: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'EqualsStrict'),
    action: ({key, value}) => value === val  
})

/**
 * @definition_type validate
 */
export const EqualsStrictToOneOf = (valList: Array<any>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'EqualsStrictToOneOf'),
    action: ({key, value}) => valList.some(val => value === val)  
})


/**
 * @definition_type validate
 */
export const NotEquals = (val: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'NotEquals'),
    action: ({key, value}) => value != val  
})

/**
 * @definition_type validate
 */
export const NotEqualsStrict = (val: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'NotEqualsStrict'),
    action: ({key, value}) => value !== val  
})

/**
 * @definition_type validate
 */
export const NotEqualsToEnyOf = (valList: Array<any>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'NotEqualsToEnyOf'),
    action: ({key, value}) => valList.every(val => value != val)  
})


/**
 * @definition_type validate
 */
export const NotEqualsStrictToEnyOf = (valList: Array<any>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'NotEqualsStrictToEnyOf'),
    action: ({key, value}) => valList.some(val => value !== val)  
})
