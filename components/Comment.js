import ProfileImage from '/components/ProfileImage';

const FeedbackComment = ({ comment }) => {

  return (
    <li className='flex items-center justify-between py-8 border-t border-gray-200'>
      <div className='flex flex-wrap w-full items-center sm:flex-nowrap'>
        <div className='flex-shrink-0 block w-32 h-32 mx-auto sm:w-24 sm:h-24 sm:mx-0'>
          <div className='object-cover w-32 h-32 overflow-hidden border-2 border-gray-200 rounded-full sm:w-24 sm:h-24 hover:border-teal-600'>
            <ProfileImage />
          </div>
        </div>
        <div className='flex-shrink ml-3 w-full pt-2 text-center sm:pl-3 sm:w-auto sm:text-left'>
          <div className='inline-block w-auto px-3 py-2 text-base italic bg-gray-100 border border-gray-200 rounded'>
            {comment}
          </div>
        </div>
      </div>
    </li>
  );
};

export default FeedbackComment;
