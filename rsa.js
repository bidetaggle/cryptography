// http://sergematovic.tripod.com/rsa1.html

const colors = require('colors');

colors.setTheme({
    var: ['white', 'bold', 'bgBlack'],
    result: ['white', 'bold', 'underline', 'bgBlack'],
    p: ['blue', 'bold', 'bgBlack'],
    q: ['yellow', 'bold', 'bgBlack'],
    n: ['green', 'bold', 'underline', 'bgBlack'],
    z: ['cyan', 'bold', 'bgBlack'],
    k: ['magenta', 'bold', 'bgBlack'],
    secret: ['red', 'bold', 'bgBlack'],
    message: ['black', 'bgWhite'],
    primeFactor: ['red', 'bold', 'bgBlack'] //obsolete
});

console.log(`Situation: Alice wants to say something to Bob. Only Eve can bring the message to Bob but Alice is sure that Eve will read it, she's too curious and the message is way too important to be disclosed. But Alice knows a way to send something that only Bob could understand: an open mathematic algorythm that acts like a physical mailbox: everyone can drop a mail in the slot, but only whoever has the key can open it and read the content`);

console.log(`\n-- [Bob]: Generating the public and private keys --\n`);

// 2 primes numbers
let p = 3;
let q = 11;
console.log(`[1] Bob pick 2 primes number:`);
console.log(`${`p`.var} = ${p.toString().p}\n${`q`.var} = ${q.toString().q}\n`);

let n = p*q;
let z = (p-1)*(q-1);
console.log(`[2] Bob calculate ${`n`.var} and ${`z`.var}:`);
console.log(`${`n`.var} = ${p.toString().p} * ${q.toString().q} = ${n.toString().n}`);
console.log(`${`z`.var} = (${p.toString().p}-1)*(${q.toString().q}-1) = ${z.toString().z}\n`);

let k;
console.log(`[3] Bob pick a ${`k`.var} among existing co-primes to ${`z`.var} (= ${z.toString().z}):`);

/*
console.log(`   [3.1] Bob find the prime factors of ${z.toString().z}:`);

let zPrimeFactors = [];
console.log(`   ${`z`.var} / i = ?`);
for(let i=2 ; i<z ; i++){
    if(z%i == 0){
        zPrimeFactors.push(i);
        console.log(`   ${z.toString().z} / ${i.toString().primeFactor} = ${z/i}`);
    }
    else
        console.log(`   ${z.toString().z} / ${i} = ${z/i}`);
}
console.log(`   the prime factors of ${`z`.var} (= ${z.toString().z}) are ${zPrimeFactors.toString().primeFactor}`);
*/

let zCoprimeNumbers = [];
console.log(`   [3.1] Bob list the co-prime numbers of ${z.toString().z}:`);
for(let i=2 ; i<z ; i++){
    let primeNumber = true;
    for(let j=2 ; j<i ; j++){
        if(i%j == 0){
            primeNumber = false;
            console.log(`   ${i} /${j} = ${i/j}`);
            break;
        }
    }
    if(primeNumber){
        if(z%i == 0)
            console.log(`   ${i} is a prime number but ${z.toString().z} / ${i} is divisible ( = ${z/i})`);
        else{
            console.log(`   ${i.toString().result} is a coprime number`);
            zCoprimeNumbers.push(i);
        }
    }
}
console.log(`   The coprime numbers to ${`z`.var} (= ${z.toString().z}) are: ${zCoprimeNumbers.toString().result}`);

console.log(`   [3.2] Pick one of the coprime numbers above: `);
k = zCoprimeNumbers[1];
console.log(`   ${`k`.var} = ${k.toString().k}\n`);

console.log(`${`n`.var} = ${n.toString().n} and ${`k`.var} = ${k.toString().k} are the public key\n`);

console.log(`[4] Bob calculate the ${`secret`.var} key:`);
console.log(`   [4.1] Equation:`);
console.log(`   ${`k`.var} * ${`secret`.var} = ${`1`.toString().result} (mod ${`z`.var})`);
console.log(`   ${k.toString().k} * ${`secret`.var} = ${`1`.toString().result} (mod ${z.toString().z})`);

console.log(`   [4.2] Calculation:`);
for(let i=2 ; i<z ; i++){
    console.log(`   (${k.toString().k} * ${(k*i)%z == 1 ? i.toString().secret : i}) = ${k*i} = ${(k*i)%z == 1 ? ((k*i)%z).toString().result : (k*i)%z} (mod ${z.toString().z}) ${(k*i)%z == 1 ? `<--`.toString().result : ''}`);
    if((k*i)%z == 1)
        console.log(`              ...`);
}

console.log(`\n-- [Alice]: Encrypting a message with the public key --\n`);

let message = 14;
console.log(`[1] Alice write her message`);
console.log(`${`message`.var}: ${message.toString().message}\n`);

console.log(`[2] Alice encrypt the message with the public key ${`k`.var}(= ${k.toString().k}) and ${`n`.var}(= ${n.toString().n})`);
console.log(`   [2.1] Equation`);
console.log(`   ${`message`.var} ^ ${`k`.var} = ${`encrypted message`.result} ( mod ${`n`.var} )`);
console.log(`   ${message.toString().message} ^ ${k.toString().k} = ${`encrypted message`.result} ( mod ${n.toString().n} )`);
console.log(`   [2.2] Calculation`);

let encryptedMessage = 1;
for(let i=1 ; i<=k ; i++){
    console.log(`   ${i}: ${message.toString().message} * ${encryptedMessage.toString().message} = ${encryptedMessage*=message}`);
}

let encryptedMessageFinal = encryptedMessage % n;
console.log(`   ${`encrypted message`.var} = ${encryptedMessageFinal.toString().result} --- (${encryptedMessage} - ${encryptedMessageFinal}) / ${n.toString().n} = ${(encryptedMessage - encryptedMessageFinal) / n}`);