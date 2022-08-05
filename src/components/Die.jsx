export default function Die(props){
    return(
        <div 
            className={`die ${props.isHeld ? 'held' :""}`}
            onClick={props.toggleHold}
        >
            {props.value}
        </div>
    )
}