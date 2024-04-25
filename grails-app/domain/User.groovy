class User {
  String name;
  String cpf;
  String email;
  String phone;
  String cep;
  String address;
  String neighborhood;
  String city;
  String uf;

    static constraints = {
      name blank: false, nullable: false
      cpf blank: false, nullable: false
      email email: true, blank: false, nullable: false
      phone blank: false, nullable: false
      cep blank: false, nullable: false
      address blank: false, nullable: false
      neighborhood blank: false, nullable: false
      city blank: false, nullable: false
      uf blank: false, nullable: false
    }

}