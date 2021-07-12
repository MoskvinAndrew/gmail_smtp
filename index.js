const express = require('express')
const nodemailer = require("nodemailer");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const port = 3011;
app.use(cors());
app.use(cors({ origin: "http:\\localhost:3000" }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let smtp_Login = process.env.SMPT_LOGIN || "---";
let smtp_Password = process.env.SMPT_PASSWORD ||  "---";



let transporter = nodemailer.createTransport({
    service:"gmail",
    // port: 25,
    // secure: false,
    // tls:{
    //   rejectUnauthorized:false
    // },
    auth: {
        user:smtp_Login,
        pass: smtp_Password,
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/check', (req, res) => {
    res.send('yo man!')
})
app.post('/sendMessage', async(req, res) => {
let {lastName, firstName, email,message} = req.body.values;
    
    let info = await transporter.sendMail({
        from: 'Andrew Moskvin', // sender address
        to: "andrewmoskvin1@gmail.com", // list of receivers
        subject: "test of feedback form", // Subject line
        //text: "testing...", // plain text body
        html: `<div>${firstName}${lastName}${email}</div>`
       
    })

.catch(e=>{
    console.error('error')
})


    res.send('message have been sent!');
    

})

let port = process.env.PORT || 3011;



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})