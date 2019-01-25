const promise = new Promise((resolve, reject)=>{
    setTimeout(() => {
        // resolve({
        //     name:"Vinay",
        //     age: 31
        // });
        reject('something went wrong!');
    }, 5000);
});

console.log('Before');

promise.then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.log(error);
});

console.log('After');