const {ObjectID} = require("mongodb");

module.exports = function (app, db) {
    app.post('/notes/add', (req, res) => { //Post-запрос. Добавление новой заметки
            const note = {
                text: req.body.text,
                title: req.body.title,
                date: req.body.date,                
                rate: req.body.rate,
            };
            db.collection('notes').insertOne(note, (err, result) => {
                console.log('NOTE', note)
                if (err) {
                    console.log('ERROR',err)
                    res.send({
                        'error': 'An error has occurred'
                    });
                } else {                       
                    res.send(result.ops[0]);                   
                }
            });
    });

    app.post('/notes/redid', (req, res) => {//Чтение конкретной заметки по id
        const id = req.body.id;
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {                   
                res.send(item);               
            }
        });
    });

    app.get('/notes/red', (req, res) => { //Get-запрос. Чтение всех заметок
        db.collection('notes').find({}).toArray(function(err, result) { //нахождение всех элементов массива
            if (err) { //если ошибка
                console.log('WTFERR',err)
                res.send({
                    'error': 'An error has occurred'
                });
            } else { //иначе (если нет ошибки)                               
                //console.log('result:',result) //вывод массива в консоль    
                db.collection('notes').countDocuments().then((count) => { //подсчёт количества
                //console.log('quantity: ' + count); //вывод количества в консоль                                     
                res.send(result); //вывод всего  
                });
            }
        });
    });  

    app.post('/notes/delete', (req, res) => { //Удаление заметки
        const id = req.body.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {                    
                res.send('Note '+id+' deleted!');        
            }
        });
    });

    app.post('/notes/update', (req, res) => { //Обновление заметки
        const id = req.body.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title, date: req.body.date, rate: req.body.rate};
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {                   
                res.send(note);               
            }
        });
    });
}