import { Configuration, OpenAIApi } from "openai";
function getOpenAIKey(key: string) {
    const config = new Configuration({
        apiKey: key,
    });
    const openai = new OpenAIApi(config);
    return openai;
}
export default getOpenAIKey;