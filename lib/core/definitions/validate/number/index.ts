
import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory"

import { FieldDefinitionType } from "../../../../models"

/**
 * @definition_type validate
 */
export const Lt = (n: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Number:Lt',
    action: ({key, value}) => typeof value == 'number' && value < n 
})
/**
 * @definition_type validate
 */
export const Lte = (n: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Number:Lte',
    action: ({key, value}) => typeof value == 'number' && value <= n 
})
/**
 * @definition_type validate
 */
export const Gt = (n: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Number:Gt',
    action: ({key, value}) => typeof value == 'number' && value > n
})

/**
 * @definition_type validate
 */
export const Gte = (n: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Number:Gte',
    action: ({key, value}) => typeof value == 'number' &&  value >= n
})

/**
 * @definition_type validate
 */
export const InRange = (a: number, b: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: 'Number:InRange',
    action: ({key, value}) => typeof value == 'number' &&  a <= value  && value <= b 
})
