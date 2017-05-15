# Static Protector

This repository contains the code for a system to allow password-only access to HTML document(s) that are hosted statically on a service such as GitHub pages, where traditional (and significantly easier) methods of protecting content involving server-side validation are not available.

## How does it work?

There is a build script that encrypts the document(s) using AES-256 and calculates the HMAC-SHA256 of the resulting encrypted content, both using a password specified at build time. A login page then checks the integrity of the ciphertext using a user input password. If the validity is confirmed, this means that the password is correct and the decryption of the encrypted content can go ahead. The resulting decrypted HTML can simply be appended to the DOM. This all utilises the CryptoJS library.

### Why HMAC the encrypted content instead of the original content?

Calculating the HMAC of the unencrypted content leaves you open to some chosen ciphertext attacks against the content. Calculating the HMAC of the encrypted content still allows you to verify that the provided password is correct before actually trying to encrypt it, but doesn't reveal anything about the original plaintext in the process. See [this crypto.stackexchange post](http://crypto.stackexchange.com/a/205) for more information.

## Testing

When you're testing a build, either local or remote, you can use BrowserStack to spin up a VM for any platform or browser and test it out, with debugging:

[![Start BrowserStack Testing](https://digitalscientists.com/system/images/1448/original/logo-browserstack.png "Start BrowserStack Testing")](https://www.browserstack.com/start)

## TODO:

* Allow multiple documents to be protected.
* Clean up all the unused code in `lib.js`.
* Add CSS for login page (and allow for users to add their own custom CSS too).
* Add documentation for how to use and how to customise.
