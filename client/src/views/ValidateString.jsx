import React, {useContext, useEffect, useRef, useState} from 'react'
import {MainContext} from '../context/MainContext'
import {TransitionDiagram} from "../components/FAComponents/TransitionDiagram.jsx";
import {NumStates} from "../components/FAComponents/NumStates.jsx";
import {NumAlphabets} from "../components/FAComponents/NumAlphabets.jsx";
import {StartState} from "../components/FAComponents/StartState.jsx";
import {FinalStates} from "../components/FAComponents/FinalStates.jsx";
import {UtilContext} from "../context/UtilContext.jsx";
import {DFATransitionTable} from "../components/FAComponents/DFATransitionTable.jsx";

export const ValidateString = () => {
  const {setNavBarSelect} = useContext(UtilContext);
  const inputStringRef = useRef(null);
  useEffect(() => {
    setNavBarSelect('Validate String');
    window.scrollTo({behavior: "smooth", top: 0})
    inputStringRef.current?.focus();
  })

  const {fa, error, handleString, inputString, validateFA, isAccepted} = useContext(MainContext);

  const [showTable, setShowTable] = useState(false);
  const [showFa, setShowFa] = useState(false);
  return (<main className={'flex flex-col w-full gap-4'}>
      <section className={'flex flex-col gap-4'}>
        <section className={'flex items-center'}>
          <div className={'flex flex-col gap-1 border-r-2 pr-4 border-blue-500'}>
            <div className={'w-fit flex items-center gap-2'}>
              <label htmlFor="">Input String: </label>
              <div className={'flex flex-col gap-1'}>
                <input className={'py-1'} ref={inputStringRef} onKeyDown={({key}) => {
                  key === 'Enter' && validateFA()
                }} value={inputString} onChange={handleString} type="text" placeholder='Enter string...'/>
                <span className={'text-red-500 text-xs'}>{error && error.stringError}</span>
              </div>
            </div>
          </div>
          <div className={'pl-4'}>
            <span className={"font-semibold"}>{inputString} is {isAccepted ? 'accepted' : 'not accepted'}</span>
          </div>
        </section>

        <div className={'flex flex-col gap-4'}>
          <TransitionDiagram/>
          <div className={"flex gap-4"}>
            <button onClick={(event) => {
              event.stopPropagation();
              setShowTable(!showTable);
            }}
                    className={'transition duration-200 bg-slate-500 w-fit px-8 py-2 rounded-[20px] text-white text-opacity-70 hover:bg-slate-600'}>
              Toggle transition table
            </button>
            <button onClick={(event) => {
              event.stopPropagation();
              setShowFa(!showFa);
            }}
                    className={'transition duration-200 bg-slate-500 w-fit px-8 py-2 rounded-[20px] text-white text-opacity-70 hover:bg-slate-600'}>
              Toggle FA set
            </button>
          </div>
          {showTable && <DFATransitionTable/>}
        </div>
        {showFa && <div className={'grid grid-cols-4 gap-4 w-full'}>
          <NumStates/>
          <NumAlphabets/>
          <StartState/>
          <FinalStates/>
        </div>}
      </section>
    </main>)
}
