const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars') 
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
}) 

app.engine('hbs', hbs.engine) // подлючаем движок
app.set('view engine', 'hbs')
app.set('views', 'views')

// регистрируем роуты, подключаемся к обьекту app, используем метод use,  которые полволяет тдобавляеть новые middleware
// и используем нужный параметр
app.use(todoRoutes)


async function start() {

    try{

        await mongoose.connect('mongodb+srv://clint:fr5Zi91r@cluster0.hc7jl.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()