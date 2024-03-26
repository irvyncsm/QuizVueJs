from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*" : {"origins": "*"}})

def mkpath(p):
    import os
    return os.path.normpath(os.path.join(os.path.dirname(__file__), p))

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+mkpath('../quiz.db')

app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run(debug=True)
    
    