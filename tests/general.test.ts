

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
} from '../lib/core'
import { expect } from 'chai';
import ObjectID from 'bson-objectid';

describe('General usage of the core definitions', function() {

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

            @Optional()
            @NumberConvert
            @PositiveIntegerFormat
            max_price: number

            @Optional()
            @NumberConvert
            @PositiveIntegerFormat
            min_price: number
        }

        const result01 = cast(RequestQuery, { skip: '0', limit: '10'})

        expect(result01.errors.length).to.be.eq(0)
        expect(result01.value.skip).to.be.eq(0)
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

    it('should validate the class scheme, complexer definitions.', function() {
        class RequestBody {

            @Required()
            @StringType
            sku: string;

            @Required()
            @StringType
            name: string;

            @Required()
            @NumberType
            price: number;

            @Required()
            @Transform(({value}) => new ObjectID(value))
            category:  ObjectID;

            @Required()
            @Transform(({value}) => new ObjectID(value))
            sub_category: ObjectID;

            @Required()
            @ArrayType
            images_url: Array<string>;

            @Default(true)
            @BooleanType
            active:  boolean;

            @Optional()
            @ObjectType
            meta: any;
        }

        const result01 = cast(RequestBody, 
            { 
                sku: '100101' ,name: 'some name', price: 10, category: '5eb1b84063688674dbd9df47', 
                sub_category: '5eb1b84063688674dbd9df47', images_url: ['url'], meta: {}
            }
        )


        expect(result01.errors.length).to.be.eq(0)
        expect(result01.value.sku).to.be.eq('100101')
        expect(result01.value.active).to.be.true
        expect(result01.value.category).to.be.instanceOf(ObjectID)
        expect(result01.value.sub_category).to.be.instanceOf(ObjectID)


        const result02 = cast(RequestBody, 
            { 
                name: 'some name', price: "10", 
                sub_category: '5eb1b84063688674dbd9df47', images_url: ['url'], 
            }
        )

        expect(result02.errors.length).to.be.eq(3)
        expect(result02.value.sku).to.be.undefined
        expect(result02.value.active).to.be.true
        expect(result02.value.category).to.be.undefined;
        expect(result02.value.sub_category).to.be.instanceOf(ObjectID)

    }) 
    /*

    it('', function() {
        
    }) 
    */
})


/*
describe('ArrayOfSchemeRef usage.', function() {
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

            @Optional()
            @NumberConvert
            @PositiveIntegerFormat
            max_price: number

            @Optional()
            @NumberConvert
            @PositiveIntegerFormat
            min_price: number
        }

        const result01 = construct(RequestQuery, { skip: '0', limit: '10'})

        expect(result01.errors.length).to.be.eq(0)
        expect(result01.value.skip).to.be.eq(0)
        expect(result01.value.limit).to.be.eq(10)


        const result02 = construct(RequestQuery, { limit: '50'})

        expect(result02.errors.length).to.be.eq(0)
        expect(result02.value.skip).to.be.eq(0)
        expect(result02.value.limit).to.be.eq(50)


        const result03 = construct(RequestQuery, { limit: 'hello'})

        expect(result03.errors.length).to.be.eq(1)
        expect(result03.value.skip).to.be.eq(0)
        expect(result03.value.limit).to.be.eq('hello')

    }) 

    it('should validate a scheme array.', function() {
        class Product {

            @Required()
            @StringType
            sku: string;

            @Required()
            @StringType
            name: string;

            @Required()
            @NumberType
            price: number;

            @Required()
            @Transform(({value}) => new ObjectID(value))
            category:  ObjectID;

            @Required()
            @Transform(({value}) => new ObjectID(value))
            sub_category: ObjectID;

            @Required()
            @ArrayType
            images_url: Array<string>;

            @Default(true)
            @BooleanType
            active:  boolean;

            @Optional()
            @ObjectType
            meta: any;
        }

        class RequestBody {
            @ArrayOfSchemeRef(Product)
            items: Array<Product>
        }
        const result01 = cast(RequestBody,
            {
                items: [
                    { 
                        sku: '100101', name: 'some name', price: 10, category: '5eb1b84063688674dbd9df47', 
                        sub_category: '5eb1b84063688674dbd9df47', images_url: ['url'], meta: {}
                    },
                    { 
                        sku: '100102' ,name: 'some name 02', price: 10, category: '5eb1b84063688674dbd9df47', 
                        sub_category: '5eb1b84063688674dbd9df47', images_url: ['url'], meta: {}
                    }
                ] 
            } 
        )

        expect(result01.errors.length).to.be.eq(0)
        expect(result01.value.items.every(item => item.active)).to.be.true
        expect(result01.value.items.every(item => item.category instanceof ObjectID)).to.be.true
        expect(result01.value.items.every(item => item.sub_category instanceof ObjectID)).to.be.true
        
        const result02 = cast(RequestBody, 
            {
                items: [
                    { 
                        sku: '100101', name: 'some name', price: 10, category: '5eb1b84063688674dbd9df47', 
                        images_url: ['url'], meta: {}
                    },
                    { 
                        sku: '100102' ,name: 'some name 02', price: '10', category: '5eb1b84063688674dbd9df47', 
                        images_url: ['url'], meta: {}
                    }
                ] 
            } 
        )

        expect(result02.errors.length).to.be.eq(1)
        expect(result02.errors[0].items.length).to.be.eq(2)
        expect(result02.errors[0].items[0]).to.haveOwnProperty("0")
        expect(result02.errors[0].items[1]).to.haveOwnProperty("1")
        expect(result02.errors[0].items[0]["0"].length).to.be.eq(1)
        expect(result02.errors[0].items[1]["1"].length).to.be.eq(2)

    }) 


    it('', function() {
        
    }) 
})
   */



/*

describe('Not applying transform type if optional & not exists.', function() {

    it('optional transform field should be undefined.', function() {
        class UpdateLabelValue {
  
            @Optional()
            @Transform(({value}) => new ObjectID(value))
            label_value_id?: ObjectID
        
            @Required()
            @StringType
            name: string
        }


        const result01 = cast(UpdateLabelValue, 
            { 
                name: 'some name'
            }
        );

        expect(result01.errors.length).to.be.eq(0);
        expect(result01.value.label_value_id).to.be.undefined;
        expect(result01.value.name).to.be.eq('some name');
    }) 
    /*
    it('', function() {
        
    }) 

    it('', function() {
        
    }) 
})
   */
