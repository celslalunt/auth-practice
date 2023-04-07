const db = require("../models");
const user = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports = {
    registerUser: async (request, response) => {
        const {firstName, lastName, email, password} = request.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isUserExist = await user.findOne ({
            where: {
                email,
            }
        });

        if (isUserExist) {
            response.status(400).send ({
                message: "Email sudah terdaftar"
            });
        }

        user.create({firstName, lastName, email, password: hashedPassword})
        .then (result => {
            response.status(200).send({
                status: true,
                message: "Berhasil mendaftarkan akun"
            });
        })
        .catch(erorr => {
            response.status(400).send(erorr);
        })
        .catch(erorr => {
            response.status(400).send(erorr);
        });

    },
    loginUser: async (request, response) => {
        const { email, password } = request.body;

        const userData = await user.findOne({
            where: {
                email,
            }
        });

        if(!userData) {
            response.status(400).send({
                message: "Email belum terdaftar",
            });
            return;
        };

        const isCorrectPassword = bcrypt.compare(password, userData.password);

        if (!isCorrectPassword) {
            response.status(400).send({
                message: "Password salah",
            });
            return;
        };

        const payload = {id: userData.id, isAdmin: userData.isAdmin};

        const token = jwt.sign(payload, "JWT",{expiresIn: "1h"});

        response.status(200).send({
            message: "Login sukses",
            token,
        });
        return;
    },

};