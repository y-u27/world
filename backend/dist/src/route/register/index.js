"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../lib/prismaClient"));
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, image } = req.body;
    if (!email || !password) {
        res
            .status(400)
            .json({ message: "メールアドレスとパスワード登録が必要です" });
        return;
    }
    try {
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prismaClient_1.default.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                image: image || "",
            },
        });
        res.status(200).json({ user: newUser });
        return;
    }
    catch (error) {
        console.error("Register error: ", error);
        res.status(500).json({ message: "登録できませんでした,error" });
        return;
    }
}));
exports.default = router;
