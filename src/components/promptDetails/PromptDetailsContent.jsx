import PromptContent from "./PromptContent";
import PromptDetails from "./PromptDetails";
import PromptReview from "./PromptReview";
import ReviewCard from "./ReviewCard";

const PromptDetailsContent = ({ prompt, creator, user, initialBookmarkStatus }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <PromptContent prompt={prompt} user={user} initialBookmarkStatus={initialBookmarkStatus} />
        <PromptReview promptId={prompt._id} />
        <ReviewCard promptId={prompt._id} />
      </div>

      <div className="lg:col-span-1">
        <PromptDetails prompt={prompt} creator={creator} />
      </div>
    </div>
  );
};

export default PromptDetailsContent;