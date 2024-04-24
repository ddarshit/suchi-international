import React, { useState } from 'react'

export const CheckForm = (props) => {
  console.log("vak",props.value)
  const [isChecked, setIsChecked] = useState(props.value?? false);

  return (
    <div className='ml-5' style={{alignSelf:'flex-end'}}>
      
        <input type="checkbox" name="address" id="" checked={isChecked} value={isChecked}
          onChange={(e) => {
            console.log(e.target.checked)
            setIsChecked(!isChecked)
            

              props.handleCheckBox(e.target.checked)
            
            
          }}
          style={{marginLeft:2}}
        />
        <label htmlFor="Address" style={{marginLeft:5}}>
          {props.name}
           </label>
        
    </div>
  )
}
