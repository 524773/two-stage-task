// pages/experiment.js
import Link from 'next/link';
import { initJsPsych } from 'jspsych';
import 'jspsych/css/jspsych.css';
import two_step_task from '../src/two_step_task'; // 相対パスでインポート

export default function Experiment() {
  const startExperiment = () => {
    const jsPsych = initJsPsych({
      on_finish: function() {
        const data = jsPsych.data.get().json();
        sendData(data);
        jsPsych.data.displayData();
      },
    });

    two_step_task.images.set_files_to_default();

    const timeline = [
      {
        type: 'html-keyboard-response',
        stimulus: '準備中です...'
      },
      two_step_task.trials.initialize_experiment(),
      two_step_task.trials.example_instructions(),
      {
        timeline: [two_step_task.trials.single_trial()],
        repetitions: 100
      },
    ];

    jsPsych.run(timeline);
  };

  const sendData = (data) => {
    fetch('https://your-server-url/save_data', {
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
  };

  return (
    <div>
      <h1>実験が始まります</h1>
      <button onClick={startExperiment}>実験を開始する</button>
      <Link href="/">戻る</Link>
    </div>
  );
}
