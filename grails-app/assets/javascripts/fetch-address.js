/**
 * Classe para representar o erro de CEP inválido.
 */
class InvalidCEPError extends Error {
  constructor() {
    super("CEP inválido, digite um CEP válido!");
  }
}

/**
 * Classe para representar o erro de endereço não encontrado com base no CEP informado.
 */
class NotFoundCEPError extends Error {
  constructor() {
    super("Endereço não encontrado, digite um CEP existente!");
  }
}

const searchCEPButton = document.getElementById("search-cep-btn");

/**
 *
 * Função para buscar o endereço com base no CEP informado.
 *
 * @param {string} cep - CEP a ser pesquisado.
 * @returns {Promise} Retorna uma Promise com o resultado da busca.
 */
async function fetchAddressByCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);

    if (response.status === 400) {
      throw new InvalidCEPError();
    }

    const json = await response.json();

    if (json.erro || response.status === 204) {
      throw new NotFoundCEPError();
    }

    const { logradouro, localidade, bairro, uf } = json;

    return {
      success: true,
      data: {
        cep,
        uf,
        address: logradouro,
        city: localidade,
        neighborhood: bairro,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: {
        message:
          error.message ||
          "Ocorreu um erro inesperado ao tentar localizar o endereço com base no CEP digitado.",
      },
    };
  }
}

/**
 *  Função para validar o CEP.
 *
 * @param {string} cep - CEP a ser validado.
 * @returns {boolean} Retorna true se o CEP for válido, caso contrário, retorna false.
 *
 */
function validateCEP(cep) {
  return /^[0-9]{8}$/.test(cep);
}

/**
 * Função para preencher os campos de endereço com base nos dados informados.
 *
 * @param {object} data - Objeto contendo os dados do endereço.
 */
function fillAddressFields(data) {
  const elements = document.querySelectorAll(
    "#address-group .form--group .form--input:not(#cep)"
  );

  elements.forEach((e) => (e.value = data[e.id]));
}

/**
 * Função para limpar os campos de endereço.
 */
function clearAddressFields() {
  const elements = document.querySelectorAll(
    "#address-group .form--group .form--input:not(#cep)"
  );

  elements.forEach((e) => (e.value = ""));
}

/**
 * Função para adicionar ou remover o estilo de erro no input.
 *
 * @param {HTMLInputElement} input - Elemento input.
 */
function addErrorInputStyle(input) {
  input.dataset.error = true;
}

/**
 * Função para remover o estilo de erro no input.
 *
 * @param {HTMLInputElement} input - Elemento input.
 */
function removeErrorInputStyle(input) {
  delete input.dataset.error;
}

/**
 * Função para adicionar ou remover a mensagem de erro.
 *
 * @param {HTMLElement} errorElement - Elemento que exibirá a mensagem de erro.
 * @param {string} message - Mensagem de erro.
 */
function addErrorMessage(errorElement, message) {
  errorElement.textContent = message;
}

/**
 * Função para remover a mensagem de erro.
 *
 * @param {HTMLElement} errorElement - Elemento de onde a mensagem de erro será removida.
 */
function removeErrorMessage(errorElement) {
  errorElement.textContent = "";
}

/**
 * Função para lidar com a busca de endereço com base no CEP informado.
 *
 * @param {Event} event - Evento de submissão do formulário.
 */
async function handleAddressSearch(event) {
  event.preventDefault();

  // Pega o irmão seguinte do botão de busca de CEP, que deve ser o input do CEP.
  const cepInput = searchCEPButton.nextElementSibling;

  if (cepInput.tagName !== "INPUT" || cepInput.id !== "cep") {
    throw new Error("O input do CEP não foi encontrado.");
  }

  // Pega o irmão seguinte do pai do botão de busca de CEP, que deve ser o elemento de erro.
  const errorElement = searchCEPButton.parentElement.nextElementSibling;

  if (
    errorElement.tagName !== "SPAN" ||
    !errorElement.className.includes("form--error")
  ) {
    throw new Error("O elemento de erro não foi encontrado.");
  }

  const { value: cep } = cepInput;

  if (!cep) {
    addErrorInputStyle(cepInput);
    addErrorMessage(errorElement, "CEP obrigatório");
    return;
  }

  if (!validateCEP(cep)) {
    addErrorInputStyle(cepInput);
    addErrorMessage(errorElement, "CEP inválido, digite um CEP válido");
    return;
  }

  removeErrorInputStyle(cepInput);
  removeErrorMessage(errorElement);

  // Salvar o ícone de busca do CEP para restaurar após a busca.
  const searchIconSvg = searchCEPButton.children[0].innerHTML;

  const loadingIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  `;

  searchCEPButton.disabled = true;
  searchCEPButton.children[0].innerHTML = loadingIconSvg;

  const { success, data } = await fetchAddressByCep(cep);

  // Aguardar 1 segundo antes de preencher os campos de endereço.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (success) {
    fillAddressFields(data);
  } else {
    addErrorInputStyle(cepInput);
    addErrorMessage(errorElement, data.message);
    clearAddressFields();
  }

  searchCEPButton.disabled = false;
  searchCEPButton.children[0].innerHTML = searchIconSvg;
}

searchCEPButton.addEventListener("click", handleAddressSearch);
