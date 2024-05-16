 let index = {
        init: function(){
            $("#btn").on("click", () => {
                this.save();
            });
        },
        save: function(){
            let data = {
                username: $("#username").val(),
                password: $("#password").val(),
            };
            console.log(data);
            $.ajax({
            type:"POST",
            url: "login.ajax",
            data: 
                JSON.stringify(data),
            dataType:"json",
            success:function(data){
                console.log(data);
            },
            error:function(e){
                alert("실패");
                alert(JSON.stringify(error));
            }
        });
    }
    }
