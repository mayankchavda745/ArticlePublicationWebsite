const ajaxPromise =(endPoint,userData)=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url:endPoint,
            data:JSON.stringify(userData),
            contentType:'application/json',
            method:'POST',
            success:function(response){
                resolve(response)
            },
            error:function(error){
                reject(error)
            }
        })
    })
}

$(()=>{
    $('#publish').click(async ()=>{
        const authorname = $('#authorname').val().split(',')[0];
        const author_id = $('#authorname').val().split(',')[1];
        const articlename = $('#articlename').val();
        const articletext = $('#articletext').val();
        const pdate = $('#pdate').val();
      //  const author_id=$("input[name='authorid']").val();
        alert(author_id+"---"+authorname);

        const userdata = await ajaxPromise('/api/pa',{articlename,articletext,pdate,author_id});
    })

    $('#send').click(async()=>{
        if($("input[name='tick']:checked").length){
            const fname = $('#fname').val();
            const lname = $('#lname').val();
            const email = $('#email').val();
            const mobileno = $('#mobileno').val();
            const message = $('#message').val();
            const gender = $("input[name='gender']:checked").val();
          
            alert(fname+"--"+lname+"--"+email+"--"+mobileno+"--"+message+"--"+gender);
            const userdata = await ajaxPromise('/api/contact',{fname,lname,email,mobileno,message,gender});
    
        }
    })

    $('#edit').click(async()=>{
        if($("input[name='etick']:checked").length){
            const fname = $('#efname').val();
            const lname = $('#elname').val();
            const email = $('#eemail').val();
            const mobileno = $('#emobileno').val();
            const message = $('#emessage').val();
            const gender = $("input[name='gender1']:checked").val();
            const id = $("input[name='authorid']").val();

            alert(id);

            const userdata = await ajaxPromise('/api/edit',{fname,lname,email,mobileno,message,gender,id});
        }
    })
})