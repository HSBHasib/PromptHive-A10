import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";

const StepsToMastery = () => {
  const data = {
    title: "Prompt Playground",
    tagline: "LEARN & GROW",
    description:
      "Experience the science of high-performance prompt engineering. See exactly how our platform transforms basic ideas into production-grade structured masterpieces.",
    features: [
      {
        label: "Define Personas & Constraints",
        desc: "Assign specific architectural roles, volumetric lighting values, and aspect ratio systems.",
      },
      {
        label: "Compare Text vs. Engineered Output",
        desc: "Instant visual feedback on lighting density shifts and cyberpunk tone parameters.",
      },
      {
        label: "Live Structured Formats",
        desc: "Toggle programmatic parameter injection guidelines for clean prompt asset distributions.",
      },
    ],
    ctaText: "Explore Guide Prompts",
    codeSnippet: `{
  "role": "Cinematic Director & AI Artist",
  "style": "Hyper-realistic Cyberpunk Cyber-Noir",
  "subject": "Astronaut in red suit walking on elevated skybridge",
  "environment": {
    "location": "Futuristic megalopolis city",
    "architecture": "Monolithic towering grid skyscrapers",
    "lighting": "Cyber-neon teal and neon-red structural illumination"
  },
  "parameters": {
    "engine": "Midjourney v6.0",
    "aspect_ratio": "1:1",
    "rendering": "Unreal Engine 5 volumetric ray-tracing, 8k"
  }
}`,
    // Using your exactly uploaded cyberpunk asset via local state reference or public source maps
    demoImage:
      "https://plus.unsplash.com/premium_photo-1682124843954-eb395dfa50ea?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <div className="bg-[#EFE2E2] py-15 my-15 px-6 w-full select-none overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Content */}
        <LeftSideContent data={data} />

        {/* Right Side Content */}
        <RightSideContent data={data} />
      </div>
    </div>
  );
};

export default StepsToMastery;
