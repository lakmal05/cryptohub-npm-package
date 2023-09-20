# CryptoHub

`CryptoHub is a JavaScript library that provides functionality for generating crypto IDs and encrypting/decrypting data using ASCII encoding algorithm`

# Installation

`npm i cryptohub`

# Usage

`node`

```js

import {cryptyoId} from `cryptohub`// Genrate a crypto Id
import {encryptdata} from `cryptohub`// Encrypt data using ASCII encoding algorithm
import {decryptdata} from `cryptohub`// Decrypt data what encrypted

```

# Create a Crypto ID

```js
const myId = cryptyoId(); //2K0w270o2t5C7e9Q3

`or you can define a length`;

const myId = cryptyoId(6); //define your length
```

# Encrypt & Decrypt data

```js
const myEncryptedData = encryptdata("token", "secretKey");
//0000006c000000610000006b0000006d000000610000006c

`also you can decrypt your encrypted data`;

const myDecryptedData = decryptdata(myEncryptedData); //token
```

# Hash Your data

```js
const myHashedData=hashdata("data")





# Contribute

If you would like to contribute, you are welcome
