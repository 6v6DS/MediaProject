// $(document).ready(function(){
//     show_submit();
// });

document.querySelectorAll('input[name="grade"]').forEach((radio)=>{
   radio.addEventLister('change', (event) => {
    let selectedId = event.target.id;
   }) 
})


function show_order() {
    event.preventDefault();

    //Get
    let name = $('#name').val()
    let studentID = $('#studentID').val()
    let major = $('#major').val()
    let phone = $('#phone').val()
    let age = $('#age').val()
    let bio = $('#bio').val()
    let act = $('#act').val()
    let selectedId = document.querySelector('input[name="grade"]:checked').id;

    let formData = new FormData();
    formData.append("name_give", name)
    formData.append("studentID_give", studentID)
    formData.append("selectedId_give", selectedId)
    formData.append("major_give", major)
    formData.append("phone_give", phone)
    formData.append("age_give", age)
    formData.append("bio_give", bio)
    formData.append("act_give", act)

    // Post
    fetch('/application', { 
        method: "POST", 
        body: formData 
    })
    .then((res) => res.json())
    .then((data) => {
        alert('신청이 완료되었습니다');
        window.location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    return false;
}
