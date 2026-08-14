// saveResults.js

export async function saveResults(participant_id, results, birthday) {
  try {
    const response = await fetch('/api/saveResults', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participant_id, results, birthday }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('データ保存成功:', data.message);
      return data;
    } else {
      console.error('サーバーエラー:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('送信エラー:', error);
    throw error;
  }
}
