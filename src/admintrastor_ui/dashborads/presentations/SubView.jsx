import * as  React from 'react'
export default (props) => {
    const {style} = props;
    return (
        <div style={style}>
            {props.children&&props.children}
        </div>
    )
};