import React, { useEffect, useState } from 'react';

const Watch = () => {
    const [minDisplay, setMinDisplay] = useState('00:');
    const [secDisplay, setSecDisplay] = useState('00:');
    const [centiSecDisplay, setCentiSecDisplay] = useState('00');
    const [lapsStarted, setLapsStarted] = useState(false);

    useEffect(() => {
        let isPlay = false;
        let secCounter = 0;
        let centiCounter = 0;
        let minCounter = 0;
        let secInterval;
        let centiSecInterval;

        const playbutton = document.getElementsByClassName("play")[0];
        const lapbutton = document.getElementsByClassName("lap")[0];
        const resetbutton = document.getElementsByClassName("reset")[0];
        const bg = document.getElementsByClassName("outercircle")[0];

        const toggle = () => {
            lapbutton.classList.toggle("hidden");
            resetbutton.classList.toggle("hidden");
        }

        const updateDisplay = () => {
            setMinDisplay(`${minCounter < 10 ? '0' : ''}${minCounter}:`);
            setSecDisplay(`${secCounter < 10 ? '0' : ''}${secCounter}:`);
            setCentiSecDisplay(`${centiCounter < 10 ? '0' : ''}${centiCounter}`);
        }

        const play = () => {
            if (!isPlay) {
                bg.classList.add("animation-bg");
                playbutton.classList.add("stopcolor");
                playbutton.innerHTML = "STOP";
                secInterval = setInterval(() => {
                    secCounter++;
                    if (secCounter === 60) {
                        secCounter = 0;
                        minCounter++;
                    }
                    updateDisplay();
                }, 1000);
                centiSecInterval = setInterval(() => {
                    centiCounter++;
                    if (centiCounter === 100) {
                        centiCounter = 0;
                    }
                    updateDisplay();
                }, 10);
                isPlay = true;
                toggle();
            } else {
                stop();
            }
        }

        const stop = () => {
            clearInterval(secInterval);
            clearInterval(centiSecInterval);
            playbutton.innerHTML = "PLAY";
            bg.classList.remove("animation-bg");
            playbutton.classList.remove("stopcolor");
            isPlay = false;
            toggle();
        }

        const reset = () => {
            stop();
            setMinDisplay('00:');
            setSecDisplay('00:');
            setCentiSecDisplay('00');
            secCounter = 0;
            centiCounter = 0;
            minCounter = 0;
            const lapItem = document.querySelector(".laps");
            lapItem.innerHTML = '';
            setLapsStarted(false);
        }

        const Lap = () => {
            const lapItem = document.querySelector(".laps");
            const li = document.createElement("li");
            const timestamp = document.createElement("span");
            const lapTime = `${minCounter < 10 ? '0' : ''}${minCounter} : ${secCounter < 10 ? '0' : ''}${secCounter} : ${centiCounter < 10 ? '0' : ''}${centiCounter}`;
            timestamp.innerHTML = lapTime;
            li.setAttribute("class", "laps-list");
            timestamp.setAttribute("class", "timestamp");
            li.appendChild(timestamp);
            lapItem.appendChild(li);
            setLapsStarted(true);
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
        <div className="contents">
            <div className='stopwatch justify-content-center vh-100 mt-5 fs-1'>
                <div className="outercircle">
                    <div className="innercircle">
                        <h1 className="timer">
                            <span className="minutes">{minDisplay}</span>
                            <span className="seconds">{secDisplay}</span>
                            <span className="milliseconds">{centiSecDisplay}</span>
                        </h1>
                    </div>
                </div>

                <div className="bottomPart">
                    <button className="reset  mx-2">Reset</button>
                    <button className="play mx-2">PLAY</button>
                    <button className="lap   mx-2">Lap</button>
                </div>

                <ul className="laps" style={{ display: lapsStarted ? 'block' : 'none' }}>

                </ul>
            </div>
        </div>
    );
};

export default Watch;
