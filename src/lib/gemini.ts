import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "demo-api-key";

const genAI = new GoogleGenerativeAI(API_KEY);

export interface AthleteProfile {
  sport: string;
  schoolYear: string;
  state: string;
  goals: string;
  name?: string;
}

export interface NILPlan {
  title: string;
  overview: string;
  steps: {
    phase: string;
    title: string;
    description: string;
    timeline: string;
    actions: string[];
  }[];
  quickWins: string[];
  longTermGoals: string[];
}

export async function generateNILPlan(profile: AthleteProfile): Promise<NILPlan> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are an expert NIL (Name, Image, Likeness) advisor for high school athletes. Generate a comprehensive, personalized NIL action plan for the following athlete:

Sport: ${profile.sport}
School Year: ${profile.schoolYear}
State: ${profile.state}
Goals: ${profile.goals}

Create a detailed NIL action plan that includes:

1. A compelling title for their NIL journey
2. An executive overview of their NIL potential
3. 4-5 specific phases of development with:
   - Phase name
   - Clear title
   - Detailed description
   - Timeline (e.g., "Months 1-2", "Junior Year", etc.)
   - 3-5 specific action items
4. 3-5 quick wins they can implement immediately
5. 3-5 long-term strategic goals

Make it specific to their sport, location, and goals. Focus on realistic, actionable strategies that a high school athlete can actually implement. Consider state-specific NIL regulations and opportunities.

Return the response in this exact JSON format:
{
  "title": "Your NIL Success Blueprint",
  "overview": "Executive summary of NIL potential and strategy",
  "steps": [
    {
      "phase": "Phase 1",
      "title": "Foundation Building",
      "description": "Detailed description of this phase",
      "timeline": "Months 1-2",
      "actions": ["Action 1", "Action 2", "Action 3"]
    }
  ],
  "quickWins": ["Quick win 1", "Quick win 2", "Quick win 3"],
  "longTermGoals": ["Long-term goal 1", "Long-term goal 2", "Long-term goal 3"]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const nilPlan: NILPlan = JSON.parse(jsonMatch[0]);
    return nilPlan;
    
  } catch (error) {
    console.error('Error generating NIL plan:', error);
    
    // Return a fallback plan if API fails
    return {
      title: `${profile.sport} NIL Success Blueprint`,
      overview: `A comprehensive action plan designed specifically for a ${profile.schoolYear} ${profile.sport} athlete in ${profile.state}. This plan focuses on building your personal brand, maximizing NIL opportunities, and achieving your goals of ${profile.goals}.`,
      steps: [
        {
          phase: "Phase 1",
          title: "Foundation Building",
          description: "Establish your digital presence and personal brand foundation across key platforms.",
          timeline: "Months 1-2",
          actions: [
            "Create professional social media profiles on Instagram, TikTok, and Twitter",
            "Develop a consistent visual brand with colors, fonts, and style",
            "Set up basic content creation equipment (phone tripod, ring light)",
            "Research and follow successful athletes in your sport",
            "Create a content calendar for regular posting"
          ]
        },
        {
          phase: "Phase 2",
          title: "Content Creation & Engagement",
          description: "Build an engaged following through consistent, high-quality content.",
          timeline: "Months 3-6",
          actions: [
            "Post training content 3-4 times per week",
            "Share behind-the-scenes moments from competitions",
            "Engage with your local sports community online",
            "Collaborate with teammates and other local athletes",
            "Start a weekly series highlighting your journey"
          ]
        },
        {
          phase: "Phase 3",
          title: "Local Partnership Development",
          description: "Identify and pursue partnerships with local businesses and brands.",
          timeline: "Months 6-12",
          actions: [
            "Research local businesses that align with your values",
            "Create a professional media kit with your stats and reach",
            "Reach out to local sports retailers and fitness centers",
            "Offer to promote local events and fundraisers",
            "Develop partnership proposal templates"
          ]
        },
        {
          phase: "Phase 4",
          title: "Brand Expansion",
          description: "Scale your influence and pursue larger opportunities.",
          timeline: "Year 2+",
          actions: [
            "Apply for regional and national brand partnerships",
            "Launch your own merchandise line",
            "Start a podcast or YouTube channel",
            "Mentor younger athletes in your community",
            "Explore speaking opportunities at local events"
          ]
        }
      ],
      quickWins: [
        "Optimize all social media bios with sport, school, and contact info",
        "Post a professional headshot and action shot on all platforms",
        "Share your training schedule and upcoming competitions",
        "Tag local businesses you already support in your posts",
        "Connect with college coaches and recruiters in your sport"
      ],
      longTermGoals: [
        "Build a following of 10,000+ engaged fans across platforms",
        "Secure 3-5 regular local business partnerships",
        "Generate $5,000+ annually from NIL activities",
        "Become a recognized leader in your local sports community",
        "Use NIL success to support college recruitment goals"
      ]
    };
  }
}

export default genAI;
