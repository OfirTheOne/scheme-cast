

import { definitionDecoratorFactory } from "../../../../internal/definition-decorator-factory"

import { objectOwnEveryProperties, objectOwnSomeProperties, objectOwnNoProperties } from "../../../../utils"
import { FieldDefinitionType } from "../../../../models"

import { globals } from '../../../../globals';

const idPrefix = 'Object';

/**
 * @definition_type validate
 */
export const ObjectOwnEveryProperties = (properties: Array<string>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'ObjectOwnEveryProperties'),
    action: ({key, value}) => objectOwnEveryProperties(value, properties)
})


/**
 * @definition_type validate
 */
export const ObjectOwnSomeProperties = (properties: Array<string>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'ObjectOwnSomeProperties'),
    action: ({key, value}) => objectOwnSomeProperties(value, properties)
})


/**
 * @definition_type validate
 */
export const ObjectOwnNoProperties = (properties: Array<string>) => definitionDecoratorFactory({
    type: FieldDefinitionType.VALIDATE,
    id: globals.definition_id_generator(idPrefix, 'ObjectOwnNoProperties'),
    action: ({key, value}) => objectOwnNoProperties(value, properties)
})
