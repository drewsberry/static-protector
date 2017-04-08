const fs = require("fs");

const lib = require("./src/lib.js");

const password = "test_password";

fs.readFile("src/protected.html", "utf-8", protectContent);

function protectContent(readError, content) {
  if (readError) {
    console.error(readError);
  }

  console.log(content);

  const encryptedString = lib.encryptString(content, password);
  fs.writeFile("output/encrypted.html", encryptedString, function (writeError) {
    if (writeError) {
      console.error(writeError);
    }

    console.log("Successfully saved protected content.");
  });

  //const salt = lib.generateSalt();
  //console.log("Salt is:", salt);

  // Generate HMAC of encrypted string using *same password* as encryption
  // to verify password is correct/incorrect on decryption on other side.
  const hmac = lib.hmacString(encryptedString, password);
  console.log("HMAC content:", hmac);

  fs.readFile("src/login.html", "utf-8", function (error, loginHtml) {
    replacedHtml = loginHtml.replace("{{% AUTHENTICATION_CODE %}}", hmac);

    console.log(replacedHtml);

    fs.writeFile("output/index.html", replacedHtml, function (writeError) {
       if (writeError) {
          console.error(writeError);
       }

       console.log("Successfully generated login HTML.");
    });
  });

  fs.createReadStream("src/lib.js").pipe(fs.createWriteStream("output/lib.js"));
}
