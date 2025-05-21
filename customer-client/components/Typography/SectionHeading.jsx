const SectionHeading = ({ text, textSize }) => {
  return (
    <div className="">
      <h3
        className={`relative before:absolute before:top-[50%] before:translate-y-[-50%] before:left-0 before:w-[6px] before:h-[30px] before:rounded-xl before:bg-primary pl-5 font-core-sans-bold ${
          textSize || "text-[1.75rem] sm:text-[2.1rem]"
        }`}
      >
        {text}
      </h3>
    </div>
  );
};

export default SectionHeading;
