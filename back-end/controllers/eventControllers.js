const db = require("../models")
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');
const event = db.Event;
const user = db.User;

module.exports = {
    addEvent: async (req, res) => {
        try {
            const {name, date, venue, total_ticket, price} = req.body;

            let token = req.headers.authorization;
            if (!token) throw "Unauthorized / Token expired"
            token = token.split(" ")[1];

            const verifiedUser = jwt.verify(token, "JWT");
            console.log(verifiedUser);
            if (!verifiedUser.isAdmin) throw "Acces denied: You Are Not Admin"
            if (!name || !date || !venue || !total_ticket || !price) throw " Please complete your form"

            const data = await event.create({
                ...req.body,
                admin_id: verifiedUser.id,
                remaining_ticket: total_ticket
            });
            res.status(200).send ({
                status: true, 
                message: "Event succesfully created",
                data
            })
        } catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    },
    showEvents: async (req, res) => {
        try {
            const data = await event.findAll({
                attributes: ["name", "venue", "date", "total_ticket", "price"],
                where: {
                    date: {
                        [Op.gte]: new Date(),
                    },
                    remaining_ticket: {
                        [Op.gt]: 0,
                    }
                }
            })
            res.status(200).send({
                status: true,
                data
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
}