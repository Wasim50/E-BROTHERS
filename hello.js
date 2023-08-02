// // let  a= 10;
// // let b=a;
// //  b=20
// // console.log(b);
// // console.log(a);

const { func, array, date, number, symbol, x, object } = require("joi");
const { promises } = require("nodemailer/lib/xoauth2");
const { json } = require("sequelize");

// let emp = [{a:10},{b:20},{c:30}];
// // let test = emp



// // console.log(test)
// // console.log(emp)


//  let test = [...emp];
//  test[1]={b:15}
// console.log(test[1])
// console.log(emp)

//for parseInt
// let alpha =["877hfjr","5345"];
// let abc = parseInt(alpha[0]);
// console.log(abc);

// let beta = {a:"77dhkgs",b:"29.8djuis"};
// // let def = parseInt(beta.b);
// // console.log(def)

// //for json.stringify.
// // console.log(JSON.stringify({ x: 5, y: 6 }));
// // console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));

// // console.log(JSON.stringify(["sggffd",64,true]))

// function addition(p1, p2, cb) {
//     let result = p1 + p2;
//     // console.log(cb);
//     cb(result);
// }
// addition(10, 20, (data) => {
// console.log(data)
// });

// function multiply(p1,cb){
//     setTimeout(()=>{

//     },1000)
// }


// function highest(list,cb){
//     let high=0;
//     for(let i of list){
//         if(high<=i){
//             high=i;
//         }
//     }
//     cb(high)
// }
// highest([10,20,30],(data)=>{
//     console.log(data)
// });

function lowest(list,cb){
    let low=list[0];
    for(let i in list){
        if(low>=list[i]){
            low=list[i];
        }
    }
    cb(low);
}
// lowest([25,73,92,5],(data)=>{
//     console.log(data)
// });

// function add(p1,p2,cb){
//     setTimeout(()=>{
//         let sum = p1+p2;
//         cb(sum);
//         console.log("zainy")
//     },1000)
// }
// add(25,25,(data)=>{

//     console.log(data);
// //     // console.log("zain");
// // })

// function add(p1,p2,cb){
//     let sum = p1+p2;
//     cb(sum)
// }
// add(2,3,(data)=>{
// console.log(data)
// })

// // let arraySpare = [1,5,9];
// // arraySpare.forEach((elemet)=>{
// //     console.log(elemet)
// // });

// let arraySpa = [3,9,6];
// let numcallback = 0;
// arraySpa.forEach((elemet)=>{
//     console.log(elemet)
//     numcallback++;

// });
// console.log(numcallback)
//array map function .
let person = [{ firstName: "wasim", lastName: "shaikh" },
{ firstName: "Shadab", lastName: "momin" },
{ firstName: "zain", lastName: "shaikh" }];
person.map((index, value, Array) => {
    // console.log(index,value.Array)
    // return value
});

// //array filter function .

// let arr = [21, 26, 6, 18, 7, 17]
// let a2 = arr.filter((h) => {
//     // return h>20
//     return h < 20
// });
// // console.log(a2,arr)

// //array reduce function

// let arr1 = [2, 5, 7, 8, 9];
// let a3 = arr1.reduce((e1, e2) => {
//     return e1 ** e2;
// })
// // console.log(a3,arr1)

// //callback to promise .
function addition(p1, p2, cb) {
    let sum = p1 + p2;
    cb(sum);
}

function additionAsync(p1, p2) {
    return new Promise((res, rej) => {
        addition(p1, p2, (data) => {
            res(data)
        });
    });
}
// additionAsync(10, 20).then((data) => { console.log(data) })
//     .catch((error) => { console.log(error) });

//highest number callback to promise
function high(list, cb) {
    let highest = 0;
    for (let i of list) {
        if (highest <= i) {
            highest = i
        }
    }
    cb(highest)
}
// high([10, 15, 25, 18], (data) => { console.log(data) })

function highest(list,cb){
    let high = list[0];
    for(let i in list){
        if(high<=list[i]){
            high=list[i]
        }
    }
    cb(high)
}
// highest([10000,20000,25000,5000],(data)=>{console.log(data)})


async function highestAsync(list){
    return new Promise((res,rej)=>{
        highest(list,(data)=>{
            res(data)
        })
    })
}
// highestAsync([12,8,3,0]).then((data)=>{console.log(data)}).catch((error)=>{console.log(error)})

function highAsync(list ) {
    return new Promise((res, rej) => {
        high(list, (data) => {
            res(data)
        });
    });
}
// highAsync([20, 75, 56, 92]).then((data) => { console.log(data) }) 
//     .catch((error) => { console.log(error) })

//lowest number callback to promise
function low(list, cb) {
    let lowest = list[0];
    for (let i of list) {
        if (lowest >= i) {
            lowest = i
        }
    }
    cb(lowest)
}
// low([12, 32, 10, 5], (data) => { console.log(data) })

function lowAsync(list) {
    return new Promise((res, rej) => {
        low(list, (data) => {
            res(data)
        });
    });
}
// lowAsync([10, 9, 28, 9,7]).then((data) => { console.log(data) })
//     .catch((error) => { console.log(error) })

