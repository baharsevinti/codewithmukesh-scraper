const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");

const app = express();

app.use(express.json());


app.get('/',async (req,res)=>{
 try {
    await axios("https://codewithmukesh.com/blog/").then((response) => {
        const html_data = response.data;
        
        const $ = cheerio.load(html_data);
        const articles = [];

        $(".group").each((index, element) => {
            const title = $(element).find("h3").text().trim(); // Başlık
            const link = $(element).find("a").attr("href"); // Bağlantı
            const shortDescription = $(element).find("p").first().text().trim(); // Kısa açıklama
            const thumbnail = $(element).find("img").attr("src"); // Thumbnail URL

            // Bilgileri bir nesne olarak ekle
            articles.push({
                title: title,
                link: link ? `https://codewithmukesh.com${link}` : null,
                shortDescription: shortDescription,
                thumbnail: thumbnail ? `https://codewithmukesh.com${thumbnail}` : null 
            });
        });
        res.status(200).json(articles);

      })
 } catch (error) {
    console.log(error);
    res.status(500).send(error);
 }
    
});

app.listen(2323,()=>{
    console.log('hat hatt');
});



