import Image from "next/image";

const Feedback = () => {
  return (
    <div className="p-6 border-2 border-[#BEBCBD] rounded-lg">
      <div className="flex items-start justify-between">
        <Image
          src="/images/feedback.png"
          alt="Feedback"
          width={60}
          height={60}
        />
        <div className="flex">
          <Image
            src="/images/icon/star/star-full.png"
            alt="Feedback"
            width={23}
            height={23}
          />
          <Image
            src="/images/icon/star/star-full.png"
            alt="Feedback"
            width={23}
            height={23}
          />
          <Image
            src="/images/icon/star/star-full.png"
            alt="Feedback"
            width={23}
            height={23}
          />
          <Image
            src="/images/icon/star/star-full.png"
            alt="Feedback"
            width={23}
            height={23}
          />
          <Image
            src="/images/icon/star/star-full.png"
            alt="Feedback"
            width={23}
            height={23}
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-core-sans-medium text-[1.375rem]">Floyd Miles</h3>
        <p className="font-causten-regular mt-5 text-sm text-secondary-light">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit. Exercitation veniam consequat sunt nostrud
          amet.
        </p>
      </div>
    </div>
  );
};

export default Feedback;
