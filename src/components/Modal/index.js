function Modal({ info, info2 }) {
  return (
    <>
      <div className="h-screen w-screen fixed inset-0 z-[1] bg-black/10 flex justify-center items-center select-none">
        <div className="rounded-[12px] bg-white h-[100px] w-[350px] z-50 ">
          <p className="text-center text-xl font-bold">{info}</p>
          <p className="text-center mt-4 font-medium">{info2}</p>
        </div>
      </div>
    </>
  );
}
export default Modal;
