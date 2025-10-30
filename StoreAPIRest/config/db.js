import mongoose from 'mongoose';

const config = {
    url: process.env.URL_MONGO,
    options: {}
}

export function conectar(){
    return mongoose.connect(config.url, config.options);
}

export function desconectar(){
    return mongoose.disconnect();
}

