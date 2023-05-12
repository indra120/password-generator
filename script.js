const $ = (selector) => document.querySelector(selector),
  character = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()_+=",
  },
  { floor, random } = Math,
  getCharacter = Object.values(character).map(
    (value) => () => value[floor(random() * value.length)]
  );

function generatePassword() {
  const len = $("#len").value;
  let password = "";

  Object.keys(character).forEach(
    (key, i) => $(`#${key}`).checked && (password += getCharacter[i]())
  );

  for (let i = password.length; i < len; i++) {
    password += generateX();
  }

  $("#pw").innerText = password;
}

function generateX() {
  const xs = [];

  Object.keys(character).forEach(
    (key, i) => $(`#${key}`).checked && xs.push(getCharacter[i]())
  );

  if (xs.length === 0) return "";

  return xs[floor(random() * xs.length)];
}

$("#generate").onclick = generatePassword;

$("#copy").onclick = () => {
  const textarea = document.createElement("textarea");
  const password = $("#pw").innerText;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
};
