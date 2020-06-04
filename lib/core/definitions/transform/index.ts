import { definitionDecoratorFactory } from "../../../internal/definition-decorator-factory";
import { FieldDefinitionType, DefinitionAction, TransformTypeOptions } from "../../../models";


/**
 * @definition_type transform
 */
export const Transform =  <ClassType=any>(defAction: DefinitionAction<any, ClassType>) => definitionDecoratorFactory<ClassType>({
    type: FieldDefinitionType.TRANSFORM,
    error: (f, d) => ({ message: `Error - ${f.id} failed, on field : ${d.key}.`}),
    id: 'Transform',
    action: (d) => (defAction ? defAction(d) : true)
})

/**
 * @definition_type transform
 */
export const NumberConvert =  definitionDecoratorFactory({
    type: FieldDefinitionType.TRANSFORM,
    error: (f, d) => ({ message: `Error - ${f.id} failed, on field : ${d.key}.`}),
    id: 'Convert:NumberConvert',
    action: (({value}) => Number(value))
})
/**
 * @definition_type transform
 */
export const BooleanConvert = definitionDecoratorFactory({
    type: FieldDefinitionType.TRANSFORM,
    id: 'Convert:BooleanConvert',
    action: (({value}) => Boolean(value))
})
/**
 * @definition_type transform
 */
export const Convert = (convertor: (value)=> any) => definitionDecoratorFactory({
    type: FieldDefinitionType.TRANSFORM,
    id: 'Convert:BooleanConvert',
    action: (({value}) => convertor(value))
})
//#endregion

