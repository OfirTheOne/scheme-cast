
import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory"

import { FieldDefinitionType, DefinitionAction } from "../../../../models"


/**
 * @definition_type validate
 */
export const Validate =  <ClassType=any>(validate: DefinitionAction<boolean, ClassType>) => definitionDecoratorFactory<ClassType>({
    type: FieldDefinitionType.TRANSFORM,
    id: 'Transform',
    action: (d) => (validate ? validate(d) : true)
})


/**
 * @definition_type validate
 */
export const Forbidden = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:Forbidden',
    action: ({key, value}) => value == null || value == undefined
})
/**
 * @definition_type validate
 */
export const Exists = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:Exists',
    action: ({key, value}) =>  value != null && value != undefined 
})
/**
 * @definition_type validate
 */
export const Equals = (val: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:Equals',
    action: ({key, value}) => value == val  
})

/**
 * @definition_type validate
 */
export const EqualsToOneOf = (valList: Array<any>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:EqualsToOneOf',
    action: ({key, value}) => valList.some(val => value == val)  
})

/**
 * @definition_type validate
 */
export const EqualsStrict = (val: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:EqualsStrict',
    action: ({key, value}) => value === val  
})

/**
 * @definition_type validate
 */
export const EqualsStrictToOneOf = (valList: Array<any>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:EqualsStrictToOneOf',
    action: ({key, value}) => valList.some(val => value === val)  
})


/**
 * @definition_type validate
 */
export const NotEquals = (val: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:NotEquals',
    action: ({key, value}) => value != val  
})

/**
 * @definition_type validate
 */
export const NotEqualsStrict = (val: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:NotEqualsStrict',
    action: ({key, value}) => value !== val  
})

/**
 * @definition_type validate
 */
export const NotEqualsToEnyOf = (valList: Array<any>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:NotEqualsToEnyOf',
    action: ({key, value}) => valList.every(val => value != val)  
})


/**
 * @definition_type validate
 */
export const NotEqualsStrictToEnyOf = (valList: Array<any>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Value:NotEqualsStrictToEnyOf',
    action: ({key, value}) => valList.some(val => value !== val)  
})
