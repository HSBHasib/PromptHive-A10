// import PromptDetailsContent from '@/components/promptDetails/PromptDetailsContent';
// import { getPrompts } from '@/lib/api/prompts'
// import { getUsers } from '@/lib/api/users';
// import React from 'react'

// const PromptDetails = async ({params}) => {
//     const {id} = await params;
//     const {data} = await getPrompts();
//     const users = await getUsers();
//   return (
//     <div>
//       <PromptDetailsContent prompts={data} users={users}/>
//     </div>
//   )
// }

// export default PromptDetails







import PromptDetailsContent from '@/components/promptDetails/PromptDetailsContent';
import { getPrompts } from '@/lib/api/prompts';
import { getUsers } from '@/lib/api/users';
import React from 'react';

const PromptDetails = async ({ params }) => {
  const { id } = await params;
  const { data: allPrompts } = await getPrompts();
  const { data: allUsers } = await getUsers(); // ইউজার ডেটা যদি অ্যারেতে থাকে

  // নির্দিষ্ট প্রম্পট খুঁজে বের করা
  const singlePrompt = allPrompts.find((p) => p._id === id);
  
  // প্রম্পটের ক্রিয়েটর খুঁজে বের করা
  const creator = allUsers.find((u) => u._id === singlePrompt?.userId);

  return (
    <div>
      <PromptDetailsContent prompt={singlePrompt} creator={creator} />
    </div>
  );
};

export default PromptDetails;