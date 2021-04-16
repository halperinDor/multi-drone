import ArmButton from './commands-buttons/arm-button';
import ModeButton from './commands-buttons/mode-button'
import TakeOffButton from './commands-buttons/take-off-button'
import LandButton from './commands-buttons/land-button'
import RTLButton from './commands-buttons/rtl-button'
import React from 'react';



function OptionsMenu(props){


  return (<div> {
      props.drone? (<table><thead>Commands:</thead>
                        <tbody>
                            <tr>{ArmButton(props.drone.arm, props)}</tr>
                            <tr>{LandButton(props.drone.arm, props)}</tr>
                            <tr>{RTLButton(props.drone.arm, props)}</tr>
                            <tr>{TakeOffButton(props.drone.arm, props)}</tr>
                            <tr>{ModeButton(props.drone.alt, props)}</tr>
                        </tbody>
                    </table>):null
      }

  </div>)
    

            

}

export default OptionsMenu;