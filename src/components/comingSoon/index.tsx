import Card from "components/card";

const ComingSoon = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="col-span-5 my-10 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
        <Card extra={"w-full h-full p-3"}>
          <div className="relative mb-3 items-center justify-between py-10 text-center lg:px-10">
            <label className="text-xl font-bold text-navy-700 dark:text-white">
              Coming Soon!
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComingSoon;
