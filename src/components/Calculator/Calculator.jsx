import React, { useState, useRef } from 'react';
import ButtonItem from '../ButtonItem/ButtonItem';
import './Calculator.css'

const symbols = ['AC', '+/-', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '#', 0, '.', '='];

export default function Calculator() {
    const monitorRef       = useRef('');
    const historyContainer = useRef(null);
    const globalResult     = useRef('');
    const [history, setHistory] = useState([]);

    const operationSum = [ '+', '-', '/', '*', '.', '%' ]
    const operationChange = {
        '=': () => {
            setHistory([...history, globalResult.current]);

            const solved = eval(globalResult.current);
            monitorRef.current.innerText = globalResult.current = (String(solved).length > 3 ? solved.toFixed(3) : solved);
            historyContainer.current.scrollTop += historyContainer.current.scrollHeight;

        },
        '+/-': () => globalResult.current = eval(globalResult.current) * -1,
        'AC': () => globalResult.current = '',
        '#': () => window.open('https://github.com/wrouruy') // я задоволений
    }

    // fill in the corresponding buttons with color
    const colorToSymbol = {};
    [7, 8, 9, 4, 5, 6, 1, 2, 3, '#', 0, '.'].forEach(el => colorToSymbol[el] = '#5E6960');
    ['AC', '+/-', '%'].forEach(el => colorToSymbol[el] = '#7D877F');
    ['/', '*', '-', '+', '='].forEach(el => colorToSymbol[el] = '#FF951B');

    function sumBtn(symbol){
        if(typeof symbol == 'number' || operationSum.includes(symbol))
            globalResult.current += String(symbol);

        if(Object.keys(operationChange).includes(symbol))
            operationChange[symbol]();

        monitorRef.current.innerText = globalResult.current;
        // monitorRef.current.scrollLeft =  - monitorRef.current.clientWidth;
        monitorRef.current.scrollTo({
            left: monitorRef.current.scrollWidth - monitorRef.current.clientWidth,
            behavior: 'smooth'
        });
    }

    return (
        <div className='root-Calculator'>
            <div className='historyContainer' ref={historyContainer}>
                {history.map((el, i) => (
                    <p key={i}>{el}</p>
                ))}
            </div>
            <div className='monitor' ref={monitorRef}>0</div>
            {symbols.map((el) => (
                <div key={el} onClick={() => sumBtn(el)}>
                    <ButtonItem symbol={el} bgcolor={colorToSymbol[el]}/>
                </div>
            
            ))}
        </div>
    )
}
