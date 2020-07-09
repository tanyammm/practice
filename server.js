//создание сервера
//подключение зависимостей
const express = require('express'); //require-скрипт-загрузчик
const MongoClient = require('mongodb').MongoClient; //взаимодейсвтие с базой данных
const bodyParser = require('body-parser');
const app = express(); //экземпляр фреймворка Express
const port = 8000; //указание порта
const uri = "mongodb+srv://user54:ghU76Tae2@cluster0.qyqnd.mongodb.net/Name?retryWrites=true&w=majority";
const dbName = 'Name'; 


//настройки безопасности
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //кросс-доменный запрос. Разрешение для отправки запроса на сервер
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //
    next();
  });

//для отправки post-запросов и чтения get-запросов
app.use(bodyParser.urlencoded({ extended: true })); //промежуточное ПО для URL
app.use(bodyParser.json());

(async function () { //асинхронная функция. Возвращает Promise
    let client;

    try { //опции
        client = await MongoClient.connect(uri, { //подключение к MongoDB
        useNewUrlParser: true, //разрешение на использование нового парсера Url
        useUnifiedTopology: true, //разрешение чтения
        //reconnectTries: Number.MAX_VALUE, //попытки выполнить повторно будут до тех пор, пока числа не кончатся
        //reconnectInterval: 1000, //1 секунда
      });  

      console.log("Connected correctly to server");
  
      const db = client.db(dbName); //подключение к базе данных
      require('./app/routes')(app, db); //передача
  
      app.listen(port, () => { //вешаем наши приложение на порт (быть готовым к определённому порту)
        console.log('We are live on ' + port);
      });
    } catch (err) {
      console.log(err.stack);
    }
  })();    