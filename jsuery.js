$(document).ready(function () {

    show_problem_review();

})


function insert_review() {
    let title = $('#title').val()
    let comment = $('#comment').val()
    let user_id = sessionStorage.getItem('user_id')//세션에서 받아와서 넣어user_id char값
    let problem_id = 1//problem페이지에서 얻어와서 넣어

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

// //버튼을 누르면 내 페이지로 넘어오면서 그 버튼에 문제 id를 받아와
//         function show_problem(){
//                 //let problem_id = ?? //서버나 링크로 받아와
//                 $.ajax({
//                 type: "POST",
//                 url: "/problem",
//                 data: {problem_id_give:problem_id},
//                 success: function (response) {
//                         console.log(response)
//                          window.location.reload()},})
//
//                 $.ajax({
//                         type:"GET",
//                         url:"/problem",
//                         data:{},
//                         dataType: 'json',
//                         success:function (response){
//
//                         },
//                 })
// }


function show_problem_review() {
    let problem_id = 1

    $.ajax({
        type: "GET",
        url: "/review",
        data: {"problem_id_give": problem_id},//전달할데이터
        dataType: 'json',//전달받을 data타입
        success: function (response) {
            console.log(response[0])
            let problem_title = response[0][0]//review_id
            let problem_comment = response[0][1]//review_id
            let tempp_html = `
                            <div>${problem_title}</div>
                            <div>${problem_comment}</div>`
                $('#problem').append(tempp_html)
            for (let i = 0; i < response.length; i++) {

                let id = response[i][2]//review_id
                let title = response[i][3]//title
                let comment = response[i][4]//comment
                // localStorage.setItem('json', JSON.stringify({review_id: id}))
                let temp_html = `                               
                                    <div class="card">
                                        <a href=""/>
                                        <div class="card-body">
                                            <h5 class="card-title">${title}</h5>
                                            <p class="card-text">${comment}</p>
                                            <!-- a : 페이지주소.html?데이터아이디=데이터&데이터아이디2=데이터2 (url으로 넘어감) -->
                                            <a href="comment.html?review_id=${id}">${title}로 이동</a>       
                                            <button onclick="del_review(${id})" type="button" class="btn btn-dark" id="darkbtn">review삭제</button>
                                            <button onclick="up_review(${id})" type="button" class="btn btn-dark" id="darkbtn">review수정</button>
                                        </div>
                                    </div>
               `
                $('#review-list').append(temp_html)

            }
        },
    })
}

function del_review(id) {//id 번째 지울꺼야 if문으로 review_id의 user_id와 user의 userid가 같으면 지워,수정
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

//
// function insert_review() {
//     let title = $('#title').val()
//     let comment = $('#comment').val()
//     let user_id = $('#userid').val()
//     let problem_id = $('#problemid').val()
//
//     $.ajax({
//         type: "POST",
//         url: "/review",
//         data: {
//             review_title_give: title,
//             review_comment_give: comment,
//             user_id_give: user_id,
//             problem_id_give: problem_id
//         },
//         success: function (response) {
//             console.log(title, comment, user_id, problem_id)
//             alert(response['msg'])
//             window.location.reload()
//         }
//     })
// }

