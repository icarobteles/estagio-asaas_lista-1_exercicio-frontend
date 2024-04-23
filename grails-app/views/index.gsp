<!doctype html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Página de Cadastro | Estágio Asaas</title>

    <asset:stylesheet src="styles.css"/>
</head>
<body>
    <div class="container">
        <h1>Cadastro</h1>

        <form class="form">

            <fieldset id="identify-group">
                <legend>Identificação</legend>

                <div class="form--group">
                    <label class="form--label" for="name">Nome Completo</label>
                    <input class="form--input" type="text" name="name" id="name" />
                </div>

                <div class="form--group">
                    <label class="form--label" for="cpf">CPF</label>
                    <input class="form--input" type="text" name="cpf" id="cpf" />
                </div>
            </fieldset>

            <fieldset id="contact-group">
                <legend>Contato</legend>
                <div class="form--group">
                    <label class="form--label" for="email">Email</label>
                    <input class="form--input" type="email" name="email" id="email" required />
                </div>
                <div class="form--group">
                    <label class="form--label" for="telefone">Telefone</label>
                    <input class="form--input" type="tel" name="telefone" id="telefone" />
                </div>
            </fieldset>

            <fieldset id="address-group">
                <legend>Endereço</legend>

                <div class="form--group">
                    <label class="form--label" for="cep">CEP</label>
                    <input class="form--input" type="text" name="cep" id="cep" required />
                </div>

                <div class="form--group">
                    <label class="form--label" for="address">Endereço</label>
                    <input
                        class="form--input"
                        type="text"
                        name="address"
                        id="address"
                        required
                    />
                </div>

                <div class="form--group">
                    <label class="form--label" for="bairro">Bairro</label>
                    <input
                        class="form--input"
                        type="text"
                        name="bairro"
                        id="bairro"
                        required
                    />
                </div>

                <div class="form--group">
                    <label class="form--label" for="city">Cidade</label>
                    <input
                        class="form--input"
                        type="text"
                        name="city"
                        id="city"
                        required
                    />
                </div>

                <div class="form--group">
                    <label class="form--label" for="uf">Estado</label>
                    <select name="uf" id="uf" required>
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
                </div>
            </fieldset>

            <button type="submit" title="Cadastrar">Cadastrar</button>
        </form>
    </div>

    <asset:javascript src="register-page.js"/>

</body>
</html>
