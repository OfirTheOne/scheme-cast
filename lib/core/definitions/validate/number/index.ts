
import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory"

import { FieldDefinitionType } from "../../../../models"

import { globals } from '../../../../globals';

const idPrefix = 'Number';

/**
 * @definition_type validate
 */
export const Lt = (n: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'Lt'),
    action: ({key, value}) => typeof value == 'number' && value < n 
})
/**
 * @definition_type validate
 */
export const Lte = (n: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'Lte'),
    action: ({key, value}) => typeof value == 'number' && value <= n 
})
/**
 * @definition_type validate
 */
export const Gt = (n: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'Gt'),
    action: ({key, value}) => typeof value == 'number' && value > n
})

/**
 * @definition_type validate
 */
export const Gte = (n: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'Gte'),
    action: ({key, value}) => typeof value == 'number' &&  value >= n
})

/**
 * @definition_type validate
 */
export const InRange = (a: number, b: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'InRange'),
    action: ({key, value}) => typeof value == 'number' &&  a <= value  && value <= b 
})
