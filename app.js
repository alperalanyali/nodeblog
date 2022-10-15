const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')
const app = express()


app.set('view engine','ejs')

const dbURL = 'mongodb+srv://alperalanyali:alper1234@cluster0.7rjxw.mongodb.net/nodeblog?retryWrites=true&w=majority'
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
    console.log('baglantı kuruldu');
    app.listen(3000)
})
.catch((err)=>{
    console.log(err);
})

app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(express.urlencoded({extended:true}))
/*
app.get('/add',(req,res)=>{
    const blog =  new Blog({
     title:'Yeni Yazı',
     short:'kisa acikama',
     long:'uzun aciklama'
 })   
    blog.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=> {
        console.log(err)
    })
})

app.get('/all',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/single',(req,res)=>{
    Blog.findById('619cba39d45a32ec52c3ebd5')
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
})
*/
app.get('/',(req,res) =>{
    // ejs view engine öncesi res.sendFile('./views/index.html',{root:__dirname})
    //res.render('index',{title:'Ana Sayfa'})
    Blog.find().sort({createdAt:-1})
    .then((result)=> {
       // res.send(result)
        res.render('index',{title:'Ana Sayfa',blogs:result})
    }).catch((err)=>{
        console.log(err)
        res.status(404).render('404',{title:'Sayfa Bulunamadı'})
    })
})

app.get('/blog/:id',(req,res)=>{
        const id = req.params.id
        Blog.findById(id)
        .then((result)=>{
                res.render('blog',{blog:result,title:'Detay'})
        }).catch((err)=>{
            console.log(err)
            res.status(404).render('404',{title:'Sayfa Bulunamadı'})
        })
})

app.get('/admin',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=> {
       // res.send(result)
        res.render('admin',{title:'Admin Sayfası',blogs:result})
    }).catch((err)=>{
        console.log(err)
        res.status(404).render('404',{title:'Sayfa Bulunamadı'})
    })
})

app.get('/admin/add',(req,res)=>{
   res.render('add',{title:'Yeni Yazı'})
})

app.post('/admin/add',(req,res)=>{
    //console.log(req.body)
    const blog = new Blog(req.body)
    blog.save()
    .then((result)=>{
        res.redirect('/admin')
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.delete('/admin/delete/:id',(req,res)=>{
    const id = req.params._id
    Blog.findByIdAndDelete(id)
    .then((result)=>{
       res.json({link:'/admin'})     
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/about',(req,res) =>{
   // ejs view engine öncesi  res.sendFile('./views/about.html',{root:__dirname})
   res.render('about',{title:'Hakkımızda'})
})

app.get('/login',(req,res) =>{
    // ejs view engine öncesi  res.sendFile('./views/about.html',{root:__dirname})
    res.render('login',{title:'Giriş Sayfası'})
 })
app.get('/about-us',(req,res)=>{
 res.redirect('/about')
})

app.use((req,res)=>{
   // ejs view engine öncesi  res.status(404).sendFile('./views/404.html',{root:__dirname})
   res.status(404).render('404',{title:'Sayfa Bulunamadı'})
})