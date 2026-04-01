import axios from "axios";

const translateText = async (text, sourceLang, targetLang) => {
    const API_URL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${targetLang}`;

    const response = await axios.get(API_URL);
    try {
        return response.data.responseData.translatedText;
    }
    catch(error) {
        return "Error: " + error.message;
    }
}

export default translateText;