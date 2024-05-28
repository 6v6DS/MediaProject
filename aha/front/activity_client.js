(function () {
    var app = angular.module('blogApp', []);

    app.controller('BlogController', ['$http', function ($http) {

        var blog = this;
        blog.title = "동아리 활동내역";

        blog.posts = {};
        blog.tab = 'blog';

        // Fetch posts
        $http.get('/activity')
            .then(function (response) {
                blog.posts = response.data;
                blog.posts.forEach(function(post) {
                    blog.getPostAndComments(post.id);
                });
            })
            .catch(function (error) {
                console.error('Error loading posts:', error);
            });


        blog.selectTab = function (setTab) {
            blog.tab = setTab;
            if (setTab === 'postDetail') {
                blog.getPostAndComments(post.id);
            }
        };

        // Fetch post and comments
        blog.getPostAndComments = function(postId) {
            $http.get('/activity/' + postId).then(function(response) {
                var postIndex = blog.posts.findIndex(post => post.id === postId);
                if (postIndex !== -1) {
                    blog.posts[postIndex] = response.data.activities;
                    blog.posts[postIndex].comments = response.data.comments;
                }
            }).catch(function(error) {
                console.error('Error loading post and comments:', error);
            });
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
                written: Date.now()
            };
            
            $http.post('/activity', postData)
                .then(function (response) {
                    alert('게시글이 추가되었습니다.');
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
                activity_id: post.id,
                body: commentCtrl.comment.body,
                author: commentCtrl.comment.author,
                written: Date.now()
            };

            $http.post('/activity/' + post.id + '/actcomment', newComment)
                .then(function (response) {
                    alert('댓글이 추가되었습니다.');
                    if (!post.comments) {
                        post.comments = [];
                    }
                    post.comments.push(response.data);
                    commentCtrl.comment = {};
                })
                .catch(function (error) {
                    console.error("Error:", error);
                    alert("댓글 추가에 실패했습니다");
                });
        };
    }]);

})();