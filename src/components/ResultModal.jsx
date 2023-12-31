import {forwardRef, useImperativeHandle, useRef} from "react";
const ResultModal = forwardRef (function ResultModal({targetTime, remainingTime , onReset}, ref){
    const dialog = useRef();
    const remainingTimeFormated = (remainingTime/1000).toFixed(2);
    const userLost = remainingTime <= 0;
    const score = Math.round((1 - remainingTime/(targetTime * 1000))*100);
    useImperativeHandle(ref,()=>{
        return({
            open(){
               dialog.current.showModal();
            }
        })
    });
    return( 
       <dialog ref={dialog} onClose={onReset} className="result-modal">
        {userLost && <h2>You Lost</h2>}
        {!userLost && <h2>You Score {score}</h2>}
        <p>The target time was <strong>{targetTime} seconds</strong></p>
        <p>You stoped the timer with <strong>{remainingTimeFormated} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>close</button>
        </form>
       </dialog> 
    )

});
export default ResultModal;