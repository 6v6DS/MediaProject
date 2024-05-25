(function () {
    var app = angular.module('blogApp', []);

    app.controller('BlogController', ['$http', function ($http) {

        var blog = this;
        blog.title = "동아리 활동내역";

        blog.posts = {};
        blog.tab = 'blog';

        //여기에서, data 받아오고 넣어주세요 데이터..
        $http.get('https://json')
            .then(function (response) {
                blog.posts = response.data;
            })
            .catch(function (error) {
                console.error('Error:', error);
            });


        blog.selectTab = function (setTab) {
            blog.tab = setTab;
            console.log(blog.tab)
        };

        blog.isSelected = function (checkTab) {
            return blog.tab === checkTab;
        };

        //글 post 요청
        blog.addPost = function () {
            blog.post.createdOn = Date.now();
            blog.post.comments = [];
            //form 데이터에 태워서 보내주기
            let formData = new FormData();
            formData.append("title", blog.post.title);
            formData.append("body", blog.post.body.join('\n')); 
            formData.append("image", blog.post.image);
            formData.append("author", blog.post.author);
            formData.append("createdOn", blog.post.createdOn);

            //데이터전송
            fetch('/contents', { method: "POST", body: formData })
                .then((res) => res.json())
                .then((data) => {
                    alert(data['msg']);
                    blog.posts.unshift(blog.post);
                    blog.tab = 'blog';
                    blog.post = {};

                    $scope.$apply();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("글 추가에 실패했습니다.");
                });
        }



    }]);


    //여기가, comment get 요청 보내고,
    //Post 받아오기.
    app.controller('CommentController', ['$http', function($http){
        var commentCtrl = this;
        commentCtrl.comments = [];

        //여기에 댓글 데이터 넣어주세요 흑흑
        $http.get('/comments')
        .then(function(response){
            commentCtrl.comments = response.data;
        })
        .catch(function(error){
            console.error("Error fetching comments:", error);
            alert("댓글 데이터를 가져오는 데 실패했습니다.");
        });

        commentCtrl.addComment = function(post){
            // 새로운 댓글 생성
            var newComment = {
                body: commentCtrl.comment.body,
                author: commentCtrl.comment.author,
                createdOn: Date.now()
            };


            let formData = new FormData();
            formData.append("postId", post.id); 
            formData.append("body", newComment.body);
            formData.append("author", newComment.author);
            formData.append("createdOn", newComment.createdOn);


            fetch('/comments', { method: "POST", body: formData })
                .then((res) => res.json())
                .then((data) => {
                    alert(data['msg']);
                    
                    post.comments.push(newComment);
                    commentCtrl.comment = {};
                    
                    $scope.$apply();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("댓글 추가에 실패했습니다.");
                });
        };
    }]);

})();
