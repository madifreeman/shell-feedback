import { ChevronRightIcon } from '@heroicons/react/solid';
import Container from '/components/Container';
import Link from 'next/link';

const Heading = ({ pageTitle, breadcrumbs = [], bgImage, rightContent }) => (
  <div className='relative overflow-hidden bg-gradient-to-br from-teal-900 to-teal-500'>
    <Container>
      <div className='relative z-10 pt-16 pb-32'>
        <div>
          <nav className='flex justify-center md:justify-start' aria-label='Breadcrumb'>
            <ol className='flex items-center space-x-4'>
              <li>
                  <div className='flex items-center'>
                    <p className='text-sm font-medium text-teal-200'>
                      Selection Days Feedback
                    </p>
                  </div>
              </li>
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.title}>
                  <div className='flex items-center'>
                    <ChevronRightIcon
                      className='flex-shrink-0 w-5 h-5 text-teal-500'
                      aria-hidden='true'
                    />
                    {breadcrumb.link ? (
                      <Link href={breadcrumb.link ? breadcrumb.link : '#'}>
                        <a className='ml-4 text-sm font-medium text-teal-200'>{breadcrumb.title}</a>
                      </Link>
                    ) : (
                      <p className='ml-4 text-sm font-medium text-teal-200 cursor-default'>
                        {breadcrumb.title}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className='flex flex-col items-center mt-3 md:flex-row md:justify-between'>
          <div className='flex-1 min-w-0'>
            <h2 className='text-3xl font-bold leading-7 text-white sm:text-4xl sm:truncate'>
              {pageTitle}
            </h2>
          </div>
          {rightContent}
        </div>
      </div>
    </Container>
    <img
      className='absolute top-0 left-0 z-0 object-cover w-full h-full opacity-25'
      src={bgImage}
    />
  </div>
);

export default Heading;
