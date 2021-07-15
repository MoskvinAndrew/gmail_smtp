const express = require('express')
const nodemailer = require("nodemailer");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(cors({ origin: "http:\\localhost:3000" }))
app.use(cors({ origin: "https:\\MoskvinAndrew.github.io" }))
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
let { name, subject, email, message} = req.body.values;
    
    let info = await transporter.sendMail({
        from: `<h2>'${req.body.values.email}'</h2>`,
        to: "andrewmoskvin1@gmail.com", // list of receivers
        subject: "HR wrote me something", // Subject line
        html: `<b>Сообщение с вашего порфолио.</b>
               <div>
               HR's email:&{email} 
               </div>
                <div>
               HR's name:&{name} 
               </div>
                <div>
               Subject:&{subject} 
               </div>
               <div>
               Message:&{message} 
               </div>
               `
       
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