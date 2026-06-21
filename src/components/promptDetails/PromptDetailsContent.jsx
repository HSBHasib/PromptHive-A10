// import PromptContent from "./PromptContent";
// import PromptDetails from "./PromptDetails";
// import PromptReview from "./PromptReview";
// import ReviewCard from "./ReviewCard";

// const PromptDetailsContent = ({ prompts, users }) => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <PromptContent  />
//         <PromptReview  />
//         <ReviewCard />
//         <PromptDetails />
//     </div>
//   );
// };

// export default PromptDetailsContent












import PromptContent from "./PromptContent";
import PromptDetails from "./PromptDetails";
import PromptReview from "./PromptReview";
import ReviewCard from "./ReviewCard";

const PromptDetailsContent = ({ prompt, creator }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* বাম পাশের কন্টেন্ট */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <PromptContent prompt={prompt} />
        <PromptReview promptId={prompt._id} />
        <ReviewCard promptId={prompt._id} />
      </div>

      {/* ডান পাশের ডিটেইলস সাইডবার */}
      <div className="lg:col-span-1">
        <PromptDetails prompt={prompt} creator={creator} />
      </div>
    </div>
  );
};

export default PromptDetailsContent;