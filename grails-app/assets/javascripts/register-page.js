const cepElement = document.getElementById("cep");
const fields = document.querySelectorAll(".form--input");
const form = document.getElementById("form");

const errorMessages = {
  name: {
    required: "O nome é obrigatório",
  },
  cpf: {
    required: "O CPF é obrigatório",
  },
  email: {
    required: "O email é obrigatório",
  },
  phone: {
    required: "O telefone é obrigatório",
  },
  cep: {
    required: "O CEP é obrigatório",
  },
  address: {
    required: "O endereço é obrigatório",
  },
  bairro: {
    required: "O bairro é obrigatório",
  },
  city: {
    required: "A cidade é obrigatória",
  },
  uf: {
    required: "O estado é obrigatório",
  },
};

const toastTypes = new Set(["error", "success"]);

function renderToast(message, type, id, timeInSeconds = 10) {
  const idAlreadyExists = document.getElementById(id);

  if (idAlreadyExists) {
    throw new Error("Este id já está em uso, tente outro!");
  }

  if (!toastTypes.has(type)) {
    throw new Error("Tipo de toast inválido");
  }

  if (!message) {
    throw new Error("A mensagem não pode ser vazia!");
  }

  const toast = document.createElement("div");
  toast.dataset.type = type;
  toast.classList.add("toast");
  toast.id = id;

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("toast--close");
  closeBtn.textContent = "x";

  const content = document.createElement("p");
  content.textContent = message;
  content.classList.add("toast--content");

  toast.appendChild(closeBtn);
  toast.appendChild(content);

  document.body.appendChild(toast);

  const unrenderTimeout = setTimeout(
    () => unrenderToast(id),
    timeInSeconds * 1000
  );

  closeBtn.addEventListener("click", () => {
    unrenderToast(id);
    clearTimeout(unrenderTimeout);
  });
}

function unrenderToast(id) {
  const toast = document.getElementById(id);

  if (!toast) {
    throw new Error("Este toast não foi encontrado");
  }

  toast.remove();
}

function validateRequiredField(field) {
  const fieldError = document.querySelector(`#${field.id} + .form--error`);

  if (!field.value) {
    field.dataset.error = true;
    fieldError.textContent = errorMessages[field.id].required;
    return false;
  } else {
    delete field.dataset.error;
    fieldError.textContent = "";
    return true;
  }
}

async function loadAddress(event) {
  event.preventDefault();

  const { value } = event.target;

  const elements = document.querySelectorAll(
    "#address-group .form--group .form--input"
  );

  if (!value || value.length > 8) {
    event.target.dataset.error = true;
    return;
  }

  delete event.target.dataset.error;

  const response = await fetch(`https://viacep.com.br/ws/${value}/json`);
  const json = await response.json();

  const data = {
    cep: json.cep,
    address: json.logradouro,
    city: json.localidade,
    bairro: json.bairro,
    uf: json.uf,
  };

  elements.forEach((e) => (e.value = data[e.id]));
}

function onSubmit(event) {
  event.preventDefault();

  let formIsValid = true;

  for (const field of fields) {
    if (!validateRequiredField(field)) {
      formIsValid = false;
    }
  }

  if (!formIsValid) return;

  const formData = new FormData(event.target);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  console.log(data);

  renderToast(
    "Formulário enviado com sucesso!",
    "success",
    "submit-form-toast",
    5
  );
}

form.addEventListener("submit", onSubmit);

cepElement.addEventListener("change", loadAddress);

fields.forEach((field) =>
  field.addEventListener("change", (event) =>
    validateRequiredField(event.target)
  )
);
