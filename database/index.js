const db = require('./connection');
var express = require('express');
var router = express.Router();
const { response } = require('../app');

//need update using joins
const getUsers = ()=>{
    return db.query(`select articles.article_id,authors.author_id,authors.authorname,articles.articlename from articles,authors where articles.author_id=authors.author_id`);
    //return db.query(`select article_id,author_id,authorname,articlename from articles order by authorname`);
    //return db.query(`select "authorname",LIST("articlename"||', ') from "author_db" group by "authorname"`);
}


const getArticle = (req) =>{
    console.log("in get article");
    return db.query(`select articles.articlename,articles.pdate,articles.articletext,authors.authorname from articles,authors where (articles.article_id=${req.params.id} and articles.author_id=authors.author_id)`);
}

const deletedata=(req)=>{
    return db.query(`delete from contactus_db where id=${req.params.id}`);
}

const getAboutus = () =>{
    return db.query(`select * from "aboutus_db"`);
}
const getMessage=()=>{
    return db.query(`select * from contactus_db`);
}

const geteditmessage=(req)=>{
    return db.query(`select * from contactus_db where id=${req.params.id}`);
}
const getAuthorname=()=>{
    return db.query(`select author_id,authorname from authors`);//check here
}

// const getArticleByauthor=(authorname)=>{
//     return db.query(`select articlename from authors where authorname=$1`,[authorname])
// }
const addArticle=(articlename,articletext,pdate,author_id)=>{
    return db.query(`insert into articles (articlename,articletext,pdate,author_id) values($1,$2,$3,$4)`,[articlename,articletext,pdate,author_id]);
}

const addContact=(fname,lname,email,mobileno,message,gender)=>{
    return db.query(`insert into contactus_db (fname,lname,email,mobileno,message,gender) values($1,$2,$3,$4,$5,$6)`,[fname,lname,email,mobileno,message,gender]);
}

const updatecontact=(fname,lname,email,mobileno,message,gender,id)=>{
    return db.query(`update contactus_db set fname = $1,lname = $2,email = $3,mobileno =$4,message=$5,gender=$6 where id =$7`,[fname,lname,email,mobileno,message,gender,id]);
   // return db.query(`insert into contactus_db (fname,lname,email,mobileno,message,gender)  values($1,$2,$3,$4,$5,$6) where id=$7`,[fname,lname,email,mobileno,message,gender,id]);
}
module.exports={
    getUsers,
    getArticle,
    getAboutus,
    getAuthorname,
    addArticle,
    addContact,
    updatecontact,
    getMessage,
   // getArticleByauthor,
    deletedata,
    geteditmessage
}