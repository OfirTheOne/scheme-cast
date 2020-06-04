import { definitionDecoratorFactory } from "../../../internal/definition-decorator-factory";
import { FieldDefinitionType, DefinitionAction } from "../../../models";

/**
 * @definition_type default
 */ 
export const Default = (defaultValue: any) => definitionDecoratorFactory({
    type: FieldDefinitionType.DEFAULT,
    id: 'Default',
    action: () => defaultValue
})


/**
 * @definition_type default
 */ 
export const GenerateDefault = <ClassType>(defaultValueGenerate: DefinitionAction<ClassType>) => definitionDecoratorFactory<ClassType>({
    type: FieldDefinitionType.DEFAULT,
    id: 'Default',
    action: (d) => defaultValueGenerate ? defaultValueGenerate(d) : undefined
})

