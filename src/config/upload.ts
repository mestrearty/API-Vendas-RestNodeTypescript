import multer from "multer";
import path from "path";
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

//metodo responsável por alterar o nome do arquivo que se deseja armazenar para que não haja itens
//com nomes iguais no banco
export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const dateTimeStamp = new Date();

            const filename = `${file}-${dateTimeStamp}-${file.originalname}`;

            callback(null, filename);
        }
    })
};