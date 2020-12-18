export default function (arg) {
   let self = this;
   let props = arg;

   this.id = null;
   this.name = null;
   this.role = null;
   this.cpf = null;
   this.phone = null;
   this.email = null;
   this.gender = null;
   this.status = null;
   this.birthday = null;

   this._status = false;
   this._favorite = false;

   this.init = () => {
      self.name = props.name || "";
      self.role = props.role || null;
      self.cpf = props.cpf || "";
      self.phone = props.phone || "";
      self.email = props.email || "";
      self.gender = props.gender || "";
      self.status = props.status || false;
      self.birthday = props.birthday || "";

      self.id = Date.now();
   }

   this.init();
}