const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");

const app = express();

app.use(express.json());


app.get('/',async (req,res)=>{
 try {
    await axios("https://codewithmukesh.com/blog/aws-message-processing-framework-for-dotnet/").then((response) => {
        const html_data = response.data;
        
        const $ = cheerio.load(html_data);
        const detail = [];

        $(".prose").each((index, element) => {
            const title = $(element).find("p").text().trim(); // Başlık
           

            // Bilgileri bir nesne olarak ekle
            detail.push({
                title: title 
            });
        });
        res.status(200).json(detail);

      })
 } catch (error) {
    console.log(error);
    res.status(500).send(error);
 }
    
});

app.listen(2323,()=>{
    console.log('hat hatt');
});



