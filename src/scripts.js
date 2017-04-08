"use strict";

const protectedContentHash = '{{% CONTENT_HASH %}}'

function checkPassword(password, protectedContent) {
  // TODO: Try to decode protected content, and return decrypted content
  // if it succeeded and false if it failed.
}

function initialiseVerifyForm() {
  const $loginButton = $('#login-button');
  const $passwordInput = $('#login-password');
  const inputPassword = $passwordInput.val();

  $.ajax({
    method: 'GET',
    url: 'protected.html',
  }).done(function (data) {
    const protectedContent = data;

    console.log(protectedContent);

    passwordValid = checkPassword(inputPassword, protectedContent);

    console.log(passwordValid ? "Valid" : "Invalid");
  });
}

$(function () {
  initialiseVerifyForm();
});
