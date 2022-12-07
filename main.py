from flask import Flask, request, jsonify, render_template
import pymysql
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/review', methods=['GET'])
def get_review():
    db = pymysql.connect(host='hjdb.cmux79u98wpg.us-east-1.rds.amazonaws.com', user='master', password='Abcd!234', db="hjdb", port=3306)
    curs = db.cursor()

    sql = """
    SELECT *
    FROM review
    """

    curs.execute(sql)
    rows = curs.fetchall()
    bin = []
    for i in range(2):
        for j in range(5):
            bin.append(rows[i][j])

    json_str = json.dumps(rows, indent=4, sort_keys=True, default=str, ensure_ascii=False)
    db.commit()
    db.close()
    return json_str, 200


@app.route('/review', methods=['DELETE'])
def delete_review():

    db = pymysql.connect(host='hjdb.cmux79u98wpg.us-east-1.rds.amazonaws.com', user='master', password='Abcd!234',
                    db="hjdb", port=3306)
    curs = db.cursor()
    review_id_receive = request.form.get('review_id_give')
    print(review_id_receive)
    print(type(review_id_receive))
    sql = """ delete from review where review_id = (%s);"""
    curs.execute(sql, review_id_receive)

    db.commit()  # 확정
    db.close()  # 닫기
    return jsonify({'msg': '삭제완료!'})


@app.route('/review', methods=['UPDATE'])
def update_review():
    db = pymysql.connect(host='hjdb.cmux79u98wpg.us-east-1.rds.amazonaws.com', user='master', password='Abcd!234', db="hjdb", port=3306)
    curs = db.cursor()
    review_id_receive = request.form.get('review_id_give')  # id 번째 title, comment 를 받아와서 바꿔
    review_title_receive = request.form.get('review_title_give')
    review_comment_receive = request.form.get('review_comment_give')

    sql = """ update review set review_title = (%s), review_comment = (%s) where review_id = (%s);"""
    curs.execute(sql, (review_title_receive, review_comment_receive, review_id_receive))

    db.commit()  # 확정
    db.close()  # 닫기
    return jsonify({'msg': '수정완료!'})


@app.route('/review', methods=['POST'])
def insert_review_post():
    db = pymysql.connect(host='hjdb.cmux79u98wpg.us-east-1.rds.amazonaws.com', user='master', password='Abcd!234', db="hjdb", port=3306)
    curs = db.cursor()

    data = request.form
    problem_id = data.get('problem_id_give')
    review_title = data.get('review_title_give')
    review_comment = data.get('review_comment_give')
    user_id = data.get('user_id_give')
    print(problem_id,user_id,)

    print(type(problem_id),type(user_id))

    sql = """insert into review (
                                                 problem_id,
                                                 review_title,
                                                 review_comment,
                                                 user_unique_id)
                                             values (%s,%s,%s,%s)"""
    curs.execute(sql, (problem_id, review_title, review_comment, user_id))

    db.commit()  # 확정
    db.close()  # 닫기
    return 'insert success', 200


# 서버실행
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
