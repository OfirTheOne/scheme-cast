

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
import { PreValidateTransform } from '../lib/common/execution-stage'
import { expect } from 'chai';
import ObjectID from 'bson-objectid';


describe('ArrayOfSchemeRef usage.', function() {

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
    /*

    it('', function() {
        
    }) 
    */
})





