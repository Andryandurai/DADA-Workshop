export type Audience = 'school' | 'college';
export type CategoryId = 'web' | 'ai' | 'coding' | 'design' | 'innovation';
export const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;
export const officialSite = 'https://darshansathish2006.github.io/DADA/';
export const contactEmail = 'teamdadaoffl@gmail.com';

export const categories: { id: CategoryId; label: string; full: string; color: string }[] = [
  { id: 'web', label: 'Web & Internet', full: 'Web Development & Internet Technology', color: 'blue' },
  { id: 'ai', label: 'AI & Digital Tech', full: 'Artificial Intelligence & Digital Technology', color: 'green' },
  { id: 'coding', label: 'Coding & Games', full: 'Programming & Game Development', color: 'orange' },
  { id: 'design', label: 'Design & Creation', full: 'UI/UX, Graphic Design & Digital Creation', color: 'pink' },
  { id: 'innovation', label: 'Innovation & Careers', full: 'Entrepreneurship, Innovation & Careers', color: 'blue' },
];
export interface Workshop {
  id: string; number: string; title: string; category: CategoryId;
  summary: string; description: string; audiences: Audience[]; objectives: string[]; practical: string;
}

// Pathways are recommendations, not eligibility rules. Adaptations are discussed on enquiry.
export const workshops: Workshop[] = [
  { id: 'html-css', number: '01', category: 'web', title: 'From Zero to Website — HTML & CSS',
    summary: 'Turn a blank page into something that is yours. Start with structure, then bring it to life with style.',
    description: 'Introduce students to the fundamentals of website development by explaining how HTML provides the structure of a webpage and CSS controls its appearance. Students will understand how websites are created and how these skills can be used to build personal websites and digital projects.',
    audiences: ['school', 'college'], objectives: ['Understand the roles of HTML and CSS.', 'Structure a page with headings, content and links.', 'Explore styling, layout and personal web projects.'], practical: 'Try building a personal webpage, then explore the Website Makeover Challenge.' },
  { id: 'internet', number: '02', category: 'web', title: 'How the Internet Actually Works',
    summary: 'Follow a website address from your browser to a server and back. Make the invisible connections make sense.',
    description: 'Explain how websites, browsers, servers, domains and hosting work together to make information accessible online. Students will gain a basic understanding of what happens when they enter a website address and how web content reaches their devices.',
    audiences: ['school'], objectives: ['Connect the roles of browsers and servers.', 'Understand domains and hosting.', 'Trace the journey of a webpage request.'], practical: 'Map the journey of a browser request together using a simple visual diagram.' },
  { id: 'ai-students', number: '03', category: 'ai', title: 'AI for Students — Beyond ChatGPT',
    summary: 'Explore AI as a learning and creative tool. Ask better questions, check the answers, and keep thinking for yourself.',
    description: 'Explore how artificial intelligence can support learning, research, presentations, creativity and everyday problem-solving. Introduce students to AI limitations, fact-checking, privacy and responsible usage so they can use AI effectively rather than relying on it blindly.',
    audiences: ['school', 'college'], objectives: ['Explore uses for research, learning and creativity.', 'Recognise limitations and check generated claims.', 'Consider privacy and responsible AI use.'], practical: 'Compare AI-assisted ideas and practise checking claims through Spot the Fake.' },
  { id: 'prompt-engineering', number: '04', category: 'ai', title: 'Prompt Engineering & AI Mechanics',
    summary: 'Same tool. Better instructions. Discover how context, constraints and clarity change an AI response.',
    description: 'Explain how AI tools interpret instructions and why specific, structured prompts can produce better results than vague requests. Students will understand the basics of communicating with AI tools for writing, brainstorming, image generation and other creative tasks.',
    audiences: ['college'], objectives: ['Compare vague and structured prompts.', 'Use context, constraints and clear goals.', 'Evaluate and refine creative AI outputs.'], practical: 'Explore a shared creative brief through Prompt Battle — Who Can Outsmart AI?' },
  { id: 'first-code', number: '05', category: 'coding', title: 'Your First Step into Coding',
    summary: 'Start with an idea, a little logic, and your first instructions to a computer. No experience needed.',
    description: 'Introduce programming as a way of giving instructions to computers and solving problems through logical thinking. Explain the role of programming languages, variables, conditions and loops using simple examples that are suitable for beginners.',
    audiences: ['school'], objectives: ['Break a problem into logical steps.', 'Recognise variables, conditions and loops.', 'Read and reason about simple programs.'], practical: 'Predict what a small program will do with Code or Chaos? — Predict the Output.' },
  { id: 'game-debugging', number: '06', category: 'coding', title: 'Game Development & Debugging Fundamentals',
    summary: 'Make rules. Move a player. Find the bug. See how playful ideas become working software.',
    description: 'Explain how games are created using programming logic, player movements, scoring systems and rules. Introduce debugging as the process of finding and fixing errors, helping students understand how developers test and improve software.',
    audiences: ['college'], objectives: ['Connect game rules with programming logic.', 'Explore movement and scoring systems.', 'Find, fix and test simple errors.'], practical: 'Try a small game concept or team up for Bug Bounty — Fix the Broken Code.' },
  { id: 'ui-ux', number: '07', category: 'design', title: 'UI/UX Design — How Apps and Websites Are Designed',
    summary: 'Look beyond the screen. Learn how thoughtful layouts and accessible choices make digital products easier to use.',
    description: 'Introduce the principles of user interface and user experience design, including layouts, navigation, colours, accessibility and usability. Explain how designers create digital products that are attractive, understandable and easy for people to use.',
    audiences: ['school', 'college'], objectives: ['Distinguish interface and experience design.', 'Explore layout, navigation and accessibility.', 'Explain choices that improve usability.'], practical: 'Sketch an improved app screen and discuss how the changes help its users.' },
  { id: 'graphic-design', number: '08', category: 'design', title: 'Digital Creation & Graphic Design',
    summary: 'Make an idea visible. Experiment with type, colour and composition to create designs that communicate.',
    description: 'Explore the fundamentals of creating digital posters, logos, thumbnails, invitations and social media graphics. Students will learn how visual communication, typography, colour combinations and layout contribute to effective digital designs.',
    audiences: ['school', 'college'], objectives: ['Use typography and colour intentionally.', 'Arrange a clear visual hierarchy.', 'Communicate an idea through digital graphics.'], practical: 'Respond to a shared poster theme in Design Battle, or Create a Brand in 15 Minutes.' },
  { id: 'entrepreneur', number: '09', category: 'innovation', title: 'From Student to Young Entrepreneur',
    summary: 'Everyday problem. Unexpected idea. Explore the first steps from “what if?” to a useful solution.',
    description: 'Explain how everyday problems can become opportunities for creating products, services or businesses. Introduce problem identification, target audiences, value propositions and the basics of turning an idea into a practical solution.',
    audiences: ['school', 'college'], objectives: ['Identify a problem worth solving.', 'Describe an audience and value proposition.', 'Develop and explain a practical idea.'], practical: 'Invent Something That Doesn’t Exist, then share the idea in a short team pitch.' },
  { id: 'tech-careers', number: '10', category: 'innovation', title: 'Discover Your Career in Technology',
    summary: 'Find the possibilities behind the job titles. Explore the skills and interests that could shape your next step.',
    description: 'Introduce students to career opportunities in software development, artificial intelligence, data science, cybersecurity, UI/UX design, cloud computing and digital marketing. Explain the work involved in each field and the skills students can begin developing to explore potential career paths.',
    audiences: ['school', 'college'], objectives: ['Explore a range of technology careers.', 'Connect interests with different kinds of work.', 'Identify skills to start exploring.'], practical: 'Research a technology role and explain it through the Three-Slide Challenge.' },
];

