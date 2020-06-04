

TODO: 
* support pass options to definitions 
* create a post transform validation options
* create a Scheme class decorator for passing options



## Example

```ts


import { construct } from '../lib/core/construct'
import { 
    Optional, Required, Transform, Default, 
    ArrayType, BooleanType, ObjectType, StringType, NumberType 
} from '../lib/core'


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
```

```ts
const input = { 
    sku: '100101', name: 'some name', 
    price: 10, category: '5eb1b84063688674dbd9df47', 
    sub_category: '5eb1b84063688674dbd9df47', 
    images_url: ['url'], meta: {}
}
const result01: RequestBody = construct(RequestBody, input)

/*
    // ==== result01 : ====

    {
        "errors": [],
        "value": {
            "sku": "100101",
            "name": "some name",
            "price": 10,
            "category": "5eb1b84063688674dbd9df47",         // ObjectID instance
            "sub_category": "5eb1b84063688674dbd9df47",     // ObjectID instance
            "images_url": [
                "url"
            ],
            "meta": {},
            "active": true
        },
        "rawValue": {
            "sku": "100101",
            "name": "some name",
            "price": 10,
            "category": "5eb1b84063688674dbd9df47",         // typeof string
            "sub_category": "5eb1b84063688674dbd9df47",     // typeof string
            "images_url": [
                "url"
            ],
            "meta": {}
        }
    }
*/

```

```ts

const input = { 
    name: 'some name', 
    price: "10", 
    sub_category: '5eb1b84063688674dbd9df47', 
    images_url: ['url'], 
}
const result02: RequestBody = construct(RequestBody, input)


/*
    // ==== result02 : ====

    {
        "errors": [
            {
                "sku": [
                    {
                        "message": "Error - Required failed, on field : sku."
                    },
                    {
                        "message": "Error - Type:StringType failed, on field : sku."
                    }
                ]
            },
            {
                "price": [
                    {
                        "message": "Error - Type:NumberType failed, on field : price."
                    }
                ]
            },
            {
                "category": [
                    {
                        "message": "Error - Required failed, on field : category."
                    }
                ]
            }
        ],
        "value": {
            "name": "some name",
            "price": "10",
            "sub_category": "5eb1b84063688674dbd9df47",         // ObjectID instance
            "images_url": [
                "url"
            ],
            "active": true
        },
        "rawValue": {
            "name": "some name",
            "price": "10",
            "sub_category": "5eb1b84063688674dbd9df47",         // typeof string
            "images_url": [
                "url"
            ]
        }
    }
*/

```