//patterns 

let n = 6;
let string = "";
for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
        string += i;
    }
    string += "\n";
}
// console.log(string)

let num = 5

let display = "";

for (let i = 1; i <= 5; i++) {
    for (let j = 0; j <= i; j++) {
        display = display + j + "#"

    }
    display = display + "\n"

}

// console.log(display);

// let i=1;
// while(i<3){
//     console.log(i);
//     i++;
// }
//for even number
for (let i = 0; i <= 10; ++i) {
    if (i % 2 == 0) {
        // console.log(i)
    }
}
//for odd number 
for (let i = 0; i <= 15; i++) {
    if (i % 2) {
        // console.log(i)
    }
}
//for prime number 
// let m=10;
// for(let i=2;i<=m;i++){
//     for(let j=2;j<i;j++){
//         if(1%j==0)
//     }
//     // console.log(i)
// // }
// "use strict";
// let _ = "zain"
// let $ = 234
// numb = 7208951797;
// // console.log(numb);


// let getde = 4 > 1;
// console.log(getde)

// let age = null;
// console.log(age)

// let age1 = undefined;
// age1 = 100;
// console.log(age1)

// console.log(typeof (Array))

// let jsonn = "{ bad json }";

// try {

//     let user = JSON.parse(jsonn); // <-- when an error occurs...
//     alert(user.name); // doesn't work

// } catch (err) {
//     // ...the execution jumps here
//     console.log("Our apologies, the data has errors, we'll try to request it one more time.");
//     console.log(err.name);
//     console.log(err.message);
// }

function mul(p2, p3, cb) {
    let result = p2 * p3;
    cb(result)
}

function mulAsync(c1, c2) {
    return new Promise((res, rej) => {
        mul(c1, c2, (data) => {
            res(data)
        })
    })
}
// mulAsync(10, 20).then((data) => { console.log(data) })
//     .catch((error) => { console.log(error) })

let cors = require("cors");
let express = require("express");
const { compareSync } = require("bcrypt");
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: (origin, cb) => {
        if (origin != "abc") {
            return cb("not allow", false)
        }
        return cb(null, true)
    }
}));

// app.get("/about/",(req,res)=>{res.send("hello")});
// app.listen(3001,()=>{console.log("done")});

let a = 5 && 6

// console.log(a)

let str = "lets have some fun "
// console.log(str.charAt(10))
// console.log(str.indexOf("world"))

let srt = "    with old friend    "
// console.log(srt.trim())
// console.log(str.concat( srt))
// console.log(srt.substr(4,6))

// console.log(srt.replace("old","new"))

srt.valueOf();

let r = 2
r**=3
console.log(r)

let test1 = "A";
let test2 = "B";
let result = test1>test2
// console.log(result)

let v = 5;
let af = "";

for(let i=1;i<=v;i++){
    for(let j=1;j<=i;j++){
        af = af + j;
    }
    af = af+"\n";
}
// console.log(af)

let s = 5;
let staf = "";

for(let i=1;i<=5;i++){
    for(let j=1;j<=i;j++){
        staf += i;
    }
    staf += "\n"
}
// console.log(staf)

let multer = require("multer");
const { raw } = require("mysql2");

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/upload")
    },
    fileName:function(req,file,cb){
        let unique = Date.now()+"-"+Math.round(Math.random()*1E9);
        let ext = file.origialname.splite(".");
        cb(null,file.fildname + "-" + ext[ext.length-1])

    }
})

let myArray = "asdfgh,sdfghjk";
let ac = myArray.split(",").pop()
// console.log(ac);

let sum =function(a=10,b=20){
     return a+b;
}

// console.log(sum())

let fruit = ['apple','orange'];
let [m,b]=fruit
// console.log(m,b)

let student = {name:"zain",age:23}
let {name,age}=student;
// console.log(name,age)

function mobile(name,model,year){
    return {
        name,
    model,year
    }
}
// console.log(mobile("nokia","N73",2000))

class car{
    constructor(name,model,year){
        this.name=name;
    this.model=model;
    this.year=2000
    }
    

    

}
// console.log(Array.from("abcdefghijkl"))

let u = 5;
let play = "";

// for(let i=1;i<=u;i++){
//     for(let j=1;j<=u-i;j++){
//         play += " "
//     }
//     for(k=0;k<2*i-1;k++){
//         play += "*"
//     }
//     play += "\n"
// }
// console.log(play)

for(let i=0 ;i<u;i++){
    for(let j=0;j<i;j++){
        play += " "
    }
    for(let k=0;k<2*(n-i)-1;k++){
        play += "*"
    }
    play += "\n"
}
// console.log(play)

let word = "wellcome"
let c;

for(let i=0;i<=word.length-1;i++){
    c=word[i]
    if(c=="a"||c=="e"||c=="i"||c=="o"||c=="u"||c=="A"||c=="E"||c=="I"||c=="O"||c=="U"){
        // console.log(c)
    }
}


let h = 5;
let space = "";

for(let i=1;i<=h;i--){
    for(let j=1;j<=h-i;j++){
        space += " "
    }
}
for(let k=1;k<=i;k++){
    space += "*"
}
space += "\n"