import { UserModel } from "../models/user.model";

export const usersMock: UserModel[] = [
    {
        id: 1,
        email: 'usuario1@example.com',
        password: '123456',
        foto: "assets/imagens/stefan-stefancik.jpg",
        nome: "Stefan",
        sobrenome: "Stefancik"
    },
    {
        id: 2,
        email: 'usuario2@example.com',
        password: '123456',
        foto: "assets/imagens/christopher-campbell.jpg",
        nome: "Christopher",
        sobrenome: "Campbell"
    },
    {
        id: 3,
        email: 'usuario3@example.com',
        password: '123456',
        foto: "assets/imagens/sergio-de-paula.jpg",
        nome: "Sergio",
        sobrenome: "Paulo"
    }
];