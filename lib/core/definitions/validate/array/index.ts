

import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory"

import { arrayOfType, arrayOfLength } from "../../../../utils";

import { FieldDefinitionType } from "../../../../models"

import { globals } from '../../../../globals';

const idPrefix = 'Array';

/**
 * @definition_type validate
 */
export const ArrayOfType = (type: string) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'ArrayOfType'),
    action: ({key, value}) => arrayOfType(value, type)
})



/**
 * @definition_type validate
 */
export const ArrayOfLength = (len: number) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'ArrayOfLength'),
    action: ({key, value}) => arrayOfLength(value, len)
})

