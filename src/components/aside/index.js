import Image from "next/image";
function Aside() {
  return (
    <>
      <section className="h-[961px] flex">
        <aside className="bg-hero-pattern bg-no-repeat h-[961px] flex-[1.14] w-[807px] bg-cover">
          <p className="ml-[150px] pt-[50px] text-white text-3xl">FazzPay</p>
          <Image
            src="/phone.svg"
            alt="image"
            width={512}
            height={575}
            className="ml-[150px] pt-9 h-[575px] w-[512px]"
          />
          <p className="text-2xl font-bold ml-[150px] pt-3 text-white">
            App that Covering Banking Needs.
          </p>
          <p className="text-base ml-[150px] pt-7 w-[498px] text-white">
            FazzPay is an application that focussing in banking needs for all
            users in the world. Always updated and always following world
            trends. 5000+ users registered in FazzPay everyday with worldwide
            users coverage.
          </p>
        </aside>
      </section>
    </>
  );
}

export default Aside;
