
import { Class } from 'utility-types';

 



export enum FieldDefinitionType {
    ALIAS = 'alias',
    REQUIRED = 'required',
    DEFAULT = 'default',
    PRE_VALIDATE = 'pre-validate',
    VALIDATE = 'validate',
    PRE_TRANSFORM = 'pre-transform',
    TRANSFORM = 'transform',
    SCHEME_REF = 'scheme-ref',
}


export type DefinitionAction<ReturnType, RefType = any, P extends keyof RefType = keyof RefType> =
    (opts: {key: P, value: RefType[P], ref: RefType}, ...args: Array<any>) => ReturnType




export interface SchemeRefOptions<ClassType> {
    scheme?: boolean,
    arrayOftTypeScheme?: boolean,
    oneOfSchemes?: boolean,
    allSchemes?: boolean,

}

export type SchemeRefAction<ClassType> = {
    scheme: Class<ClassType>,
    options?: { arrayOfTypeScheme: true } 
} | {
    scheme: Array<Class<ClassType>>
    options: ({ oneOfSchemes: true } 
            | { allSchemes: true })
}


export interface TransformTypeOptions {
    preValidationExecute: boolean
}

interface BaseFieldDefinition {
    id: string
    args?: Array<any>
    error?: (_this: FieldDefinition, data: DecoratedFieldData)=> any,
}

export type FieldDefinition<ClassType = any> = BaseFieldDefinition & (
    {
        type : FieldDefinitionType.ALIAS
        action: DefinitionAction<Array<string>, ClassType>,
    } |    
    {
        type : FieldDefinitionType.REQUIRED
        action: DefinitionAction<boolean, ClassType>,
    } |
    {
        type : FieldDefinitionType.DEFAULT
        action: DefinitionAction<any, ClassType>,
    } |
    {
        type : FieldDefinitionType.VALIDATE
        action: DefinitionAction<boolean, ClassType>,
    } |
    {
        type : FieldDefinitionType.TRANSFORM,
        options?: TransformTypeOptions,
        action: DefinitionAction<any, ClassType>,
    } |
    {
        type : FieldDefinitionType.SCHEME_REF
        action: SchemeRefAction<ClassType>,
    }
)











export interface DecoratedFieldData {
    key: string, 
    value: any, 
    // prototype: any
}

export type SchemeDefinitionMap = Map<string, Array<FieldDefinition>>


export interface ConstructResult<T> {

    errors: Array<any>, 
    value: T,
    rawValue: any,
}