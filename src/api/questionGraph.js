const questions_json = {
    nodes: [
        {index: 0, label: "מה המגדר שלך?"},
        {index: 1, label: "האם יש לך ילדים מתחת לגיל 18?"},
        {index: 2, label: "האם יש לך ילדים מתחת לגיל 5?"},
        {index: 3, label: "מה גובה שכר הברוטו החודשי שלך?"},
        {index: 4, label: "האם לך או לבן.ת הזוג היה עסק ב- 6 השנים האחרונות (משנת 2014)?"},
        {index: 5, label: "סיימנו!"},
        {index: 100, label: "הינך בעל סיכוי נמוך לקבלת החזר מס"},
        {index: 200, label: "יש לך סיכוי גבוה לקבלת החזר מס!"}
    ],
    edges: [
        {from: 0, to: 2, label: "זכר"},
        {from: 0, to: 1, label: "נקבה"},
        {from: 1, to: 2, label: "לא"},
        {from: 1, to: 2, label: "1"},
        {from: 1, to: 2, label: "2+"},
        {from: 2, to: 3, label: "לא"},
        {from: 2, to: 3, label: "1"},
        {from: 2, to: 3, label: "2+"},
        {from: 3, to: 100, label: 'עד 7000 ש"ח'},
        {from: 3, to: 4, label: '7000-10000 ש"ח'},
        {from: 3, to: 4, label: '7000-15000 ש"ח'},
        {from: 3, to: 200, label: 'מעל 15000 ש"ח'},
        {from: 4, to: 5, label: "כן, בחלקן"},
        {from: 4, to: 5, label: "כן, בכולן"},
        {from: 4, to: 200, label: "לא"}
    ]
};

export default questions_json;
