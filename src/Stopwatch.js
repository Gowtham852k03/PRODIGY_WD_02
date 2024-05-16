import React, { useEffect, useState } from 'react';

const Stopwatch = () => {
    const [minDisplay, setMinDisplay] = useState('00:');
    const [secDisplay, setSecDisplay] = useState('00:');
    const [centiSecDisplay, setCentiSecDisplay] = useState('00');

    useEffect(() => {
        const playbutton = document.getElementsByClassName("play")[0];
        const lapbutton = document.getElementsByClassName("lap")[0];
        const resetbutton = document.getElementsByClassName("reset")[0];
        const lap = document.getElementsByClassName("laps-list")[0];

        let isPlay = false;
        let isReset = false;
        let secCounter = 0;
        let lapItem = 0;
        let centiCounter = 0;
        let minCounter = 0;
        let sec;
        let min;
        let centiSec;

        const toggle = () => {
            lapbutton.classList.remove("hidden");
            resetbutton.classList.remove("hidden");
        }

        const play = () => {
            if (!isPlay && !isReset) {
                playbutton.innerHTML = "STOP";
                min = setInterval(() => {
                    if (minCounter === 60) {
                        minCounter = 0;
                    }
                    setMinDisplay(`${minCounter < 9 ? '0' : ''}${minCounter}:`);
                }, 60 * 1000)
                sec = setInterval(() => {
                    if (secCounter === 60) {
                        secCounter = 0;
                    }
                    setSecDisplay(`${secCounter < 9 ? '0' : ''}${++secCounter}:`);
                }, 1000)
                centiSec = setInterval(() => {
                    if (centiCounter === 100) {
                        centiCounter = 0
                    }
                    setCentiSecDisplay(`${centiCounter < 10 ? '0' : ''}${centiCounter++}`);
                }, 10)
                isPlay = true;
                isReset = true;
                toggle();
            } else {
                playbutton.innerHTML = "PLAY";
                clearInterval(sec);
                clearInterval(min);
                clearInterval(centiSec);
                isPlay = false;
                isReset = false;
                toggle();
            }
            toggle();
        }

        const reset = () => {
            isReset = true;
            play();
            lapbutton.classList.remove("hidden");
            resetbutton.classList.remove("hidden");
            setSecDisplay('00:');
            setMinDisplay('00:');
            setCentiSecDisplay('00');
            lap.innerHTML = '';
            lapItem = 0;
        }

        const Lap = () => {
            lapItem = document.querySelector(".laps");
            const li = document.createElement("li");
            const timestamp = document.createElement("span");
            timestamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;
            li.setAttribute("class", "laps-list");
            timestamp.setAttribute("class", "timestamp");
            li.appendChild(timestamp);
            lapItem.appendChild(li);
        }

        playbutton.addEventListener("click", play);
        resetbutton.addEventListener("click", reset);
        lapbutton.addEventListener("click", Lap);

        return () => {
            playbutton.removeEventListener("click", play);
            resetbutton.removeEventListener("click", reset);
            lapbutton.removeEventListener("click", Lap);
        };
    }, []);

    return (
        <div className="container">

            <div className="outercircle">
                <div className="innercircle">
                    <h1 className="timer  increased-font">
                        <span className="minutes" style={{ width: '60px' }}>{minDisplay}</span>
                        <span className="seconds" style={{ width: '60px' }}>{secDisplay}</span>
                        <span className="milliseconds" style={{ width: '40px' }}>{centiSecDisplay}</span>
                    </h1>
                </div>
            </div>

            <div className="bottomPart">
                <button className="reset btn btn-primary mx-2">Reset</button>
                <button className="play btn btn-success mx-2">PLAY</button>
                <button className="lap btn btn-secondary mx-2">Lap</button>
            </div>

            <div>
                <ul className=" laps">
                    <li className="laps-list">
                        <span className='number'>1</span>
                        <span className='timestamp'>00.00.00</span>
                    </li>
                </ul>
            </div>




        </div >
    );
};

export default Stopwatch;