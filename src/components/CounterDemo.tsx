"use client";

import { useState } from "react";

export default function CounterDemo() {
    const [count, setCount] = useState(0);

    function handleClick() {
        //setCount(count + 1);
        //setCount(count + 1);
        //setCount(count + 1);
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 1);
        
        //console.log('Count = ${count} ครั้ง ');
    }

    return (
        <button type="button" onClick={handleClick}>
            คลิกแล้ว {count} ครั้ง
        </button>
    );
}