export default function Container({ verticalPadding, children }) {
  return (
    <div
      className={
        verticalPadding ? 'py-16 sm:py-24' : '',
        'relative z-40 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
      }
    >
      <div className='max-w-3xl mx-auto lg:max-w-none'>{children}</div>
    </div>
  );
}
