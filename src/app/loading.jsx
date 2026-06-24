import { Spinner } from "@heroui/react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFE2E270]">
      <Spinner
        color="default" 
        size="xl" 
        className="text-[#867070]" 
      />
    </div>
  );
}

export default Loader
