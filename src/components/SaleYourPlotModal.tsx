import SaleContactForm from "./SaleContactForm";

const SaleYourPlotModal = ({ closeModal }) => {
  return (
    <div className="absolute z-[328472384728478248248274] backdrop-blur-xl bg-black/30 h-full w-full flex justify-center items-center">
      <div className="px-5 py-3 bg-white">
        <div className="w-full flex items-end justify-end">
          <span
            className="hover:cursor-pointer text-2xl font-bold"
            onClick={() => closeModal(false)}
          >
            &times;
          </span>
        </div>
        <div className="flex justify-between py-3">
          <h2 className="text-xl text-center w-full font-bold">
            Sale Your Plot
          </h2>
        </div>
        <SaleContactForm closeModal={closeModal} />
      </div>
    </div>
  );
};

export default SaleYourPlotModal;
