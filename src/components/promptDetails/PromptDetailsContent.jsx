import PromptContent from "./PromptContent";
import PromptDetails from "./PromptDetails";
import PromptReview from "./PromptReview";
import ReviewCard from "./ReviewCard";

const PromptDetailsContent = ({
  prompt,
  creator,
  user,
  initialBookmarkStatus,
  reviews,
  totalReview
}) => {
  const isPrivate = prompt.visibility === "private";
  const isPremiumUser = user?.plan === "pro";

  const canAccessPrivate = !isPrivate || isPremiumUser;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col">
        <PromptContent
          prompt={prompt}
          user={user}
          initialBookmarkStatus={initialBookmarkStatus}
          canAccessPrivate={canAccessPrivate}
        />
        <ReviewCard prompt={prompt} user={user} canAccessPrivate={canAccessPrivate} />
      </div>

      <div className="lg:col-span-1">
        <PromptDetails prompt={prompt} creator={creator} reviews={reviews} />
        <PromptReview promptId={prompt._id} reviews={reviews} totalReview={totalReview} />
      </div>
    </div>
  );
};

export default PromptDetailsContent;

