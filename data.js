const {ObjectId,MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("PetShop");
    return dbo;
}

async function InserPet(newPet){
    const db = await getDB();
    await db.collection("pets").insertOne(newPet);
}
async function DeletePet(id){
    const db = await getDB();
    await db.collection("pets").deleteOne({_id:ObjectId(id)});
}
async function UpdatePet(id, nameInput, ageInput,imageInput,priceInput) {
    const filter = { _id: ObjectId(id) };
    const newValue = { $set: { name: nameInput, age: ageInput,image: imageInput,price:priceInput } };

    const dbo = await getDB();
    await dbo.collection("pets").updateOne(filter, newValue);
}
async function getPetID(id) {
    const dbo = await getDB();
    const e = await dbo.collection("pets").findOne({ _id: ObjectId(id) });
    return e;
}
module.exports = {getDB,InserPet,DeletePet,getPetID,UpdatePet};