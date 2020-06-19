
import { patterns } from '../../../../consts/regexp'
import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory";

import { FieldDefinitionType } from "../../../../models";

import { globals } from '../../../../globals';

const idPrefix = 'Format';

/**
 * @definition_type validate
 */
export const IntegerFormat = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'IntegerFormat'),
    action: ({key, value}) => typeof value == 'string' &&  Number.isInteger(value as any)
})

/**
 * @definition_type validate
 */
export const NumericFormat = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'NumericFormat'),
    action: ({key, value}) => typeof value == 'string' &&  !isNaN(value as any)
})

/**
 * @definition_type validate
 */
export const PositiveIntegerFormat = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'PositiveIntegerFormat'),
    action: ({key, value}) => (typeof value == 'string' && patterns.positiveInteger.test(value as string))
})

/**
 * @definition_type validate
 */
export const NegativeIntegerFormat = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'NegativeIntegerFormat'),
    action: ({key, value}) => (typeof value == 'string' && patterns.negativeInteger.test(value as string) )
})

/**
 * @definition_type validate
 */
export const BooleanFormat = definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'BooleanFormat'),
    action: ({key, value}) => typeof value == 'string' &&  value == 'true' || value == 'false'
})

/**
 * @definition_type validate
 */
export const MatchRegexp = (regexp: RegExp) =>  definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'MatchRegexp'),
    action: ({key, value}) => (typeof value == 'string' && regexp.test(value as string))
})
