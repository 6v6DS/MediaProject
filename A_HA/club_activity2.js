
// (function () {
//     //angular 모듈
//     var app = angular.module('blogApp', []);

//     app.controller('BlogController', ['$http', function ($http) {

//         var blog = this;
//         blog.title = "동아리 활동내역";

//         blog.posts = {};

//         $http.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/110131/posts_1.json').success(function (data) {
//             blog.posts = data;
//         });



//         // blog.loadPosts = function () {
//         //     $http.get('https://.json') //글목록 받아오기
//         //         .then(function (response) {
//         //             blog.posts = response.data;
//         //         }, function (error) {
//         //             console.error('Error loading posts:', error);
//         //         });
//         // };

//         // /* fetch 함수를 사용. */
//         // fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/110131/posts_1.json')
//         //     .then(response => response.json())
//         //     .then(data => {
//         //         blog.posts = data;
//         //         /* AngularJS가 변경사항을 인식하도록 $apply를 호출. */
//         //         blog.$apply();
//         //     })
//         //     .catch(error => {
//         //         console.error('Error fetching data:', error);
//         //     });

//         blog.loadPosts();

//         blog.tab = 'blog';

//         blog.selectTab = function (setTab) {
//             blog.tab = setTab;
//             console.log(blog.tab)
//         };

//         blog.isSelected = function (checkTab) {
//             return blog.tab === checkTab;
//         };

//         blog.post = {};

//         blog.addPost = function () {
//             blog.post.createdOn = Date.now(); //게시물 생성날짜
//             blog.post.comments = []; //댓글 배열 초기화
//             blog.posts.unshift(this.post); //새로운 게시물 맨앞에추가
//             blog.tab = 0; // 첫번째 탭으로 이동
//             blog.post = {};
//         };

//     // }]);

//     blog.addPost = function () {
//         posting();
//     };

//     // 새로운 posting 함수
//     function posting() {
//         // 폼 데이터 가져오기
//         let post = blog.post;
//         post.createdOn = Date.now();

//         // form 데이터에 태워서 보내주기
//         let formData = new FormData();
//         formData.append("title", post.title);
//         formData.append("body", post.body.join('\n'));
//         formData.append("image", post.image);
//         formData.append("author", post.author);

//         fetch('/contents', { method: "POST", body: formData })
//             .then((res) => res.json())
//             .then((data) => {
//                 alert(data['msg']);
//                 blog.loadPosts(); // 게시물을 다시 로드하여 새로 추가된 게시물을 포함
//                 blog.tab = 'blog'; // 목록 보기로 이동
//             })
//             .catch((error) => {
//                 console.error('Error posting data:', error);
//             });
//     }

// }]);

// app.controller('CommentController', function () {
//     this.comment = {};
//     this.addComment = function (post) { //댓글 추가
//         this.comment.createdOn = Date.now();
//         post.comments.push(this.comment);
//         this.comment = {};
//     };
// });

// app.controller('CommentController', function () {
//     var commentCtrl = this;
//     commentCtrl.comment = {};

//     commentCtrl.addComment = function (post) {
//         let formData = new FormData();
//         formData.append("body", commentCtrl.comment.body);
//         formData.append("author", commentCtrl.comment.author);
//         formData.append("post_id", post.id);

//         fetch('/comments', { method: "POST", body: formData })
//             .then((res) => res.json())
//             .then((data) => {
//                 alert(data['msg']);
//                 post.comments.push(data.comment);
//                 commentCtrl.comment = {};
//             })
//             .catch((error) => {
//                 console.error('Error posting comment:', error);
//             });
//     };
// });

// });


/* 즉시 실행 함수로 AngularJS 모듈과 컨트롤러를 정의합니다. */
// (function () {
//     var app = angular.module('blogApp', []);

//     app.controller('BlogController', ['$http', function ($http) {

//         var blog = this;
//         blog.title = "동아리 활동내역";

//         blog.posts = {};
//         blog.tab = 'blog';

//         //여기에서, data 받아오고 넣어주세요 데이터..
//         $http.get('https://json')
//             .then(function (response) {
//                 blog.posts = response.data;
//             })
//             .catch(function (error) {
//                 console.error('Error:', error);
//             });


//         blog.selectTab = function (setTab) {
//             blog.tab = setTab;
//             console.log(blog.tab)
//         };

//         blog.isSelected = function (checkTab) {
//             return blog.tab === checkTab;
//         };

//         //글 post 요청
//         blog.addPost = function () {
//             blog.post.createdOn = Date.now();
//             blog.post.comments = [];
//             //form 데이터에 태워서 보내주기
//             let formData = new FormData();
//             formData.append("title", blog.post.title);
//             formData.append("body", blog.post.body.join('\n')); 
//             formData.append("image", blog.post.image);
//             formData.append("author", blog.post.author);
//             formData.append("createdOn", blog.post.createdOn);

//             //데이터전송
//             fetch('/contents', { method: "POST", body: formData })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     alert(data['msg']);
//                     blog.posts.unshift(blog.post);
//                     blog.tab = 'blog';
//                     blog.post = {};

//                     $scope.$apply();
//                 })
//                 .catch((error) => {
//                     console.error("Error:", error);
//                     alert("글 추가에 실패했습니다.");
//                 });
//         }



//     }]);


//     //여기가, comment get 요청 보내고,
//     //Post 받아오기.
//     app.controller('CommentController', ['$http', function($http){
//         var commentCtrl = this;
//         commentCtrl.comments = [];

//         //여기에 댓글 데이터 넣어주세요 흑흑
//         $http.get('/comments')
//         .then(function(response){
//             commentCtrl.comments = response.data;
//         })
//         .catch(function(error){
//             console.error("Error fetching comments:", error);
//             alert("댓글 데이터를 가져오는 데 실패했습니다.");
//         });

//         commentCtrl.addComment = function(post){
//             // 새로운 댓글 생성
//             var newComment = {
//                 body: commentCtrl.comment.body,
//                 author: commentCtrl.comment.author,
//                 createdOn: Date.now()
//             };


//             let formData = new FormData();
//             formData.append("postId", post.id); 
//             formData.append("body", newComment.body);
//             formData.append("author", newComment.author);
//             formData.append("createdOn", newComment.createdOn);


//             fetch('/comments', { method: "POST", body: formData })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     alert(data['msg']);
                    
//                     post.comments.push(newComment);
//                     commentCtrl.comment = {};
                    
//                     $scope.$apply();
//                 })
//                 .catch((error) => {
//                     console.error("Error:", error);
//                     alert("댓글 추가에 실패했습니다.");
//                 });
//         };
//     }]);

// })();

(function () {
    var app = angular.module('blogApp', []);

    app.controller('BlogController', ['$http', function ($http) {

        var blog = this;
        blog.title = "동아리 활동내역";

        blog.posts = {};
        blog.tab = 'blog';

        //여기에서, data 받아오고 넣어주세요 데이터..
        $http.get('/posts')
            .then(function (response) {
                blog.posts = response.data;
                blog.posts.forEach(function(post) {
                    $http.get('/comments/' + post.id)
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
                author: blog.post.author,
                createdOn: Date.now()
            };
        
            $http.post('/posts', postData)
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

            $http.post('/comments', newComment)
                .then(function (response) {
                    alert('댓글이 추가되었습니다.');
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