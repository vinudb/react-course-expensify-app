//
//Object destructuring
//

const person = {
    name: "Vinay",
    age: 31,
    location:{
        city:"Bangalore",
        temp:20
    }
};

// const name= person.name;
// const age = person.age;

// The above 2 lines is same as below in destructuring
const{ name="Anonymous", age} = person;
console.log(name + age);

const {city, temp: temperature} = person.location;
console.log(`temp in ${city} is ${temperature}`);

const book = {
    title:"ABC",
    author:"VVV",
    publisher:{
        //name: "Mysore printers"
    }
}

const {name: publisherName = "SelfPublished"} = book.publisher;
console.log(publisherName);


//
//Array destructuring
//

const address = ['1299 2nd cross', 'Bangalore', 'Karnataka', '560077'];
const [street, cityyy, state, zip="560001"] = address;
console.log(`You are in ${cityyy} and zip is ${zip}`);

const item = ['coffee (hot)', '2.00', '2.50', '2.70'];
const [menuItem, , medium, ] = item;
console.log(`A medium ${menuItem} costs ${medium}`);