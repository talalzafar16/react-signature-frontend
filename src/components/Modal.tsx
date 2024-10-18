import { useState } from 'react';

const Modal = ({ toggle, closeModal }) => {
    const [plot, setPlot] = useState<string | undefined>('');
    const [blockName, setBlockName] = useState<string | undefined>('');
    const blockList: any = [
        'Tulip Extension Block',
        'Diamond Block',
        'Jade Extension Block',
        'Platinum Block',
        'Silver Block',
        'Tulip Block',
        'Broadway Commercial',
        'Executive Block',
        'Jasmine Block',
        'Rose Block',
        'Topaz Block',
        'Tulip Overseas',
        'Crystal Block',
        'Jade Block',
        'Overseas Block',
        'Sapphire Block',
        'Topaz Extension Block',
    ];

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
                    <input className="border border-stone-600" type="text" value={plot} onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        const values = (e.target as HTMLInputElement).value;
                        setPlot(values);
                    }} />
                    <h2>Block Name</h2>
                    <select
                     onChange={e => setBlockName(e.target.value)}
                    >
                        {
                            blockList.map(item => (
                                <option value={item}>{item}</option>
                            ))
                        }
                        {/* <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option> */}
                    </select>
                    <button onClick={() => {
                        console.log('blockName', blockName)
                        toggle(plot, blockName);

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