export interface Activity { id: string; number: string; title: string; category: CategoryId; description: string; skills: string[] }
export const activities: Activity[] = [
  { id: 'spot-fake', number: '01', category: 'ai', title: 'Spot the Fake', description: 'Students examine a mixture of real and AI-generated images or articles and compete to identify which are authentic. The activity encourages observation, critical thinking and awareness of AI-generated misinformation.', skills: ['Observation', 'Critical thinking', 'AI literacy'] },
  { id: 'prompt-battle', number: '02', category: 'ai', title: 'Prompt Battle — Who Can Outsmart AI?', description: 'Teams receive the same creative challenge and compete to generate the best result by writing effective prompts. They compare their outputs and discover how the clarity, structure and creativity of instructions influence AI results.', skills: ['Prompt writing', 'Creativity', 'Evaluation'] },
  { id: 'makeover', number: '03', category: 'web', title: 'Website Makeover Challenge', description: 'Teams receive a basic or unattractive webpage and redesign it by improving colours, typography, spacing, headings and layout. The team that produces the most effective and visually appealing webpage wins the challenge.', skills: ['HTML & CSS', 'Visual hierarchy', 'Teamwork'] },
  { id: 'design-battle', number: '04', category: 'design', title: 'Design Battle', description: 'All teams receive the same theme, such as Save Water, School Fest or Life Without Exams, and create a digital poster. Designs are judged on creativity, visual appeal, communication and relevance to the theme.', skills: ['Visual communication', 'Design', 'Creativity'] },
  { id: 'create-brand', number: '05', category: 'design', title: 'Create a Brand in 15 Minutes', description: 'Teams invent a fictional company and create its name, logo, tagline and target audience within a limited time. The activity develops creativity, visual communication and basic marketing skills.', skills: ['Branding', 'Visual communication', 'Marketing basics'] },
  { id: 'invent', number: '06', category: 'innovation', title: "Invent Something That Doesn't Exist", description: 'Teams combine unrelated objects or concepts to invent a new product, draw a rough design and explain its purpose. They present their inventions in a short pitch, encouraging imagination and collaborative problem-solving.', skills: ['Imagination', 'Problem-solving', 'Pitching'] },
  { id: 'three-slides', number: '07', category: 'innovation', title: 'Three-Slide Challenge', description: 'Teams prepare a three-slide presentation about a random topic, product or invention and present it within one minute. The activity develops presentation skills, concise communication, teamwork and confidence.', skills: ['Presentation', 'Communication', 'Teamwork'] },
  { id: 'code-chaos', number: '08', category: 'coding', title: 'Code or Chaos? — Predict the Output', description: 'Display short code snippets containing loops, conditions or variables. Teams must predict the output before running the code, earning points for correct answers and explaining their logic.', skills: ['Python basics', 'Logical thinking'] },
  { id: 'bug-bounty', number: '09', category: 'coding', title: 'Bug Bounty — Fix the Broken Code', description: 'Give teams a program with intentional mistakes, such as an incorrect condition, a missing colon or a faulty calculation. The first team to find the bugs, correct the program and demonstrate that it works wins.', skills: ['Debugging', 'Syntax', 'Problem-solving'] },
  { id: 'mini-sprint', number: '10', category: 'coding', title: 'Build It in 15 Minutes — Mini Coding Sprint', description: 'Challenge students to build a small working program, such as a number-guessing game, quiz, calculator or rock-paper-scissors game, within 15 minutes. Give bonus points for creativity and extra features.', skills: ['Variables', 'Conditions', 'Loops'] },
];

