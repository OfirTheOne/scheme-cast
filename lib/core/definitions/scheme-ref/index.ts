
import { definitionDecoratorFactory } from "../../../internal/definition-decorator-factory";
import { FieldDefinitionType } from "../../../models";
import { Class } from "utility-types";


export const SchemeRef = <T = any>(schemeClass: Class<T>) =>  definitionDecoratorFactory({
    type: FieldDefinitionType.SCHEME_REF,
    id: 'Scheme:SchemeRef',
    action:  {
        scheme: schemeClass,
    }
})


export const ArrayOfSchemeRef = <T = any>(schemeClass: Class<T>) =>  definitionDecoratorFactory({
    type: FieldDefinitionType.SCHEME_REF,
    id: 'Scheme:ArrayOfSchemeRef',
    action:  {
        scheme: schemeClass,
        options: {
            arrayOfTypeScheme: true
        }
    }
})