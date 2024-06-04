import React, { useState, useEffect, useMemo } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    setStatus('work');
    setTime(1200);
    setTimer(setInterval(updateTimer, 1000));
  };

  const stopTimer = () => {
    setStatus('off');
    clearInterval(timer);
    setTimer(null);
    setTime(0);
  };

  const updateTimer = () => {
    setTime(prevTime => {
      if (prevTime <= 1) {
        if (status === 'work') {
          setStatus('rest');
          return 20;
        } else if (status === 'rest') {
          setStatus('work');
          return 1200;
        }
      }
      return prevTime - 1;
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formattedTime = useMemo(() => formatTime(time), [time]); 
  
  useEffect(() => {
    if (status === 'off') {
      clearInterval(timer);
    }
  }, [status, timer]);

  const closeApp = () => {
    window.close();
  };
  
  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && (<img src="./images/work.png" />)}
      { status === 'rest' && (<img src="./images/rest.png" />)}
      { status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      { status === 'off' && (<button onClick={startTimer} className="btn">Start</button>)}
      { status !== 'off' && (<button onClick={stopTimer} className="btn">Stop</button>)}
      <button onClick={closeApp} className="btn btn-close">X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
