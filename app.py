from flask import Flask, render_template, request, jsonify, _app_ctx_stack
from sqlite3 import dbapi2 as sqlite3

DATABASE = 'feature_requests.db'
DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)
app.config["CACHE_TYPE"] = "null"


def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql') as f:
            db.cursor().executescript(f.read().decode('utf-8'))
        db.commit()


def get_db():
    top = _app_ctx_stack.top
    if not hasattr(top, 'sqlite_db'):
        top.sqlite_db = sqlite3.connect(app.config['DATABASE'])
        top.sqlite_db.row_factory = sqlite3.Row
    return top.sqlite_db


@app.teardown_appcontext
def close_database(exception):
    top = _app_ctx_stack.top
    if hasattr(top, 'sqlite_db'):
        top.sqlite_db.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/featureRequests')
def feature_requests():
    db = get_db()
    cur = db.execute('select * from feature_requests order by id asc')
    entries = [dict(title=row[1], description=row[2],
                    client=row[3], client_priority=row[4],
                    product_area=row[5], target_dt=row[6]) for row in cur.fetchall()]
    return jsonify(feature_requests=entries)


@app.route('/featureRequests/new', methods=['POST'])
def new_feature_request():
    db = get_db()
    cur = db.execute('insert into feature_requests (title, description, client,'
                     'client_priority, product_area, target_dt) values (?, ?, ?, ?, ?, ?)',
                     [request.json['title'], request.json['description'],
                      request.json['client'], request.json['client_priority'],
                      request.json['product_area'], request.json['target_dt']])
    db.commit()
    id = cur.lastrowid
    return jsonify({"title": request.json['title'],
                    "description": request.json['description'],
                    "client": request.json['client'],
                    "client_priority": request.json['client_priority'],
                    "product_area": request.json['product_area'],
                    "target_dt": request.json['target_dt'],
                    })


if __name__ == '__main__':
    init_db()
    app.run()