export const members = [
  { name: 'Darshan C S', role: 'Technical Expert, Co-Lead Developer', introduction: 'Full stack engineering and AI development.', image: 'darshan-c-s.jpg', github: 'https://github.com/darshansathish2006', linkedin: 'https://www.linkedin.com/in/darshan-c-s-77ab43331', portfolio: 'https://darshancs.vercel.app' },
  { name: 'Andryan Durai Jebin', role: 'Co-Lead Developer', introduction: 'Backend development and AI engineering.', image: 'andryan-durai-jebin.jpg', github: 'https://github.com/Andryandurai', linkedin: 'https://www.linkedin.com/in/andryan-durai-bb2b40331', portfolio: 'https://andryan-portfolio.vercel.app/' },
  { name: 'Akshaya P', role: 'Frontend Developer, Data Analyst', introduction: 'Builds frontend interfaces and works with data.', image: 'akshaya-p.jpg', github: 'https://github.com/Akshaya0206-tech', linkedin: 'https://www.linkedin.com/in/akshaya-p-18693b331/', portfolio: '' },
  { name: 'Dinesh G', role: 'Data Analyst, UI/UX Designer', introduction: 'Works across data analysis and interface design.', image: 'dinesh-g.jpg', github: 'https://github.com/Dinesh6618/', linkedin: 'https://www.linkedin.com/in/dinesh6618/', portfolio: '' },
];

export const faqs = [
  ['Who can attend TEAM DADA workshops?', 'The proposed pathways are for school students in Classes 8–12 and college students. Catalogue recommendations are starting points, not prerequisites. Share your group’s background so we can discuss a suitable approach.'],
  ['Are the workshops suitable for beginners?', 'Yes. Introductory topics explain technology through approachable examples. Let us know your students’ prior experience when enquiring, especially for programming and game development.'],
  ['Can schools select multiple topics?', 'You can select multiple workshops in the enquiry form. We can discuss how topics might fit together for your students and available time.'],
  ['Can colleges request technical workshops?', 'College enquiries can focus on AI, prompt engineering, web development, programming, UI/UX, debugging or innovation. Tell us the level of technical depth you would like to explore.'],
  ['Are hands-on activities included?', 'Practical challenges are part of the proposed workshop approach. Choose activities that interest you and discuss their suitability, equipment needs and scope with the team.'],
  ['Can a workshop be customised for our institution?', 'Share your learning objectives, audience and requirements. The team can discuss topic combinations and suitable activities; the final session plan is agreed during the enquiry process.'],
  ['What about duration, pricing, equipment and certificates?', 'Duration, pricing, delivery mode, equipment, certificates and availability are not fixed on this site. Please discuss these details with TEAM DADA before making arrangements.'],
  ['How do we enquire about organising a session?', 'Complete the form to prepare an enquiry, then send the draft from your email app to teamdadaoffl@gmail.com. You can also copy or download the draft, or email the team directly. Preparing a draft does not send it or confirm a booking.'],
];

export function filterWorkshops(query: string, category: string, audience: string) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return workshops.filter(workshop => {
    const text = `${workshop.title} ${workshop.description} ${categories.find(c => c.id === workshop.category)?.full}`.toLocaleLowerCase();
    return (category === 'all' || workshop.category === category) && (audience === 'all' || workshop.audiences.includes(audience as Audience)) && words.every(word => text.includes(word));
  });
}
