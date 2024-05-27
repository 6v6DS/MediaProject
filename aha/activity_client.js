(function () {
    var app = angular.module('blogApp', []);

    app.controller('BlogController', ['$http', function ($http) {

        var blog = this;
        blog.title = "동아리 활동내역";

        blog.posts = {};
        blog.tab = 'blog';

        //여기에서, data 받아오고 넣어주세요 데이터..
        $http.get('/activity')
            .then(function (response) {
                blog.posts = response.data;
                blog.posts.forEach(function(post) {
                    $http.get('/actcomment/' + post.id)
                        .then(function (response) {
                            post.comments = response.data;
                        })
                        .catch(function (error) {
                            console.error('Error:', error);
                        });
                });
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
            var postData = {
                title: blog.post.title,
                body: blog.post.body.join('\n'),
                image: blog.post.image,
                clubname: blog.post.clubname,
                createdOn: Date.now()
            };
            
            console.log(postData);
            $http.post('/activity', postData)
                .then(function (response) {
                    alert('게시물이 추가되었습니다.');
                    blog.posts.unshift(blog.post);
                    blog.post = {};
                    blog.tab = 'blog';
                })
                .catch(function (error) {
                    console.error("Error:", error);
                    alert("글 추가에 실패했습니다");
                });
        };
        



    }]);


    //여기가, comment get 요청 보내고,
    //Post 받아오기.
    app.controller('CommentController', ['$http', function($http){
        var commentCtrl = this;

        commentCtrl.addComment = function(post){
            var newComment = {
                postId: post.id,
                body: commentCtrl.comment.body,
                author: commentCtrl.comment.author,
                createdOn: Date.now()
            };

            $http.post('/actcomment', newComment)
                .then(function (response) {
                    alert('댓글이 추가되었습니다.');
                    if (!post.comments) {
                        post.comments = []; // 만약 comments 배열이 초기화되지 않았다면 초기화
                    }
                    post.comments.push(response.data);
                    commentCtrl.comment = {}; // 입력 폼 초기화
                })
                .catch(function (error) {
                    console.error("Error:", error);
                    alert("댓글 추가에 실패했습니다");
                });
        };
    }]);

})();