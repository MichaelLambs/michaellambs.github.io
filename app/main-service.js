function MainService() {
    
    var production = !window.location.host.includes('localhost'); // FOR HEROKU

    var herokuURL = production ? '//lambchopps.herokuapp.com/' : '//localhost:3000/' // FOR HEROKU

    var emailServer = axios.create({
        baseURL: herokuURL
    });

    this.sendEmail = function sendEmail(formData) {
        emailServer.post('email', formData)
            .then(res => {})
            .catch(err => {
                console.log("email didn't work")
            })
    }


}