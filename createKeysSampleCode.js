const crypto = require('crypto')
const fs = require('fs')

function genKeyPair(){
    // gerate object where keys are stored
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits used - standard for RSA (Rivest–Shamir–Adleman) keys
        publicKeyEncoding: {
            type: 'pkcs1', // Public Key Cryptography Standards 1
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // Public Key Cryptography Standards 1
            format: 'pem' // Most common formatting choice
        }
    })

    fs.writeFileSync(`./jwtRS.key.pub`,keyPair.publicKey)
    fs.writeFileSync(`./jwtRS.key`,keyPair.privateKey)
    
}
genKeyPair()