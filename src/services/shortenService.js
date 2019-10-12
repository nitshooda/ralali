//import { url } from "inspector"
let ShortCodeArray = require("./../data/shortcode");
const RandExp = require('randexp');

const regex = RegExp('^[0-9a-zA-Z_]{6}$');


const shortenService = (req, res) => {
    if(req.body.url && req.body.url.trim() != ''){
        if(req.body.shortcode && req.body.shortcode.trim() != ''){
            // test regex for shortcode
            if(regex.test(req.body.shortcode)){
                // check shortcode already in use
                if(ShortCodeArray.includes(req.body.shortcode)){
                    res.status(409).send('The the desired shortcode is already in use. Shortcodes are case-sensitive.');
                } else {
                    // send preferred shortcode
                    ShortCodeArray.push(req.body.shortcode);
                    const result = {
                        "shortcode": req.body.shortcode
                    }
                    res.send(201).send(result);
                }
            } else {
                res.send(422).send('The shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$.');
            }
        } else {
            //generate short code
            let randomShortCode = new RandExp(regex).gen();
            // check if newly generated shortcode is already present in ShortCodeArray, if it does generate new
            while(ShortCodeArray.includes(randomShortCode)){
                randomShortCode = new RandExp(regex).gen();
            }
            ShortCodeArray.push(req.body.shortcode);
            const result = {
                "shortcode": randomShortCode
            }
            res.send(201).send(result);
        }
    }else {
        res.status(400).send("url is not present");    
    }

}

module.exports = shortenService;