const cepElement = document.getElementById("cep");

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

cepElement.addEventListener("change", loadAddress);
