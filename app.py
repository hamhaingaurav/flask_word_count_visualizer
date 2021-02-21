from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'fake_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class InputText(db.Model):
    id_ = db.Column('id', db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def __repr__(self):
        return str(id)+' '+str(date)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/save_text', methods=['POST'])
def save_text():
    if request.method == 'POST':
        input_text = InputText(text=request.form['text'])
        db.session.add(input_text)
        db.session.commit()
        return jsonify({'status':200})
    return jsonify({'status': 500})