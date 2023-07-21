import express from 'express';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import fs  from 'fs';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';



const app = express();
const path = "./files/citas.json";
let citas = JSON.parse(fs.readFileSync(path));
let id = uuidv4();
const {log} = console;
app.use(express.json());




app.get('/', (req, res) => {
    citas = JSON.parse(fs.readFileSync(path));   
    const arrayLodash = [];

    _.forEach(citas, (cita) => {
            log(chalk.blue.bgWhite(`Nombre: ${cita.nombre} Apellido: ${cita.apellido} ID: ${cita.id} TimeStamp: ${cita.timeStamp}`));
            arrayLodash.push(`Nombre: ${cita.nombre} Apellido: ${cita.apellido} ID: ${cita.id} TimeStamp: ${cita.timeStamp}`);
        });
    res.send(arrayLodash);
    
    
})

app.post('/', (req, res) => {
   addUser();
   res.send("Usuario agregado");
})

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});


async function getData(){
    try{
        const response = await axios.get('https://randomuser.me/api/');
        let user = response.data;
        return user;
    }catch(error){
        console.log(error);
    }
}

async function addUser(){
    try{
        const user = await getData();
        citas.push({
            nombre: user.results[0].name.first,
            apellido: user.results[0].name.last,
            id : id,
            timeStamp: moment().format('MMMM DD YYYY HH:mm:ss'),
        });
        fs.writeFileSync(path, JSON.stringify(citas));
       
    }catch (error){
        console.log(error);
    }
}