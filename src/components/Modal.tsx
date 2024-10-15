import {useState} from 'react';

const Modal = ({toggle,closeModal}) => {
    const [plot, setPlot] = useState<number | undefined>(0);
    
    return (
        <div className="absolute z-[328472384728478248248274] backdrop-blur-xl bg-black/30 h-full w-full flex justify-center items-center">
            <div className="px-5 py-3 bg-white">
                <div className="flex justify-between py-3">
                    <h2>Modal Header</h2>
                    <span className="" onClick={() => closeModal()}>&times;</span>
                </div>
                <div className="flex flex-col">
                    {/* <input className="border border-stone-600" type="text" placeholder="latitude"  />
                    <input className="border border-stone-600" type="text" placeholder="longitude" /> */}
                    <input className="border border-stone-600" type="number" value={plot} onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        const values = Number((e.target as HTMLInputElement).value);
                        setPlot(values);
                    }} />
                    <button onClick={()=> {
                        
                        toggle(plot);
                        
                        }}>Submit</button>
                </div>
                {/* <div className="modal-footer">
                    <h3>Modal Footer</h3>
                </div> */}
            </div>
        </div>
    )
}

export default Modal;