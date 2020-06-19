


# Scheme Cast 

The goal is - putting some brain in the simple action of object to class casting. <br>

`scheme-cast` is a mechanism that allow building a costume object-to-class cast process with a simple class definition combined with class-property decorators helpers. <br>

The motivation developing this module is to abstract the validation & parsing process in to a more convenient process we'll call "cast", additionally by embedding the cast (validation & parsing) process in to the class definition we avoid redundancies.

## An inside view of the core :  

The decoration (referred as "Definition") used in a class are stored in a Definition-Map object, and by calling `cast` method with the class `C` and an object `O`, the map is extracted from the class `C`'s metadata and applied on object `O`.     

<br>

The Declaration (from now referred as 'definition') are divide into several types (a `DefinitionType`) :

* 'required'
* 'default'
* 'transform-pre-validate'
* 'validate'
* 'scheme-ref'
* 'transform'


The main components of a Definition are its `DefinitionType` and `DefinitionAction` (a function holding the logic behind the definition).

// (mention somewhere) the action resolved value used in a different ways, depending on the definition type 

Executing the `cast` method, apply each definition on the property it's decorating, in most cases more then one definition will be used on a property, and probably with different types, for example :

```ts
class User {

    @Required()     // DefinitionType : 'required'
    @StringType     // DefinitionType : 'validate'
    name: string;

    @Required()     // DefinitionType : 'required'
    @NumberType     // DefinitionType : 'validate'
    age: number;
}

```

The type of the definition determent the order it will be applied in relation to other definitions (on the same property).
the order of applying is :
1. 'required'
2. 'default'
3. 'transform-pre-validate'
4. 'validate'
5. 'scheme-ref'
6. 'transform'

The `cast` method will apply the definitions of each property individually, in a *stateful loop*, 'stateful' in the sense that previous definition execution on a properly can effect the way the next will be executed (this concept is crucial to understanding the behavior of the `cast` method). 
An example fo a stateful effect is a 'default' type definition used with a 'required' type definition ;

```ts
class User {

    @Required()     
    @Default('Bob')     
    name: string;
}

```

In the following example, the `name` property of a user defined as 'required', therefor the value passed to 'default' type definition will be ignored (even in case no value provided to `name` property). 
<br>

A second (and important) stateful effect, is a 'validate' type definition used with a 'transform' type definition, as intuition suggest, any 'transform' type definition will be applied on a property if all 'validate' type definitions on that property will be resolved.

```ts
class User {

    @Required()     
    @Validate(({value}) =>  /* at least 8 chars */)
    @Validate(({value}) =>  /* contain capital */)
    @Validate(({value}) =>  /* contain lower */)
    @Validate(({value}) =>  /* contain special char */)
    @Transform(({value}) => /* cal sync-hash on the plain pass */)
    
    pass: string;
}

```
In the following example, only if all the 'validate' type definition will be resolved the 'transform' type definition will be applied on the `pass` property.


<br>
<hr>
<br>
<br>

TODO: 
* support pass options to definitions 
* create a post transform validation options - √
* create a Scheme class decorator for passing options

<br>
<br>
<hr>
<br>

## Example

```ts


import { cast } from '../lib/core/cast'
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
const result01: RequestBody = cast(RequestBody, input)

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
const result02: RequestBody = cast(RequestBody, input)


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