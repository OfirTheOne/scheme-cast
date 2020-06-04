// import './../lib/internal/validator-factory'

import { StringType, Required, Optional, Default, NumericFormat, NumberConvert, NumberType, ArrayType } from "../lib/core";
import { cast } from "../lib/core/cast";


import { SchemeRef } from '../lib/core';


class SubScheme {
	@Required()
	@NumberType
	num: number;

	@Required()
	@ArrayType
	list: Array<any>;
}

class Example {

	@StringType
	myString: string;

	@Required()
	@StringType
	@NumericFormat
	@NumberConvert
	importantValue: number;

	@SchemeRef(SubScheme)
	obj: SubScheme

	@Default("a default value")
	@Optional<Example>(({ myString }) => (myString?.length > 3))
	optionalIfMyStringLarger3: string;
}



const { errors, value, rawValue } = cast(Example, { myString: 'so', importantValue: "22", obj: { list: [] } });

console.log(JSON.stringify({ errors, value }, undefined, 2));
/*


{
  "errors": [
    {
      "obj": [
        {
          "obj": [
            {
              "num": [
                {},
                {}
              ]
            }
          ]
        }
      ]
    },
    {
      "optionalIfMyStringLarger3": [
        {}
      ]
    }
  ],
  "value": {
    "myString": "so",
    "importantValue": 22,
    "obj": {
      "list": []
    }
  }
}

*/