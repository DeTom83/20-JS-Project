/* console.log("It's work!!!"); */
const form = document.getElementById('form');
const uname = document.getElementById('uname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Show Success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//Email check
function isVaildEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//Check function version 1
function checkRequired(input) {
  if (input.value.trim() === '') {
    showError(input, `${input.name} is required!`);
  } /* else if (input.value.length < 4) {
    showError(input, `${input.name} is too short!`);
  } */ else if (input.id === 'email') {
    if (!isVaildEmail(input.value)) {
      showError(email, 'Email is not valid');
    }
  } else {
    showSuccess(input);
  }
}

//Check function version 2
function checkRequired2(inputArr) {
  inputArr.forEach(function (input) {
    checkRequired(input);
  });
}

//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.name} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.name} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

//Check password mach
function checkPasswordMach(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, 'Passwords do not match');
  }
}

//Event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  /*   //Check Request version 1
  checkRequired(uname);
  checkRequired(email);
  checkRequired(password);
  checkRequired(cpassword); */

  //Check Request version 2
  checkRequired2([uname, email, password, cpassword]);

  checkLength(uname, 4, 15);
  checkLength(password, 4, 10);
  checkLength(cpassword, 4, 10);
  checkPasswordMach(password, cpassword);

  //Check version 0
  /* //Username check
  if (uname.value === '') {
    showError(uname, 'Username is required!');
  } else if (uname.value.length < 4) {
    showError(uname, 'Username is too short!');
  } else {
    showSuccess(uname);
  }

  //Email check
  if (email.value === '') {
    showError(email, 'Email is required!');
  } else if (!isVaildEmail(email.value)) {
    showError(email, 'Email is wrong!');
  } else {
    showSuccess(email);
  }

  //Password check
  if (password.value === '') {
    showError(password, 'Password is required!');
  } else if (password.value.length < 4) {
    showError(password, 'Password is too short!');
  } else {
    showSuccess(password);
  }

  //Confirm Password check
  if (cpassword.value === '') {
    showError(cpassword, 'Password is required!');
  } else if (cpassword.value !== password.value) {
    showError(cpassword, 'Password is different!');
  } else {
    showSuccess(cpassword);
  } */
});
