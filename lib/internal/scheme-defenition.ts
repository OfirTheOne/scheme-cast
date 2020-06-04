
import { Class } from 'utility-types';
import {extractScheme} from './extract-scheme';
import { SchemeDefinitionMap } from './../models';

export function schemeDefinition<T=any>(prototype: any, schemeClass: Class<T>) {

    const map: SchemeDefinitionMap = extractScheme(schemeClass);


    
}