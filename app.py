from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:0000@cluster0.5itx0mj.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/codes/:post_id/comment/:comment_id/comment_reply/:comment_reply_id", methods=["POST"])
def web_comment_reply_post():
    comment_id_receive = request.form['comment_id_give']
    comment_receive = request.form['comment_give']

    doc = {
        'comment_id': comment_id_receive,
        'comment': comment_receive
    }
    db.comment_reply.insert_one(doc)

    return jsonify({'msg': '댓글 달기 완료!'})


@app.route("/codes/:post_id/comment/:comment_id/comment_reply", methods=["GET"])
def web_comment_reply_get():
    all_comments = list(db.comment_reply.find({}, {'_id': False}))
    return jsonify({'all_comments': all_comments})
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
