import Alpine from "alpinejs";
import "./index.css";

window.Alpine = Alpine;

Alpine.data('loginValidation', ()=>({
    username: '',
    userpass: '',
    error: false,
    errormessage: '',
    validemail: true,
    validpass: true,
    formValidate: true,

    checkValidate(value){
       
        const {username, userpass} = value;
       
        if(!username.includes('@')){
            this.error = true;
            this.errormessage = 'username should be an email address';
            this.validemail = false;
            return;
        }
        if(username){
            console.log("VALID")
        }
        console.log(userpass.length)
        if(userpass.length<6){
            this.error = true;
            this.errormessage =  'password length must be > 6';
            this.validpass = false;
            console.log("PASSWORD VALIDATION")
            return;
        }
        if(username.includes('@')){
            
            this.errorCleanUp();
        }
        if(userpass.length>6){
            console.log("VALID PASS")
            this.errorCleanUp();
        }
    },
    errorCleanUp(){
        this.error = false;
        this.errormessage = '';
        this.validemail = true;
        this.validpass = true;
    },
    submitHandler(value){
       this.checkValidate(value);
       if(this.validemail && this.validpass){
          this.errorCleanUp();
       }
    }
}))

Alpine.start();
