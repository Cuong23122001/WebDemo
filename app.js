const express = require ('express');
const app = express()

const{getDB,InserPet,DeletePet,getPetID,UpdatePet}=require('./data');
app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',async(req,res)=>{
    const dbo = await getDB();
    const allPets = await dbo.collection("pets").find({}).toArray();
    res.render('index',{data:allPets})
})

app.get('/add',(req,res)=>{
    res.render("add");
})
app.post('/addPet',async(req,res)=>{
    const nameInput = req.body.txtName;
    const ageInput = req.body.txtAge;
    const imageInput = req.body.txtImage;
    const priceInput = req.body.txtPrice;
    const newPet = {name: nameInput,age:ageInput,image:imageInput,price:priceInput};

    InserPet(newPet);
    console.log("OK");
    res.redirect('/');
})


app.get('/edit',async(req,res)=>{
    const id = req.query.id;
    const e = await getPetID(id);
    res.render("edit",{pet:e});
})
app.post('/update', async(req,res)=>{
    const nameInput = req.body.txtName;
    const ageInput = req.body.txtAge;
    const imageInput = req.body.txtImage;
    const priceInput = req.body.txtPrice;
    const id = req.body.txtId;

    UpdatePet(id, nameInput, ageInput,imageInput,priceInput);
    res.redirect("/");
})



app.get('/delete',async(req,res)=>{
    const id = req.query.id;

    DeletePet(id);
    res.redirect('/')
})



const PORT = process.env.PORT || 2312;
app.listen(PORT)
console.log("app running is: ",PORT)