$(document).ready(function () {

    show_comment()
});


function show_comment() {
    $.ajax({
        type: "GET",
        url: "/review",
        data: {},
        success: function (response) {
            doc = JSON.parse(response)
            // 인수로 전달받은 문자열을 자바스크립트 객체로 변환하여 반환합
            console.log(doc)
            for (let i = 0; i < doc.length; i++) {
                let id = doc[i][0]
                let title = doc[i][1]
                let comment = doc[i][2]
                let problem_id = doc[i][3]
                let user_id = doc[i][4]

                let temp_html = `<div class="card">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Icecat1-300x300.svg" class="card-img-top"
                                                 alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${id},${title}</h5>

                                                <p class="card-text">${comment}</p>
                                                <p class="card-text">${user_id}</p>
                                                <p class="card-text">${problem_id}</p>
                                                <button onclick="del_review(${id})" type="button" class="btn btn-dark" id="darkbtn">review삭제</button>
                                                <button onclick="up_review(${id})" type="button" class="btn btn-dark" id="darkbtn">review수정</button>
                                            </div>
                                        </div>
                       `
                $('#review-list').append(temp_html)

            }
        }
    });
}

function del_review(id) {//id 번째 지울꺼야
    let review_id = id
    $.ajax({
        type: "DELETE",
        url: "/review",
        data: {'review_id_give': review_id},
        success: function (response) {
            alert("삭제완료")
        }
    })
}

function up_review(id) {
    let title = prompt("title", "입력")
    let comment = prompt("comment", "입력")
    let review_id = id
    $.ajax({
        type: "UPDATE",
        url: "/review",
        data: {review_title_give: title, review_comment_give: comment, review_id_give: review_id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()

        }
    })

}

function insert_review() {
    let title = $('#title').val()
    let comment = $('#comment').val()
    let user_id = $('#userid').val()
    let problem_id = $('#problemid').val()

    $.ajax({
        type: "POST",
        url: "/review",
        data: {
            review_title_give: title,
            review_comment_give: comment,
            user_id_give: user_id,
            problem_id_give: problem_id
        },
        success: function (response) {
            console.log(title, comment, user_id, problem_id)
            alert(response['msg'])
            window.location.reload()
        }
    })
}

