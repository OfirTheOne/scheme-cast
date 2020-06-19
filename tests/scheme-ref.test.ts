import { Default, Optional, cast, NumberType, Required, StringType, Validate, SchemeRef } from "../lib/core"
import { expect } from "chai"


describe('SchemeRef usage', function() {


    it('should validate the class scheme with nested SchemeRef.', function() {

        class Person {

            @Required()
            @NumberType
            age: number

            @Required()
            @StringType
            @Validate(({value}) => value.length >= 3)
            name: string
        }

        class RecordRequest {

            @Required()
            @SchemeRef(Person)
            person: Person

            @Optional()
            @Default('hello')
            @StringType
            message: string

        }

        const result01 = cast(RecordRequest, { message: undefined, person: {age: 20, name: 'Bob'} })

        expect(result01.errors.length).to.be.eq(0)
        expect(result01.value.message).to.be.eq('hello')
        expect(result01.value.person.age).to.be.eq(20)
        expect(result01.value.person.name).to.be.eq('Bob')


        const result02 = cast(RecordRequest, { message: undefined, person: {age: 20, name: 'Bb'} })

        expect(result02.errors.length).to.be.eq(1)

    }) 
/*
    it('', function() {
        
    }) 

    it('', function() {
        
    }) 
*/
})

