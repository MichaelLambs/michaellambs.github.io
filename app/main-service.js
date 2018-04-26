function MainService() {
    
    var production = !window.location.host.includes('localhost'); // FOR HEROKU

    var herokuURL = production ? '//lambchopps.herokuapp.com/' : '//localhost:3000/' // FOR HEROKU

    var emailServer = axios.create({
        baseURL: herokuURL
    });

    this.sendEmail = function sendEmail(formData, displayMessage) {
        emailServer.post('email', formData)
            .then(res => {
                displayMessage('Success')
                console.log("Success")
            })
            .catch(err => {
                displayMessage('Error')
                console.log("Error")
            })
    }


}