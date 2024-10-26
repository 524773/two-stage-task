// /api/save_data.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body; // 受け取ったデータを取得
        console.log(data); // デバッグ用にコンソールに表示

        // データを保存する処理を書く
        // 例: データベースに保存する場合のロジックをここに書く

        res.status(200).json({ message: 'データが保存されました' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
