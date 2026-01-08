import { success } from "better-auth";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { sendWelcomeMail } from "../nodemailer";

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created' },
    async ({ event, step }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment Goals: ${event.data.investmentGoals}
            - Risk Tolerance: ${event.data.riskTolerance}
            - Preffered Industry: ${event.data.prefferedIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace("{{USER_NAME}}", userProfile)
        
        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash' }),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }
        })

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thank you for joining Signalist';

            // EMAIL LOGIC
            const { data: { email, name } } = event;
            return await sendWelcomeMail({ email, name, intro: introText })
        })

        return {
            success: true,
            message: 'Mail sent successfully'
        }
    }
)