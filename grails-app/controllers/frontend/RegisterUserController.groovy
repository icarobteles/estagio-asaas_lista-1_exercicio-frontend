package frontend

import java.util.Random

class RegisterUserController {

    def save() {

        def user = new User(
            name: params.name,
            cpf: params.cpf,
            email: params.email,
            phone: params.phone,
            cep: params.cep,
            address: params.address,
            neighborhood: params.neighborhood,
            city: params.city,
            uf: params.uf
        )

        println "Dados do formulário recebidos: "
        println user.properties

        // Simula a probabilidade de ocorrer um erro no servidor
        // Se 1 => Erro; Se 2, 3 ou 4 => Sucesso
        def random = Math.floor(Math.random() * 4 + 1)

        flash.submitted = true;

        // 25% de chance de ocorrer um erro
        if (random == 1) {
            flash.submitStatus = "error";
            flash.submitMessage = "Ocorreu um erro ao enviar o formulário!";
        } else {
            flash.submitStatus = "success";
            flash.submitMessage = "Formulário enviado com sucesso!";
        }

        redirect uri: "/";
    }
}
