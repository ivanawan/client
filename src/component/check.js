import swal from 'sweetalert';

export  function check(res){  
    //  console.log(res);
        // console.log(res?.message === "error on token");
        if (res?.data.status === "error" || res?.data.status === "failed") {
            if(res?.data.message === "error on token"){
                // console.log('navigate');
                window.location.href = '/logout';
            }
                    swal("Failed!", res?.data.message, "error");
            }
    }