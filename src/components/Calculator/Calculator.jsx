import React, { useState, useRef } from 'react';
import ButtonItem from '../ButtonItem/ButtonItem';
import './Calculator.css'

const symbols = ['AC', '+/-', '%', '÷', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', '#', 0, '.', '='];

export default function Calculator() {
    const monitorRef       = useRef('');
    const historyContainer = useRef(null);
    const globalResult     = useRef('0');
    const [history, setHistory] = useState([]);

    const operationSum = [ '+', '-', '÷', '×', '%' ]
    const operationChange = {
        '=': () => {
            if(operationSum.includes(globalResult.current.at(-1)) || globalResult.current.at(-1) == '.') return;
            setHistory([...history, globalResult.current]);

            const solved = eval(changeSymbols(globalResult.current));
            monitorRef.current.innerText = globalResult.current = String(String(solved).includes('.') ? (String(solved).split('.').at(-1).length > 3 ? solved.toFixed(3) : solved) : String(solved));
            historyContainer.current.scrollTop += historyContainer.current.scrollHeight;
        },
        '+/-': () => globalResult.current = String(eval(changeSymbols(globalResult.current)) * -1),
        'AC':  () => globalResult.current = '0',
        '#':   () => window.open('https://github.com/wrouruy') // я задоволений
    }

    // fill in the corresponding buttons with color
    const colorToSymbol = {};
    [7, 8, 9, 4, 5, 6, 1, 2, 3, '#', 0, '.'].forEach(el => colorToSymbol[el] = '#5E6960');
    ['AC', '+/-', '%'].forEach(el => colorToSymbol[el] = '#7D877F');
    ['÷', '×', '-', '+', '='].forEach(el => colorToSymbol[el] = '#FF951B');

    function changeSymbols(symbols){
        return symbols.replace(/[×]/g, '*')
                      .replace(/[÷]/g, '/');
    }

    function sumBtn(symbol){
        const splitExample = globalResult.current.split(new RegExp(operationSum.map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g'));

        if(typeof symbol == 'number' && globalResult.current !== '0')
            globalResult.current += String(symbol);

        if(typeof symbol == 'number' && globalResult.current === '0')
            globalResult.current = String(symbol);

        if(operationSum.includes(symbol) && !operationSum.includes(globalResult.current.at(-1)) ||
            symbol == '.' && !operationSum.includes(globalResult.current.at(-1)) && !splitExample.at(-1).includes('.')){
            globalResult.current += symbol;
        }

        if(Object.keys(operationChange).includes(symbol))
            operationChange[symbol]();

        monitorRef.current.innerText = globalResult.current;
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
