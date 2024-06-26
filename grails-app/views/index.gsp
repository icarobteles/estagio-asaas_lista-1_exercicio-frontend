<!doctype html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Página de Cadastro | Estágio Asaas</title>

    <asset:stylesheet src="styles.css"/>
</head>
<body>
    <header class="header">
        <img class="header--logo" src="https://www.asaas.com/assets/logo/asaas-white-9550c17869d72a570a577c70c6c6789b.svg" alt="Logomarca Asaas" title="Asaas Gestão Financeira">
    </header>

    <div class="container">

        <main>
            <h1 class="title">Cadastro</h1>

            <% if (flash.submitted) { %>
                <div class="toast" data-type=${flash.submitStatus} id="register-user-toast">
                    <button type="button" class="toast--close">x</button>
                    <p class="toast--content">${flash.submitMessage}</p>
                </div>
                <script>
                    const toastCloseBtn = document.querySelector("#register-user-toast > .toast--close");
                    toastCloseBtn.addEventListener("click", (event) => event.target.parentElement.remove());
                </script>
            <% } %>

            <form class="form" id="form" action="/registerUser/save" metho="POST" >

                <fieldset class="form--fieldset" id="identify-group">
                    <legend class="form--legend">Identificação</legend>

                    <div class="form--group">
                        <label class="form--label" for="name">Nome Completo</label>
                        <input class="form--input" type="text" name="name" id="name" />
                        <span class="form--error"></span>
                    </div>

                    <div class="form--group">
                        <label class="form--label" for="cpf">CPF</label>
                        <input class="form--input" type="text" name="cpf" id="cpf" />
                        <span class="form--error"></span>
                    </div>
                </fieldset>

                <fieldset class="form--fieldset" id="contact-group">
                    <legend class="form--legend">Contato</legend>
                    <div class="form--group">
                        <label class="form--label" for="email">Email</label>
                        <input class="form--input" type="email" name="email" id="email" />
                        <span class="form--error"></span>
                    </div>
                    <div class="form--group">
                        <label class="form--label" for="phone">Telefone</label>
                        <input class="form--input" type="tel" name="phone" id="phone" />
                        <span class="form--error"></span>
                    </div>
                </fieldset>

                <fieldset class="form--fieldset" id="address-group">
                    <legend class="form--legend">Endereço</legend>

                    <div class="form--group form--group__cep">
                        <label class="form--label" for="cep">CEP</label>
                        <div>
                            <button id="search-cep-btn" class="form--search-cep" type="button" title="Pesquisar Endereço">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0030b9"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </i>
                            </button>
                            <input class="form--input" type="text" name="cep" id="cep" />
                        </div>
                        <span class="form--error"></span>
                    </div>

                    <div class="form--group">
                        <label class="form--label" for="address">Endereço</label>
                        <input
                            class="form--input"
                            type="text"
                            name="address"
                            id="address"
                            
                        />
                        <span class="form--error"></span>
                    </div>

                    <div class="form--group">
                        <label class="form--label" for="neighborhood">Bairro</label>
                        <input
                            class="form--input"
                            type="text"
                            name="neighborhood"
                            id="neighborhood"
                            
                        />
                        <span class="form--error"></span>
                    </div>

                    <div class="form--group">
                        <label class="form--label" for="city">Cidade</label>
                        <input
                            class="form--input"
                            type="text"
                            name="city"
                            id="city"
                            
                        />
                        <span class="form--error"></span>
                    </div>

                    <div class="form--group">
                        <label class="form--label" for="uf">Estado</label>
                        <select class="form--input form--select" name="uf" id="uf">
                            <optgroup label="Norte">
                                <option value="AC">AC</option>
                                <option value="AM">AM</option>
                                <option value="AP">AP</option>
                                <option value="PA">PA</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="TO">TO</option>
                            </optgroup>

                            <optgroup label="Nordeste">
                                <option value="AL">AL</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="MA">MA</option>
                                <option value="PB">PB</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RN">RN</option>
                                <option value="SE">SE</option>
                            </optgroup>

                            <optgroup label="Centro-Oeste">
                                <option value="DF">DF</option>
                                <option value="GO">GO</option>
                                <option value="MS">MS</option>
                                <option value="MT">MT</option>
                            </optgroup>

                            <optgroup label="Sudeste">
                                <option value="ES">ES</option>
                                <option value="MG">MG</option>
                                <option value="RJ">RJ</option>
                                <option value="SP">SP</option>
                            </optgroup>

                            <optgroup label="Sul">
                                <option value="PR">PR</option>
                                <option value="RS">RS</option>
                                <option value="SC">SC</option>
                            </optgroup>
                        </select>
                        <span class="form--error"></span>
                    </div>
                </fieldset>

                <button class="form--submit" type="submit" title="Cadastrar">Cadastrar</button>
            </form>

        </main>

        <div class="brand">
            <asset:image src="brand.png" alt="Asaas Gestão Financeira" title="Asaas Gestão Financeira" class="brand--img"/>
        </div>
    </div>

    <asset:javascript src="fetch-address.js"/>

</body>
</html>
