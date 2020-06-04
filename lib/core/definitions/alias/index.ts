import { definitionDecoratorFactory } from "../../../internal/definition-decorator-factory";
import { FieldDefinitionType, DefinitionAction } from "../../../models";

/**
 * @definition_type alias
 */ 
export const Alias = (alias: string|Array<string>) => definitionDecoratorFactory({
    type: FieldDefinitionType.ALIAS,
    id: 'Alias',
    action: () => Array.isArray(alias) ? alias : [alias]
})
