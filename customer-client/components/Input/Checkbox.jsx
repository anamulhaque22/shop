const Checkbox = () => {
  return (
    <div className="flex items-center">
      <label
        className="relative flex items-center rounded-full cursor-pointer"
        htmlFor="login"
        // dataRippleDark="true"
      >
        <input
          id="login"
          type="checkbox"
          className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none border border-[#BEBCBD] transition-all before:absolute before:top-2/4 before:left-2/4  before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:bg-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
        />
        <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
      <label
        className="ml-3 mt-px font-light text-gray-700 cursor-pointer select-none"
        htmlFor="login"
      >
        Save my information for a faster checkout
      </label>
    </div>
  );
};

export default Checkbox;
