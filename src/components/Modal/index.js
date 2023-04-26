function Modal({ info }) {
  return (
    <>
      <div className="h-screen w-screen fixed inset-0 z-[1] bg-black/10 flex justify-center items-center select-none">
        <div className="rounded-[12px] bg-white h-[100px] w-[200px] z-50 flex justify-center items-center">
          <p className="text-center font-bold">{info}</p>
        </div>
      </div>
    </>
  );
}
export default Modal;
