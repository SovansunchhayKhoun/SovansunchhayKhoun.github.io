import React, {useContext} from 'react'
import {MainContext} from '../../context/MainContext'

export const NumStates = () => {
  const {nfa, fa, trapCheck, generateStates, error, adjustTrap} = useContext(MainContext);
  const {faStates} = fa;
  return (
    <div
      className='p-4 border-2 rounded-tl-md rounded-tr-md border-blue-500 w-full shadow-lg flex flex-col gap-2 justify-center'>
      {/* get number of states */}
      <label className={"flex gap-1 items-center"} htmlFor="state">
        <span>State:</span>
        <input
          value={faStates.length || 0}
          min={"0"} type="number" required
          max={"5"}
          onChange={event => {
            generateStates(event)
          }}
          className="border-2 border-blue-500 px-2 py-1 w-full" id="state" placeholder='Number of States...'/>
      </label>
      <div className='flex flex-col gap-2'>
        <div>
          Your States [ {faStates?.map((fs, key) => {
          return <span key={key}>{fs}{faStates.length - 1 !== key && ', '}</span>
        })} ]
        </div>
        {faStates?.length > 0 && (
          <div className='flex items-center gap-1'>
            <input
              className="border-2 border-blue-500"
              checked={trapCheck} type="checkbox" onChange={(event) => {
              !nfa && adjustTrap(nfa, event)
            }}/>
            Include trap?
          </div>
        )}

      </div>
    </div>
  )
}
