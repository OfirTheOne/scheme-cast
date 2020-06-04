

import { cast } from '../lib/core/cast'
import { 
    Required, 
    Optional, 
    Default, 
    Transform, 
    NumericFormat, 
    ArrayType, 
    BooleanType, 
    ObjectType, 
    StringType, 
    NumberType,
    PositiveIntegerFormat, 
    NumberConvert, 
    ArrayOfSchemeRef,
    Alias
} from '../lib/core'
import { expect } from 'chai';
import ObjectID from 'bson-objectid';

/*
describe('Alias feature usage', function() {

    it('should validate the class scheme.', function() {

        class RequestQuery {

            @Default(0)
            @NumberConvert
            @NumericFormat
            skip: number


            @Default(10)
            @NumberConvert
            @NumericFormat
            limit: number

            @Alias('max')
            @Optional()
            @NumberConvert
            @PositiveIntegerFormat
            max_price?: number
            max?: number

            @Optional()
            @NumberConvert
            @PositiveIntegerFormat
            min_price: number
        }

        const result01 = cast(RequestQuery, { max: '200', skip: '0', limit: '10'})

        expect(result01.errors.length).to.be.eq(0)
        expect(result01.value.skip).to.be.eq(0)
        expect(result01.value.max).to.be.eq(200)
        expect(result01.value.limit).to.be.eq(10)


        const result02 = cast(RequestQuery, { limit: '50'})

        expect(result02.errors.length).to.be.eq(0)
        expect(result02.value.skip).to.be.eq(0)
        expect(result02.value.limit).to.be.eq(50)


        const result03 = cast(RequestQuery, { limit: 'hello'})

        expect(result03.errors.length).to.be.eq(1)
        expect(result03.value.skip).to.be.eq(0)
        expect(result03.value.limit).to.be.eq('hello')

    }) 


    it('', function() {
        
    }) 
})

*/
