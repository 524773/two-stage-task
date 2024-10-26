import Link from 'next/link';
import { initJsPsych } from 'jspsych';
import 'jspsych/css/jspsych.css';
import two_step_task from '../src/two_step_task'; // 正しい相対パスを指定


export default function Home() {
  const startExperiment = () => {
    const jsPsych = initJsPsych({
      on_finish: function() {
        jsPsych.data.displayData();
      }
    });

    // two_step_taskの初期化
    two_step_task.default_setup(); // two_step_taskの初期化

    const timeline = [
      // two_step_taskの最初の指示を追加
      two_step_task.trials.interactive_instructions(),
      // 他のtwo_step_taskのトライアルを追加
      {
        timeline: [two_step_task.trials.single_trial()],
        repetitions: 10 // 例としてリピート数を指定
      },
      {
        type: 'html-keyboard-response',
        stimulus: '実験が終了しました。何かキーを押してください。',
        on_finish: () => {
          const data = jsPsych.data.get().json();
          sendData(data);
        }
      },
    ];

    jsPsych.run(timeline);
  };

  function sendData(data) {
    fetch('/api/save_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      console.log('データが保存されました:', result);
    })
    .catch(error => {
      console.error('データ保存エラー:', error);
    });
  }

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <button onClick={startExperiment}>実験を開始する</button>
      <Link href="/about">About Us</Link>
    </div>
  );
}
