import { supabase } from "./pibss-common.js";

const loginButton = document.querySelector('.login-form button')
loginButton.addEventListener('click', getLoginDetails)

function getLoginDetails() {
  const emailInput = document.getElementById('email')
  const pwInput = document.getElementById('pw')
  const emailAddress = emailInput.value
  const pw = pwInput.value
  if (emailAddress !== '' && pw !== '') {
    signIn(emailAddress, pw)
  } else {
    alert('Please input login details!')
  }
}

async function signIn(emailAddress, pw) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailAddress,
    password: pw,
  })
  if (error) {
    console.error(error)
    alert('Incorrect login details!')
  } else {
    window.location.href = '/pibss/manage/'
  }
}