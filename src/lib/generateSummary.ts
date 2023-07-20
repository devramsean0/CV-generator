import { blue } from "colorette";
import { OpenAIApi } from "openai";
export async function generateSummary(data: any, openAI: OpenAIApi, options: any) {
    console.log(blue(`Asking ${options.gptModel} to generate a summary`))
    const qualities = data.qualities.join(", ");
    const skillsNames: string[] = [];
    data.skills.forEach((skill: any) => {
        skillsNames.push(skill.name);
    })
    const skills = skillsNames.join(", ");
    const res = await openAI.createChatCompletion({
        model: options.gptModel,
        messages: [{role: "user", content: `Write me a short CV summary that mentions that I'm a Software Engineer in ${data.location} that is ${qualities} and has skills with ${skills} and is looking for ${data.currentlyLookingFor}`}]
    })
    const summary = res.data.choices[0].message?.content;
    return summary;
}