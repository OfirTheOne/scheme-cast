import { overrideDecoratorFactory } from "../../internal/override-decorator-factory"
import { FieldDefinitionType} from './../../models';



export const PreValidateTransform = () => overrideDecoratorFactory(FieldDefinitionType.PRE_VALIDATE, FieldDefinitionType.TRANSFORM)