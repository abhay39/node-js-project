import express from 'express'
import cors from 'cors'
import { collection,addDoc,Timestamp, getFirestore,
    query,
    doc,
    getDocs,
    where,
    setDoc, } from 'firebase/firestore'
import { db } from './firebase.js'

const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send("Hey Welcome to backend...")
})
app.post("/addIncome",async(req,res)=>{
    const data=req.body;
    // console.log(data.name,data.username.displayName)
    try{
        const parentDocRef = doc(db, "users", data.username.uid); 
        const subCollectionRef = collection(parentDocRef, "income"); 
        const newDocRef = await addDoc(subCollectionRef, {  
          name:data.name,
          amount:Number(data.amount),
          catergory:data.catergory,
          time:Timestamp.now(), 
        });
        res.status(200).send("Succesfully added income")
    }catch(err){
        console.log(err)
        res.status(500).send("Error adding income")
    }
})
app.post("/addExpense",async(req,res)=>{
    const data=req.body;
    // console.log(data.name,data.username.displayName)
    try{
        const parentDocRef = doc(db, "users", data.username.uid); 
        const subCollectionRef = collection(parentDocRef, "expense"); 
        const newDocRef = await addDoc(subCollectionRef, {  
          name:data.name,
          amount:Number(data.amount),
          catergory:data.catergory,
          time:Timestamp.now(), 
        });
        res.status(200).send("Succesfully added expense")
    }catch(err){
        console.log(err)
        res.status(500).send("Error adding expense")
    }
})
app.put("/updateExpense",async(req,res)=>{
    const data=req.body;
    // console.log(data.name,data.username.displayName)
    try{
        const updating=doc(db,"users",user.uid,"expense",incId)
        await updateDoc(updating, {  
            name:data.name,
            amount:Number(data.amount),
            catergory:data.catergory,
            time:Timestamp.now(), 
        });
        res.status(200).send("Succesfully added expense")
    }catch(err){
        console.log(err)
        res.status(500).send("Error adding expense")
    }
})
app.put("/updateIncome",async(req,res)=>{
    const data=req.body;
    // console.log(data.name,data.username.displayName)
    try{
        const updating=doc(db,"users",user.uid,"income",incId)
        await updateDoc(updating, {  
            name:data.name,
            amount:Number(data.amount),
            catergory:data.catergory,
            time:Timestamp.now(), 
        });
        res.status(200).send("Succesfully added expense")
    }catch(err){
        console.log(err)
        res.status(500).send("Error adding expense")
    }
})
app.delete("/deleteIncome",async(req,res)=>{
    const data=req.body;
    // console.log(data.name,data.username.displayName)
    try{
        const updating=doc(db,"users",user.uid,"income",incId)
        deleteDoc(doc(db,"users",user.uid,"income",item.id))
        res.status(200).send("Succesfully added expense")
    }catch(err){
        console.log(err)
        res.status(500).send("Error adding expense")
    }
})
app.delete("/deleteExpense",async(req,res)=>{
    const data=req.body;
    // console.log(data.name,data.username.displayName)
    try{
        const updating=doc(db,"users",user.uid,"expense",incId)
        deleteDoc(doc(db,"users",user.uid,"expense",item.id))
        res.status(200).send("Succesfully added expense")
    }catch(err){
        console.log(err)
        res.status(500).send("Error adding expense")
    }
})

app.listen(5000,()=>{
    console.log('Server started on port 5000')
})